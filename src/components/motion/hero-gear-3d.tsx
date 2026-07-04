"use client";

import { forwardRef, useRef, type Ref, type RefObject } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export const TEETH_COUNT = 22;

export type HeroGear3DHandle = {
  gearGroup: THREE.Group;
  teeth: THREE.Group[];
  cutter: THREE.Group;
};

const CORE_R = 1.55;
const TOOTH_BASE_W = 0.34;
const TOOTH_TIP_W = 0.2;
const TOOTH_H = 0.62;
const TOOTH_D = 0.58;
const CORE_DEPTH = 0.6;
const HUB_R = 0.42;

// A fixed 3/4 tilt so the gear reads as a solid object with real depth
// instead of a flat disc facing the camera dead-on.
const BASE_TILT_X = -0.48;
const BASE_TILT_Y = 0.6;

function toothGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(-TOOTH_BASE_W / 2, 0);
  shape.lineTo(-TOOTH_TIP_W / 2, TOOTH_H);
  shape.lineTo(TOOTH_TIP_W / 2, TOOTH_H);
  shape.lineTo(TOOTH_BASE_W / 2, 0);
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: TOOTH_D,
    bevelEnabled: true,
    bevelThickness: 0.028,
    bevelSize: 0.024,
    bevelSegments: 2,
    steps: 1,
  });
  geometry.translate(0, 0, -TOOTH_D / 2);
  return geometry;
}

