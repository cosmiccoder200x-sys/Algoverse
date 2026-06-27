import { useRef, useMemo } from 'react';
import { Text, Line } from '@react-three/drei';
import * as THREE from 'three';

interface TreeNode {
  id: string;
  value: number;
  left: string | null;
  right: string | null;
  x?: number;
  y?: number;
  z?: number;
}

interface TreeVisualizerProps {
  nodes: TreeNode[];
  rootId?: string | null;
  activeNodeId?: string | null;
  highlightNodeIds?: string[];
  visitedNodeIds?: string[];
  treeType?: 'binary' | 'bst' | 'avl' | 'heap';
}

export default function TreeVisualizer({
  nodes = [],
  rootId = null,
  activeNodeId = null,
  highlightNodeIds = [],
  visitedNodeIds = [],
  treeType = 'binary',
}: TreeVisualizerProps) {
  const groupRef = useRef<THREE.Group>(null);

  const nodePositions = useMemo(() => {
    if (!nodes.length || !rootId) return {};

    const positions: Record<string, [number, number, number]> = {};
    const nodeMap: Record<string, TreeNode> = {};
    nodes.forEach((n) => (nodeMap[n.id] = n));

    const calculatePositions = (
      nodeId: string | null,
      x: number,
      y: number,
      spread: number
    ) => {
      if (!nodeId || !nodeMap[nodeId]) return;
      positions[nodeId] = [x, y, 0];
      const node = nodeMap[nodeId];
      if (node.left) {
        calculatePositions(node.left, x - spread, y - 2.5, spread / 2);
      }
      if (node.right) {
        calculatePositions(node.right, x + spread, y - 2.5, spread / 2);
      }
    };

    calculatePositions(rootId, 0, 4, 6);
    return positions;
  }, [nodes, rootId]);

  const getNodeColor = (nodeId: string): string => {
    if (nodeId === activeNodeId) return '#2fadaa';
    if (highlightNodeIds.includes(nodeId)) return '#FF9800';
    if (visitedNodeIds.includes(nodeId)) return '#4CAF50';
    if (nodeId === rootId) return '#8e3a6e';
    return '#7B5EA7';
  };

  const getEmissiveIntensity = (nodeId: string): number => {
    if (nodeId === activeNodeId) return 0.6;
    if (highlightNodeIds.includes(nodeId)) return 0.5;
    if (visitedNodeIds.includes(nodeId)) return 0.4;
    if (nodeId === rootId) return 0.35;
    return 0.15;
  };

  const connections = useMemo(() => {
    const lines: { from: THREE.Vector3; to: THREE.Vector3; color: string }[] = [];
    nodes.forEach((node) => {
      const from = nodePositions[node.id];
      if (!from) return;
      if (node.left && nodePositions[node.left]) {
        lines.push({
          from: new THREE.Vector3(...from),
          to: new THREE.Vector3(...nodePositions[node.left]),
          color: highlightNodeIds.includes(node.left) ? '#FF9800' : '#4A4D68',
        });
      }
      if (node.right && nodePositions[node.right]) {
        lines.push({
          from: new THREE.Vector3(...from),
          to: new THREE.Vector3(...nodePositions[node.right]),
          color: highlightNodeIds.includes(node.right) ? '#FF9800' : '#4A4D68',
        });
      }
    });
    return lines;
  }, [nodes, nodePositions, highlightNodeIds]);

  return (
    <group ref={groupRef}>
      {/* Ground */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0A0A15" transparent opacity={0.3} />
      </mesh>

      {/* Edge connections */}
      {connections.map((conn, i) => (
        <Line
          key={`edge-${i}`}
          points={[conn.from, conn.to]}
          color={conn.color}
          lineWidth={2}
        />
      ))}

      {/* Nodes */}
      {nodes.map((node) => {
        const pos = nodePositions[node.id];
        if (!pos) return null;
        const isActive = node.id === activeNodeId;
        return (
          <group key={node.id} position={pos}>
            {/* Node sphere */}
            <mesh>
              <sphereGeometry args={[isActive ? 0.55 : 0.45, 32, 32]} />
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
                <ringGeometry args={[0.6, 0.7, 32]} />
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

            {/* Value text */}
            <Text
              position={[0, 0, 0.5]}
              fontSize={0.3}
              color="#FFFFFF"
              anchorX="center"
              anchorY="middle"
              font={undefined}
            >
              {String(node.value)}
            </Text>

            {/* Node ID label below */}
            <Text
              position={[0, -0.7, 0]}
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

      {/* Tree type label */}
      <Text
        position={[0, 6.5, 0]}
        fontSize={0.4}
        color="#8A8DA8"
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {treeType.toUpperCase()} TREE
      </Text>

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#2fadaa" />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#7B5EA7" />
      <pointLight position={[0, 10, -5]} intensity={0.3} color="#8e3a6e" />
    </group>
  );
}
