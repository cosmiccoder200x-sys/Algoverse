import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface SortingVisualizerProps {
  data: number[];
  highlightIndices?: number[];
  comparingIndices?: number[];
  swappingIndices?: number[];
  sortedIndices?: number[];
  pivotIndex?: number;
  algorithm?: string;
}

export default function SortingVisualizer({
  data = [],
  highlightIndices = [],
  comparingIndices = [],
  swappingIndices = [],
  sortedIndices = [],
  pivotIndex = -1,
  algorithm = 'bubble-sort',
}: SortingVisualizerProps) {
  const groupRef = useRef<THREE.Group>(null);

  const bars = useMemo(() => {
    if (!data.length) return [];
    const maxVal = Math.max(...data, 1);
    const spacing = 1.1;
    const totalWidth = data.length * spacing;
    const offset = totalWidth / 2;

    return data.map((val, i) => ({
      index: i,
      value: val,
      height: (val / maxVal) * 6 + 0.3,
      position: [i * spacing - offset, 0, 0] as [number, number, number],
    }));
  }, [data]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(Date.now() * 0.00015) * 0.05;
    }
  });

  const getBarColor = (index: number): string => {
    if (sortedIndices.includes(index)) return '#4CAF50';
    if (swappingIndices.includes(index)) return '#FF5722';
    if (comparingIndices.includes(index)) return '#FFEB3B';
    if (index === pivotIndex) return '#2196F3';
    if (highlightIndices.includes(index)) return '#9C27B0';
    return '#7B5EA7';
  };

  const getEmissiveIntensity = (index: number): number => {
    if (sortedIndices.includes(index)) return 0.3;
    if (swappingIndices.includes(index)) return 0.7;
    if (comparingIndices.includes(index)) return 0.6;
    if (index === pivotIndex) return 0.5;
    if (highlightIndices.includes(index)) return 0.4;
    return 0.1;
  };

  return (
    <group ref={groupRef}>
      {/* Ground */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial color="#0A0A15" transparent opacity={0.5} />
      </mesh>

      {/* Algorithm label */}
      <Text
        position={[0, 8, -3]}
        fontSize={0.5}
        color="#8A8DA8"
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {algorithm.replace('-', ' ').toUpperCase()}
      </Text>

      {/* Bars */}
      {bars.map((bar) => (
        <group key={bar.index}>
          {/* Bar */}
          <mesh position={[bar.position[0], bar.height / 2, 0]}>
            <cylinderGeometry args={[0.35, 0.35, bar.height, 16]} />
            <meshStandardMaterial
              color={getBarColor(bar.index)}
              metalness={0.3}
              roughness={0.4}
              emissive={getBarColor(bar.index)}
              emissiveIntensity={getEmissiveIntensity(bar.index)}
            />
          </mesh>

          {/* Top cap */}
          <mesh position={[bar.position[0], bar.height, 0]}>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshStandardMaterial
              color={getBarColor(bar.index)}
              metalness={0.5}
              roughness={0.2}
              emissive={getBarColor(bar.index)}
              emissiveIntensity={getEmissiveIntensity(bar.index) * 1.2}
            />
          </mesh>

          {/* Value label */}
          <Text
            position={[bar.position[0], bar.height + 0.6, 0]}
            fontSize={0.3}
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
            fontSize={0.22}
            color="#4A4D68"
            anchorX="center"
            anchorY="middle"
            font={undefined}
          >
            {String(bar.index)}
          </Text>
        </group>
      ))}

      {/* Legend */}
      <group position={[-12, 7, 0]}>
        {[
          { color: '#4CAF50', label: 'Sorted' },
          { color: '#FF5722', label: 'Swapping' },
          { color: '#FFEB3B', label: 'Comparing' },
          { color: '#2196F3', label: 'Pivot' },
          { color: '#7B5EA7', label: 'Unsorted' },
        ].map((item, i) => (
          <group key={item.label} position={[0, -i * 0.6, 0]}>
            <mesh position={[-0.5, 0, 0]}>
              <sphereGeometry args={[0.15, 8, 8]} />
              <meshStandardMaterial color={item.color} />
            </mesh>
            <Text
              position={[0.3, 0, 0]}
              fontSize={0.2}
              color="#8A8DA8"
              anchorX="left"
              anchorY="middle"
              font={undefined}
            >
              {item.label}
            </Text>
          </group>
        ))}
      </group>

      {/* Lighting */}
      <ambientLight intensity={0.35} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#2fadaa" />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#7B5EA7" />
      <pointLight position={[0, -5, 5]} intensity={0.3} color="#8e3a6e" />
    </group>
  );
}
