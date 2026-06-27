import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface ArrayVisualizerProps {
  data: number[];
  highlightIndices?: number[];
  comparingIndices?: number[];
  swappingIndices?: number[];
  activeIndex?: number;
}

export default function ArrayVisualizer({
  data = [],
  highlightIndices = [],
  comparingIndices = [],
  swappingIndices = [],
  activeIndex = -1,
}: ArrayVisualizerProps) {
  const groupRef = useRef<THREE.Group>(null);

  const bars = useMemo(() => {
    if (!data.length) return [];
    const maxVal = Math.max(...data, 1);
    const spacing = 1.2;
    const totalWidth = data.length * spacing;
    const offset = totalWidth / 2;

    return data.map((val, i) => ({
      index: i,
      value: val,
      height: (val / maxVal) * 5 + 0.5,
      position: [i * spacing - offset, 0, 0] as [number, number, number],
    }));
  }, [data]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(Date.now() * 0.0002) * 0.1;
    }
  });

  const getBarColor = (index: number): string => {
    if (swappingIndices.includes(index)) return '#FF5722';
    if (comparingIndices.includes(index)) return '#FFEB3B';
    if (highlightIndices.includes(index)) return '#4CAF50';
    if (index === activeIndex) return '#2fadaa';
    return '#7B5EA7';
  };

  const getEmissiveIntensity = (index: number): number => {
    if (swappingIndices.includes(index)) return 0.6;
    if (comparingIndices.includes(index)) return 0.5;
    if (highlightIndices.includes(index)) return 0.4;
    if (index === activeIndex) return 0.5;
    return 0.1;
  };

  return (
    <group ref={groupRef}>
      {/* Ground plane */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#0A0A15" transparent opacity={0.5} />
      </mesh>

      {/* Grid lines */}
      {bars.map((bar) => (
        <mesh
          key={`grid-${bar.index}`}
          position={[bar.position[0], 0, bar.position[2] + 0.5]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.05, 8]} />
          <meshStandardMaterial
            color={getBarColor(bar.index)}
            transparent
            opacity={0.1}
          />
        </mesh>
      ))}

      {/* Array bars */}
      {bars.map((bar) => (
        <group key={bar.index}>
          {/* Bar */}
          <mesh position={[bar.position[0], bar.height / 2, 0]}>
            <boxGeometry args={[0.8, bar.height, 0.8]} />
            <meshStandardMaterial
              color={getBarColor(bar.index)}
              metalness={0.4}
              roughness={0.3}
              emissive={getBarColor(bar.index)}
              emissiveIntensity={getEmissiveIntensity(bar.index)}
            />
          </mesh>

          {/* Value label */}
          <Text
            position={[bar.position[0], bar.height + 0.4, 0]}
            fontSize={0.35}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
            font={undefined}
          >
            {String(bar.value)}
          </Text>

          {/* Index label */}
          <Text
            position={[bar.position[0], -0.4, 0]}
            fontSize={0.25}
            color="#8A8DA8"
            anchorX="center"
            anchorY="middle"
            font={undefined}
          >
            {String(bar.index)}
          </Text>
        </group>
      ))}

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#2fadaa" />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#7B5EA7" />
      <pointLight position={[0, -5, 5]} intensity={0.3} color="#8e3a6e" />
    </group>
  );
}
