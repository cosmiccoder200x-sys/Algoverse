import { useRef, useMemo } from 'react';
import { Text, Line } from '@react-three/drei';
import * as THREE from 'three';

interface LinkedListNode {
  id: string;
  value: number;
  next: string | null;
}

interface LinkedListVisualizerProps {
  nodes: LinkedListNode[];
  headId?: string | null;
  activeNodeId?: string | null;
  highlightNodeIds?: string[];
}

export default function LinkedListVisualizer({
  nodes = [],
  headId = null,
  activeNodeId = null,
  highlightNodeIds = [],
}: LinkedListVisualizerProps) {
  const groupRef = useRef<THREE.Group>(null);

  const nodePositions = useMemo(() => {
    const positions: Record<string, [number, number, number]> = {};
    const spacing = 2.5;
    const maxPerRow = 6;

    nodes.forEach((node, i) => {
      const row = Math.floor(i / maxPerRow);
      const col = i % maxPerRow;
      const xOffset = row % 2 === 0 ? col : maxPerRow - 1 - col;
      positions[node.id] = [
        xOffset * spacing - (maxPerRow * spacing) / 2,
        -row * 3,
        0,
      ];
    });

    return positions;
  }, [nodes]);

  const getNodeColor = (nodeId: string): string => {
    if (nodeId === activeNodeId) return '#2fadaa';
    if (highlightNodeIds.includes(nodeId)) return '#FF9800';
    if (nodeId === headId) return '#4CAF50';
    return '#7B5EA7';
  };

  const getEmissiveIntensity = (nodeId: string): number => {
    if (nodeId === activeNodeId) return 0.5;
    if (highlightNodeIds.includes(nodeId)) return 0.4;
    if (nodeId === headId) return 0.4;
    return 0.15;
  };

  const connections = useMemo(() => {
    const lines: { from: [number, number, number]; to: [number, number, number] }[] = [];
    nodes.forEach((node) => {
      if (node.next && nodePositions[node.id] && nodePositions[node.next]) {
        const from = nodePositions[node.id];
        const to = nodePositions[node.next];
        lines.push({
          from: [from[0] + 0.5, from[1], from[2]],
          to: [to[0] - 0.5, to[1], to[2]],
        });
      }
    });
    return lines;
  }, [nodes, nodePositions]);

  return (
    <group ref={groupRef}>
      {/* Ground */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#0A0A15" transparent opacity={0.3} />
      </mesh>

      {/* Connections */}
      {connections.map((conn, i) => (
        <Line
          key={`conn-${i}`}
          points={[new THREE.Vector3(...conn.from), new THREE.Vector3(...conn.to)]}
          color="#4A4D68"
          lineWidth={2}
        />
      ))}

      {/* Arrow heads */}
      {connections.map((conn, i) => {
        const midX = (conn.from[0] + conn.to[0]) / 2;
        const midY = (conn.from[1] + conn.to[1]) / 2;
        return (
          <mesh key={`arrow-${i}`} position={[midX, midY, 0]}>
            <coneGeometry args={[0.15, 0.3, 4]} />
            <meshStandardMaterial color="#4A4D68" />
          </mesh>
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => {
        const pos = nodePositions[node.id];
        if (!pos) return null;
        return (
          <group key={node.id} position={pos}>
            {/* Node body */}
            <mesh>
              <boxGeometry args={[1.2, 0.8, 0.6]} />
              <meshStandardMaterial
                color={getNodeColor(node.id)}
                metalness={0.3}
                roughness={0.4}
                emissive={getNodeColor(node.id)}
                emissiveIntensity={getEmissiveIntensity(node.id)}
              />
            </mesh>

            {/* Data section */}
            <mesh position={[-0.25, 0, 0.31]}>
              <boxGeometry args={[0.6, 0.7, 0.02]} />
              <meshStandardMaterial color="#0A0A15" />
            </mesh>

            {/* Next pointer section */}
            <mesh position={[0.25, 0, 0.31]}>
              <boxGeometry args={[0.6, 0.7, 0.02]} />
              <meshStandardMaterial color="#05050A" />
            </mesh>

            {/* Value text */}
            <Text
              position={[-0.25, 0, 0.35]}
              fontSize={0.3}
              color="#FFFFFF"
              anchorX="center"
              anchorY="middle"
              font={undefined}
            >
              {String(node.value)}
            </Text>

            {/* Next pointer text */}
            <Text
              position={[0.25, 0, 0.35]}
              fontSize={0.2}
              color="#8A8DA8"
              anchorX="center"
              anchorY="middle"
              font={undefined}
            >
              {node.next || 'null'}
            </Text>

            {/* Node ID label */}
            <Text
              position={[0, -0.6, 0]}
              fontSize={0.18}
              color="#4A4D68"
              anchorX="center"
              anchorY="middle"
              font={undefined}
            >
              {node.id}
            </Text>
          </group>
        );
      })}

      {/* Head pointer */}
      {headId && nodePositions[headId] && (
        <group>
          <Text
            position={[nodePositions[headId][0], nodePositions[headId][1] + 0.7, 0]}
            fontSize={0.22}
            color="#4CAF50"
            anchorX="center"
            anchorY="middle"
            font={undefined}
          >
            HEAD
          </Text>
          <mesh position={[nodePositions[headId][0], nodePositions[headId][1] + 0.5, 0]}>
            <coneGeometry args={[0.1, 0.2, 4]} />
            <meshStandardMaterial color="#4CAF50" />
          </mesh>
        </group>
      )}

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#2fadaa" />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#7B5EA7" />
    </group>
  );
}
