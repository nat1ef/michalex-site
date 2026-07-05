"use client";

import { forwardRef, useRef, type Ref, type RefObject } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export const TEETH_COUNT = 22;

export type HeroGear3DHandle = {
  gearGroup: THREE.Group;
  teeth: THREE.Group[];
  cutter: THREE.Group;
  /** Whole gear+cutter assembly. Safe to tween position/scale; its rotation
   *  x/y are owned by the idle-wobble render loop. */
  tiltGroup: THREE.Group;
};

const CORE_R = 1.55;
const TOOTH_BASE_W = 0.34;
const TOOTH_TIP_W = 0.2;
const TOOTH_H = 0.62;
const TOOTH_D = 0.58;
const CORE_DEPTH = 0.6;
const HUB_R = 0.42;
const SPARK_COUNT = 22;

// A fixed 3/4 tilt so the gear reads as a solid object with real depth
// instead of a flat disc facing the camera dead-on.
const BASE_TILT_X = -0.46;
const BASE_TILT_Y = 0.62;

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

/** Concentric lathe-turning marks — real machined stock looks like this. */
function turnedFaceTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const cx = size / 2;
  const cy = size / 2;

  ctx.fillStyle = "#585d66";
  ctx.fillRect(0, 0, size, size);

  const maxR = size * 0.5;
  for (let r = maxR; r > 4; r -= 1.6) {
    const shade = 84 + Math.round(Math.sin(r * 0.9) * 9 + (Math.random() - 0.5) * 6);
    ctx.strokeStyle = `rgb(${shade},${shade + 3},${shade + 6})`;
    ctx.lineWidth = 1 + Math.random() * 0.6;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function buildScene(container: HTMLDivElement): {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  gearGroup: THREE.Group;
  teeth: THREE.Group[];
  cutter: THREE.Group;
  tiltGroup: THREE.Group;
  dispose: () => void;
} {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(0, 0.1, 8);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.82;
  container.appendChild(renderer.domElement);

  // A studio-style environment so metalness/roughness actually have
  // something to reflect — without this, metals just look flat and dark.
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.03).texture;
  scene.environment = envTexture;
  pmrem.dispose();

  // Lights — high-contrast key + copper rim so edges and teeth catch real
  // highlights, low ambient so the metal doesn't wash out flat.
  // Low-key workshop lighting: the part lives mostly in shadow, defined by
  // a hot copper rim and a dim warm key — bright, even light is what makes
  // CG metal read as plastic against real photos.
  scene.add(new THREE.AmbientLight(0x39404e, 0.22));

  const key = new THREE.DirectionalLight(0xffe3c2, 0.85);
  key.position.set(3.0, 4.4, 3.6);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0xd98a45, 2.6);
  rim.position.set(-4.2, -0.6, 2.0);
  scene.add(rim);

  const fill = new THREE.DirectionalLight(0x66809f, 0.22);
  fill.position.set(-2, 2.6, -3.2);
  scene.add(fill);

  const faceTexture = turnedFaceTexture();
  const steelMat = new THREE.MeshStandardMaterial({
    color: 0x494f58,
    metalness: 0.92,
    roughness: 0.4,
    envMapIntensity: 0.5,
  });
  const facedMat = new THREE.MeshStandardMaterial({
    color: 0x666c76,
    map: faceTexture,
    metalness: 0.9,
    roughness: 0.42,
    envMapIntensity: 0.5,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x33373d,
    metalness: 0.85,
    roughness: 0.46,
    envMapIntensity: 0.45,
  });
  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xc9793a,
    metalness: 0.8,
    roughness: 0.24,
    emissive: 0xb35a1e,
    emissiveIntensity: 0.55,
  });

  // Everything sits inside a tilt group so the gear and cutter stay aligned
  // under the same fixed 3/4 perspective.
  const tiltGroup = new THREE.Group();
  scene.add(tiltGroup);

  // Soft dark halo behind the part — fakes ambient occlusion against the
  // photo backdrop so the gear feels planted in the scene, not pasted on.
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = 256;
  shadowCanvas.height = 256;
  const shadowCtx = shadowCanvas.getContext("2d")!;
  const grad = shadowCtx.createRadialGradient(128, 128, 20, 128, 128, 128);
  grad.addColorStop(0, "rgba(0,0,0,0.62)");
  grad.addColorStop(0.55, "rgba(0,0,0,0.34)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  shadowCtx.fillStyle = grad;
  shadowCtx.fillRect(0, 0, 256, 256);
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  const shadowSprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    })
  );
  shadowSprite.scale.set(6.4, 6.4, 1);
  shadowSprite.position.z = -1.4;
  tiltGroup.add(shadowSprite);

  const gearGroup = new THREE.Group();
  tiltGroup.add(gearGroup);

  // Blank cylinder core — front/back caps get real turned-metal texture,
  // the rim stays a clean brushed-steel side.
  const core = new THREE.Mesh(
    new THREE.CylinderGeometry(CORE_R, CORE_R, CORE_DEPTH, 96, 1, false),
    [steelMat, facedMat, facedMat]
  );
  core.rotation.x = Math.PI / 2;
  gearGroup.add(core);

  // Recessed face ring detail
  const groove = new THREE.Mesh(
    new THREE.TorusGeometry(CORE_R - 0.22, 0.012, 8, 96),
    darkMat
  );
  groove.position.z = CORE_DEPTH / 2 + 0.001;
  gearGroup.add(groove);

  // Center hub + shaft bore
  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(HUB_R, HUB_R, CORE_DEPTH + 0.04, 40),
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

  // Spark particles bursting from the cutting point — the copper material's
  // emissive glow (boosted by the bloom pass) carries the "hot metal" look,
  // so no separate point light is needed here.
  const sparkGeo = new THREE.BufferGeometry();
  const sparkBase = new Float32Array(SPARK_COUNT * 3);
  const sparkSeed = new Float32Array(SPARK_COUNT);
  for (let i = 0; i < SPARK_COUNT; i++) {
    sparkBase[i * 3] = CORE_R + 0.1 + Math.random() * 0.35;
    sparkBase[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
    sparkBase[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    sparkSeed[i] = Math.random() * Math.PI * 2;
  }
  sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkBase, 3));
  const sparkMat = new THREE.PointsMaterial({
    color: 0xffb15e,
    size: 0.05,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const sparks = new THREE.Points(sparkGeo, sparkMat);
  cutter.add(sparks);

  tiltGroup.add(cutter);

  // No post-processing: the composer passes (bloom/vignette) destroy the
  // alpha channel, which reads as a white fog when this canvas is layered
  // over the photo backdrops. The additive spark points and the copper
  // emissive carry the "hot metal" look on their own.

  let raf = 0;
  let running = true;
  let idleT = 0;

  const render = () => {
    if (!running) return;
    idleT += 0.012;
    tiltGroup.rotation.x = BASE_TILT_X + Math.sin(idleT * 0.6) * 0.035;
    tiltGroup.rotation.y = BASE_TILT_Y + Math.cos(idleT * 0.45) * 0.03;

    if (cutter.scale.x > 0.01) {
      sparkMat.opacity = 0.55 + Math.sin(idleT * 9) * 0.25;
      const positions = sparkGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < SPARK_COUNT; i++) {
        const t = (idleT * 2 + sparkSeed[i]) % 1.4;
        positions.setX(i, sparkBase[i * 3] + t * 0.55);
        positions.setY(i, sparkBase[i * 3 + 1] + Math.sin(sparkSeed[i] + idleT * 3) * 0.12);
      }
      positions.needsUpdate = true;
    }

    renderer.render(scene, camera);
    raf = requestAnimationFrame(render);
  };
  raf = requestAnimationFrame(render);

  const setPaused = (paused: boolean) => {
    running = !paused;
    if (!paused && !raf) raf = requestAnimationFrame(render);
  };

  // The gear's own bounding radius (core + teeth), used to keep it framed
  // consistently regardless of viewport shape — on a narrow phone the
  // camera backs up so the circular silhouette doesn't clip left/right.
  const GEAR_RADIUS = CORE_R + TOOTH_H + 0.15;
  const FILL_FACTOR = 0.8;

  const resize = () => {
    const { clientWidth, clientHeight } = container;
    if (!clientWidth || !clientHeight) return;
    const aspect = clientWidth / clientHeight;
    camera.aspect = aspect;

    const halfVFovTan = Math.tan((camera.fov * Math.PI) / 360);
    const limitingAspect = Math.min(1, aspect);
    camera.position.z = GEAR_RADIUS / (FILL_FACTOR * halfVFovTan * limitingAspect);
    camera.updateProjectionMatrix();

    const pr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pr);
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
    faceTexture.dispose();
    shadowTexture.dispose();
    shadowSprite.material.dispose();
    sharedToothGeometry.dispose();
    sparkGeo.dispose();
    sparkMat.dispose();
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj.geometry !== sharedToothGeometry) {
        obj.geometry.dispose();
      }
    });
    steelMat.dispose();
    facedMat.dispose();
    darkMat.dispose();
    copperMat.dispose();
    renderer.dispose();
    container.removeChild(renderer.domElement);
  };

  return { renderer, scene, camera, gearGroup, teeth, cutter, tiltGroup, dispose };
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
          tiltGroup: built.tiltGroup,
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
