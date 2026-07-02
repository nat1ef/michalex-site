"use client";

import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import {
  createGearGeometry,
  sceneGears,
  type GearConfig,
} from "@/lib/gear-geometry";

function Gear({ config }: { config: GearConfig }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(
    () =>
      createGearGeometry(
        config.teeth,
        config.outerR,
        config.innerR,
        config.depth,
        config.holeR
      ),
    [config]
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += config.speed * delta;
    }
  });

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.15}
      floatIntensity={0.4}
      floatingRange={[-0.08, 0.08]}
    >
      <mesh
        ref={meshRef}
        geometry={geometry}
        position={config.position}
        rotation={config.rotation}
      >
        <meshStandardMaterial
          color={config.color ?? "#7a8088"}
          metalness={config.metalness ?? 0.92}
          roughness={config.roughness ?? 0.32}
          envMapIntensity={0.8}
        />
      </mesh>
    </Float>
  );
}

function Ring({ position, scale }: { position: [number, number, number]; scale: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.08;
      ref.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusGeometry args={[1, 0.015, 8, 64]} />
      <meshStandardMaterial
        color="#c47a2a"
        metalness={0.9}
        roughness={0.3}
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

function CameraParallax({ lowQuality }: { lowQuality: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const scrollRef = useRef(0);
  const elapsed = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current =
        window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    elapsed.current += delta;
    const t = elapsed.current;
    const scroll = scrollRef.current;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.22 + scroll * 0.35,
      0.04
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.y * 0.12 + scroll * 0.08,
      0.04
    );
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      pointer.x * 0.3 - scroll * 0.4,
      0.04
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      pointer.y * 0.18 + Math.sin(t * 0.4) * 0.06,
      0.04
    );
    group.current.rotation.z = Math.sin(t * 0.15) * 0.02;
  });

  const gears = lowQuality ? sceneGears.slice(0, 4) : sceneGears;

  return (
    <group ref={group}>
      {gears.map((gear, i) => (
        <Gear key={i} config={gear} />
      ))}
      {!lowQuality && (
        <>
          <Ring position={[3.5, 1.2, -0.8]} scale={0.9} />
          <Ring position={[1.5, -0.5, 0.2]} scale={1.4} />
          <Ring position={[4.2, 0.6, -1.2]} scale={0.55} />
          <Ring position={[-0.5, 1.8, -1]} scale={2.1} />
          <Sparkles
            count={100}
            scale={[14, 10, 8]}
            size={1.4}
            speed={0.45}
            opacity={0.4}
            color="#c47a2a"
          />
          <Sparkles
            count={35}
            scale={[10, 6, 4]}
            size={0.8}
            speed={0.15}
            opacity={0.2}
            color="#8890a0"
          />
        </>
      )}
      {lowQuality && (
        <Sparkles count={25} scale={[10, 6, 4]} size={1} speed={0.3} opacity={0.25} color="#c47a2a" />
      )}
    </group>
  );
}

function SceneContent({ lowQuality }: { lowQuality: boolean }) {
  return (
    <>
      <fog attach="fog" args={["#0a0a0c", 4, 14]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 4, 3]} intensity={1.2} color="#ffe8d0" />
      <directionalLight position={[-4, -2, 2]} intensity={0.4} color="#6080ff" />
      <pointLight position={[3, 0, 2]} intensity={0.6} color="#c47a2a" distance={8} />
      <CameraParallax lowQuality={lowQuality} />
    </>
  );
}

type MechanicalCanvasProps = {
  className?: string;
  cameraPosition?: [number, number, number];
};

export function MechanicalCanvas({
  className,
  cameraPosition = [0, 0, 6.5],
}: MechanicalCanvasProps) {
  const [lowQuality, setLowQuality] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    setLowQuality(window.innerWidth < 768);
    const onResize = () => setLowQuality(window.innerWidth < 768);
    window.addEventListener("resize", onResize, { passive: true });

    const onVis = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className={className}>
      <Canvas
        camera={{ position: cameraPosition, fov: 42 }}
        dpr={lowQuality ? [1, 1] : [1, 1.5]}
        frameloop={active ? "always" : "never"}
        gl={{ antialias: !lowQuality, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneContent lowQuality={lowQuality} />
        </Suspense>
      </Canvas>
    </div>
  );
}
