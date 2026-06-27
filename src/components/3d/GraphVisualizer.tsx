import { useRef, useMemo } from 'react';
import { Text, Line } from '@react-three/drei';
import * as THREE from 'three';

interface GraphNode {
  id: string;
  label: string;
  x?: number;
  y?: number;
  z?: number;
}

interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
  directed?: boolean;
}

interface GraphVisualizerProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  activeNodeId?: string | null;
  highlightNodeIds?: string[];
  visitedNodeIds?: string[];
  highlightEdgeIds?: string[];
}

export default function GraphVisualizer({
  nodes = [],
  edges = [],
  activeNodeId = null,
  highlightNodeIds = [],
  visitedNodeIds = [],
  highlightEdgeIds = [],
}: GraphVisualizerProps) {
  const groupRef = useRef<THREE.Group>(null);

  const nodePositions = useMemo(() => {
    const positions: Record<string, [number, number, number]> = {};
    const count = nodes.length;
    if (count === 0) return positions;

    // Position nodes in a circle with some randomness
    const radius = count <= 5 ? 4 : count <= 10 ? 6 : 8;
    nodes.forEach((node, i) => {
      const angle = (i / count) * Math.PI * 2;
      const r = radius + (Math.sin(i * 3) * 1.5);
      positions[node.id] = [
        Math.cos(angle) * r,
        Math.sin(angle) * r,
        0,
      ];
    });

    return positions;
  }, [nodes]);

  const getNodeColor = (nodeId: string): string => {
    if (nodeId === activeNodeId) return '#2fadaa';
    if (highlightNodeIds.includes(nodeId)) return '#FF9800';
    if (visitedNodeIds.includes(nodeId)) return '#4CAF50';
    return '#7B5EA7';
  };

  const getEmissiveIntensity = (nodeId: string): number => {
    if (nodeId === activeNodeId) return 0.6;
    if (highlightNodeIds.includes(nodeId)) return 0.5;
    if (visitedNodeIds.includes(nodeId)) return 0.4;
    return 0.15;
  };

  const edgeLines = useMemo(() => {
    return edges.map((edge, i) => {
      const from = nodePositions[edge.from];
      const to = nodePositions[edge.to];
      if (!from || !to) return null;
      const isHighlighted = highlightEdgeIds.includes(`${edge.from}-${edge.to}`);
      return {
        key: `edge-${i}`,
        points: [new THREE.Vector3(...from), new THREE.Vector3(...to)],
        color: isHighlighted ? '#2fadaa' : '#4A4D68',
        lineWidth: isHighlighted ? 3 : 1.5,
        weight: edge.weight,
        midPoint: new THREE.Vector3(
          (from[0] + to[0]) / 2,
          (from[1] + to[1]) / 2,
          0.2
        ),
      };
    }).filter(Boolean);
  }, [edges, nodePositions, highlightEdgeIds]);

  return (
    <group ref={groupRef}>
      {/* Ground */}
      <mesh position={[0, 0, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0A0A15" transparent opacity={0.3} />
      </mesh>

      {/* Edges */}
      {edgeLines.map((line) =>
        line ? (
          <group key={line.key}>
            <Line
              points={line.points}
              color={line.color}
              lineWidth={line.lineWidth}
            />
            {line.weight !== undefined && (
              <Text
                position={[line.midPoint.x, line.midPoint.y, line.midPoint.z]}
                fontSize={0.25}
                color="#8A8DA8"
                anchorX="center"
                anchorY="middle"
                font={undefined}
              >
                {String(line.weight)}
              </Text>
            )}
          </group>
        ) : null
      )}

      {/* Nodes */}
      {nodes.map((node) => {
        const pos = nodePositions[node.id];
        if (!pos) return null;
        const isActive = node.id === activeNodeId;
        return (
          <group key={node.id} position={pos}>
            {/* Node sphere */}
            <mesh>
              <sphereGeometry args={[isActive ? 0.6 : 0.5, 32, 32]} />
              <meshStandardMaterial
                color={getNodeColor(node.id)}
                metalness={0.4}
                roughness={0.3}
                emissive={getNodeColor(node.id)}
                emissiveIntensity={getEmissiveIntensity(node.id)}
              />
            </mesh>

            {/* Glow ring for active node */}
            {isActive && (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.7, 0.85, 32]} />
                <meshStandardMaterial
                  color="#2fadaa"
                  emissive="#2fadaa"
                  emissiveIntensity={0.8}
                  transparent
                  opacity={0.6}
                  side={THREE.DoubleSide}
                />
              </mesh>
            )}

            {/* Label */}
            <Text
              position={[0, 0, 0.55]}
              fontSize={0.28}
              color="#FFFFFF"
              anchorX="center"
              anchorY="middle"
              font={undefined}
            >
              {node.label}
            </Text>
          </group>
        );
      })}

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#2fadaa" />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#7B5EA7" />
      <pointLight position={[0, 0, 10]} intensity={0.4} color="#8e3a6e" />
    </group>
  );
}