function buildScene(container: HTMLDivElement): {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  gearGroup: THREE.Group;
  teeth: THREE.Group[];
  cutter: THREE.Group;
  dispose: () => void;
} {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0.15, 6.6);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  container.appendChild(renderer.domElement);

  // A studio-style environment so metalness/roughness actually have
  // something to reflect — without this, metals just look flat and dark.
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTexture;
  pmrem.dispose();

  // Lights — a warm key, a copper rim to catch the edges, and a cool fill.
  scene.add(new THREE.AmbientLight(0x8891a8, 0.25));

  const key = new THREE.DirectionalLight(0xfff3e2, 2.4);
  key.position.set(3.2, 4, 4.5);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0xd9924f, 1.4);
  rim.position.set(-3.5, -1.2, 2.8);
  scene.add(rim);

  const fill = new THREE.DirectionalLight(0x7f9dce, 0.6);
  fill.position.set(-2, 3, -3);
  scene.add(fill);

  const steelMat = new THREE.MeshStandardMaterial({
    color: 0xacb2bc,
    metalness: 0.95,
    roughness: 0.24,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x53585f,
    metalness: 0.85,
    roughness: 0.38,
  });
  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xc9793a,
    metalness: 0.8,
    roughness: 0.26,
    emissive: 0x6a2f0c,
    emissiveIntensity: 0.25,
  });

  // Everything sits inside a tilt group so the gear and cutter stay aligned
  // under the same fixed 3/4 perspective.
  const tiltGroup = new THREE.Group();
  scene.add(tiltGroup);

  const gearGroup = new THREE.Group();
  tiltGroup.add(gearGroup);

  // Blank cylinder core
  const core = new THREE.Mesh(
    new THREE.CylinderGeometry(CORE_R, CORE_R, CORE_DEPTH, 64),
    steelMat
  );
  core.rotation.x = Math.PI / 2;
  gearGroup.add(core);

  // Recessed face ring detail
  const groove = new THREE.Mesh(
    new THREE.TorusGeometry(CORE_R - 0.22, 0.012, 8, 64),
    darkMat
  );
  groove.position.z = CORE_DEPTH / 2 + 0.001;
  gearGroup.add(groove);

  // Center hub + shaft bore
  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(HUB_R, HUB_R, CORE_DEPTH + 0.04, 32),
    darkMat
  );
  hub.rotation.x = Math.PI / 2;
  gearGroup.add(hub);

  const bore = new THREE.Mesh(
    new THREE.CylinderGeometry(HUB_R * 0.42, HUB_R * 0.42, CORE_DEPTH + 0.08, 24),
    new THREE.MeshStandardMaterial({ color: 0x111214, metalness: 0.4, roughness: 0.55 })
  );
  bore.rotation.x = Math.PI / 2;
  gearGroup.add(bore);

  // Teeth — a real trapezoidal, bevelled tooth profile (not a plain box),
  // each in its own group so it can be scaled from the base outward.
  const sharedToothGeometry = toothGeometry();
  const teeth: THREE.Group[] = [];
  for (let i = 0; i < TEETH_COUNT; i++) {
    const angle = (i / TEETH_COUNT) * Math.PI * 2;
    const toothGroup = new THREE.Group();
    toothGroup.position.set(Math.cos(angle) * CORE_R, Math.sin(angle) * CORE_R, 0);
    toothGroup.rotation.z = angle - Math.PI / 2;
    toothGroup.scale.y = 0;

    const tooth = new THREE.Mesh(sharedToothGeometry, steelMat);
    toothGroup.add(tooth);

    gearGroup.add(toothGroup);
    teeth.push(toothGroup);
  }

  // Cutting tool — a small copper cutter sweeping around the gear. Placed
  // along +X to start aligned with tooth[0] (angle 0 in the loop above), so
  // the sweep and the tooth stagger move in lockstep.
  const cutter = new THREE.Group();
  const cutterRod = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 1.7, 12),
    copperMat
  );
  cutterRod.rotation.z = -Math.PI / 2;
  cutterRod.position.x = CORE_R + 0.9;
  cutter.add(cutterRod);

  const cutterTip = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.22, 16), copperMat);
  cutterTip.rotation.z = -Math.PI / 2;
  cutterTip.position.x = CORE_R + 0.14;
  cutter.add(cutterTip);

  const sparkLight = new THREE.PointLight(0xffa04d, 0, 2.2);
  sparkLight.position.x = CORE_R + 0.1;
  cutter.add(sparkLight);
  cutter.userData.sparkLight = sparkLight;

  tiltGroup.add(cutter);

  let raf = 0;
  let running = true;
  let idleT = 0;

  const render = () => {
    if (!running) return;
    idleT += 0.012;
    tiltGroup.rotation.x = BASE_TILT_X + Math.sin(idleT * 0.6) * 0.035;
    tiltGroup.rotation.y = BASE_TILT_Y + Math.cos(idleT * 0.45) * 0.03;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(render);
  };
  raf = requestAnimationFrame(render);

  const setPaused = (paused: boolean) => {
    running = !paused;
    if (!paused && !raf) raf = requestAnimationFrame(render);
  };

  const resize = () => {
    const { clientWidth, clientHeight } = container;
    if (!clientWidth || !clientHeight) return;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(clientWidth, clientHeight);
  };
  resize();

  const ro = new ResizeObserver(resize);
  ro.observe(container);

  const io = new IntersectionObserver(
    ([entry]) => setPaused(!entry.isIntersecting),
    { threshold: 0.02 }
  );
  io.observe(container);

  const dispose = () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    envTexture.dispose();
    sharedToothGeometry.dispose();
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj.geometry !== sharedToothGeometry) {
        obj.geometry.dispose();
      }
    });
    steelMat.dispose();
    darkMat.dispose();
    copperMat.dispose();
    renderer.dispose();
    container.removeChild(renderer.domElement);
  };

  return { renderer, scene, camera, gearGroup, teeth, cutter, dispose };
}

function assignRef(ref: Ref<HeroGear3DHandle> | undefined, value: HeroGear3DHandle | null) {
  if (!ref) return;
  if (typeof ref === "function") ref(value);
  else (ref as RefObject<HeroGear3DHandle | null>).current = value;
}

export const HeroGear3D = forwardRef<HeroGear3DHandle>(function HeroGear3D(_props, ref) {
  const disposeRef = useRef<(() => void) | null>(null);

  // A callback ref runs synchronously during commit, before any layout or
  // passive effect in the tree — including the parent's useGSAP setup — so
  // the exposed handle is guaranteed to exist by the time anything reads it.
  const setContainer = (node: HTMLDivElement | null) => {
    if (node) {
      try {
        const built = buildScene(node);
        disposeRef.current = built.dispose;
        assignRef(ref, {
          gearGroup: built.gearGroup,
          teeth: built.teeth,
          cutter: built.cutter,
        });
      } catch {
        // No WebGL available — leave the handle null so the parent's GSAP
        // setup bails out and the hero falls back to its static, fully
        // visible content instead of crashing.
      }
    } else {
      disposeRef.current?.();
      disposeRef.current = null;
      assignRef(ref, null);
    }
  };

  return <div ref={setContainer} className="h-full w-full [&>canvas]:block" aria-hidden />;
});
