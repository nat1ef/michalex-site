import * as THREE from "three";

/** Builds a 2D gear profile for extrusion. */
export function createGearShape(
  teeth: number,
  outerR: number,
  innerR: number
): THREE.Shape {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;

  for (let i = 0; i < teeth; i++) {
    const a0 = i * step;
    const a1 = a0 + step * 0.12;
    const a2 = a0 + step * 0.38;
    const a3 = a0 + step * 0.62;
    const a4 = a0 + step * 0.88;

    const pt = (angle: number, r: number) => {
      const a = angle - Math.PI / 2;
      return new THREE.Vector2(r * Math.cos(a), r * Math.sin(a));
    };

    const p0 = pt(a0, innerR);
    const p1 = pt(a1, outerR);
    const p2 = pt(a2, outerR);
    const p3 = pt(a3, innerR);
    const p4 = pt(a4, innerR);

    if (i === 0) shape.moveTo(p0.x, p0.y);
    else shape.lineTo(p0.x, p0.y);
    shape.lineTo(p1.x, p1.y);
    shape.lineTo(p2.x, p2.y);
    shape.lineTo(p3.x, p3.y);
    shape.lineTo(p4.x, p4.y);
  }

  return shape;
}

export function createGearGeometry(
  teeth: number,
  outerR: number,
  innerR: number,
  depth: number,
  holeR: number
): THREE.ExtrudeGeometry {
  const shape = createGearShape(teeth, outerR, innerR);
  const hole = new THREE.Path();
  hole.absarc(0, 0, holeR, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  return new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 2,
    curveSegments: 12,
  });
}

export type GearConfig = {
  position: [number, number, number];
  rotation: [number, number, number];
  teeth: number;
  outerR: number;
  innerR: number;
  depth: number;
  holeR: number;
  speed: number;
  color?: string;
  metalness?: number;
  roughness?: number;
};

export const sceneGears: GearConfig[] = [
  {
    position: [3.2, 0.3, 0],
    rotation: [0.4, -0.3, 0],
    teeth: 24,
    outerR: 1.1,
    innerR: 0.92,
    depth: 0.18,
    holeR: 0.22,
    speed: 0.35,
    color: "#8a8f98",
  },
  {
    position: [1.85, 0.25, 0.15],
    rotation: [0.3, 0.2, 0],
    teeth: 16,
    outerR: 0.72,
    innerR: 0.6,
    depth: 0.15,
    holeR: 0.14,
    speed: -0.52,
    color: "#6b7078",
  },
  {
    position: [4.1, -0.9, -0.3],
    rotation: [0.6, -0.5, 0.2],
    teeth: 20,
    outerR: 0.85,
    innerR: 0.7,
    depth: 0.14,
    holeR: 0.16,
    speed: 0.28,
    color: "#757a82",
  },
  {
    position: [2.8, -1.4, -0.5],
    rotation: [0.8, 0.1, 0],
    teeth: 12,
    outerR: 0.5,
    innerR: 0.42,
    depth: 0.12,
    holeR: 0.1,
    speed: -0.65,
    color: "#c47a2a",
    metalness: 0.95,
    roughness: 0.25,
  },
  {
    position: [-2.5, 0.8, -2],
    rotation: [0, 0.4, 0],
    teeth: 32,
    outerR: 1.6,
    innerR: 1.35,
    depth: 0.1,
    holeR: 0.3,
    speed: 0.12,
    color: "#3a3f48",
    metalness: 0.8,
    roughness: 0.5,
  },
  {
    position: [-1.2, -1.2, -1.5],
    rotation: [0.2, -0.2, 0],
    teeth: 18,
    outerR: 0.9,
    innerR: 0.75,
    depth: 0.12,
    holeR: 0.18,
    speed: -0.18,
    color: "#454a52",
  },
];
