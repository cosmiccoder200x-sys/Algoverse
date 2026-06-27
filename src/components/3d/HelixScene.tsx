import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BLOCK_COUNT = 54;
const SCALE = 0.27;
const tmpV = new THREE.Vector3();
const tmpU = new THREE.Vector3();
const tmpS = new THREE.Vector3();
const tmpM = new THREE.Matrix4();

function pathPosition(fi: number, t: number, out: THREE.Vector3 = tmpV): THREE.Vector3 {
  const r = 9.0;
  const dr = 0.5;
  const num = 9;
  const freq = 6.28318530718 * num;
  let x = 0, y = 0, z = 0;
  for (let i = 0; i <= 9; i++) {
    const ift = freq * (i * t + fi);
    const rdr = r + dr * Math.cos(ift);
    x += rdr * Math.cos((i + 1) * fi);
    y += rdr * Math.sin((i + 1) * fi);
    z += dr * Math.sin(ift);
  }
  out.set(x / num, y / num, z / num);
  return out;
}

export default function HelixScene({ scale = SCALE }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const instanceRefs = useRef<(THREE.InstancedMesh | null)[]>([]);

  const roundedBoxGeometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);

  const instanceData = useMemo(() => {
    const baseData: {
      fi: number;
      color: THREE.Color;
      scale: number;
      speed: number;
      index: number;
      shape: number;
    }[] = [];
    for (let i = 0; i < BLOCK_COUNT; i++) {
      const fi = i / BLOCK_COUNT;
      baseData.push({
        fi,
        color: new THREE.Color().setHSL((fi * 6) % 1, 0.65, 0.55),
        scale: 1 + 0.5 * Math.sin(fi * Math.PI * 4),
        speed: 0.15 + fi * 0.05,
        index: i,
        shape: i % 6,
      });
    }
    return baseData;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const t = time * 0.1;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
    }

    instanceData.forEach((data, i) => {
      const mesh = instanceRefs.current[i];
      if (!mesh) return;

      pathPosition(data.fi, t, tmpV);
      mesh.position.copy(tmpV);

      pathPosition(data.fi + 0.001, t, tmpU);
      tmpU.sub(mesh.position);
      tmpU.normalize();
      mesh.up.set(0, 1, 0);
      mesh.lookAt(mesh.position.clone().add(tmpU));

      tmpS.set(data.scale, data.scale, data.speed);
      tmpM.identity();
      tmpM.scale(tmpS);
      mesh.setMatrixAt(0, tmpM);
      mesh.instanceMatrix.needsUpdate = true;
    });
  });

  return (
    <group scale={[scale, scale, scale]}>
      {/* We'll use a simple mesh standard material for compatibility */}
      {instanceData.map((data, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) {
              pathPosition(data.fi, 0, tmpV);
              el.position.copy(tmpV);
            }
          }}
          position={pathPosition(data.fi, 0, new THREE.Vector3())}
        >
          <boxGeometry args={[data.scale, data.scale, data.scale]} />
          <meshStandardMaterial
            color={data.color}
            metalness={0.3}
            roughness={0.4}
            emissive={data.color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}
