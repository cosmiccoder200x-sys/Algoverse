import { Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';
import ArrayVisualizer from './ArrayVisualizer';
import LinkedListVisualizer from './LinkedListVisualizer';
import TreeVisualizer from './TreeVisualizer';
import GraphVisualizer from './GraphVisualizer';
import SortingVisualizer from './SortingVisualizer';
import HelixScene from './HelixScene';

interface SceneContainerProps {
  mode: 'hero' | 'visualizer';
  visualizerType?: 'array' | 'linked-list' | 'tree' | 'graph' | 'sorting';
  data?: any;
  highlightIndices?: number[];
  comparingIndices?: number[];
  swappingIndices?: number[];
  activeIndex?: number;
  sortedIndices?: number[];
  pivotIndex?: number;
  algorithm?: string;
  treeNodes?: any[];
  treeRootId?: string | null;
  activeNodeId?: string | null;
  highlightNodeIds?: string[];
  visitedNodeIds?: string[];
  graphNodes?: any[];
  graphEdges?: any[];
  highlightEdgeIds?: string[];
  linkedListNodes?: any[];
  linkedListHeadId?: string | null;
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#2fadaa" wireframe />
    </mesh>
  );
}

export default function SceneContainer({
  mode,
  visualizerType = 'array',
  data = [],
  highlightIndices = [],
  comparingIndices = [],
  swappingIndices = [],
  activeIndex = -1,
  sortedIndices = [],
  pivotIndex = -1,
  algorithm = 'bubble-sort',
  treeNodes = [],
  treeRootId = null,
  activeNodeId = null,
  highlightNodeIds = [],
  visitedNodeIds = [],
  graphNodes = [],
  graphEdges = [],
  highlightEdgeIds = [],
  linkedListNodes = [],
  linkedListHeadId = null,
}: SceneContainerProps) {
  const renderVisualizer = useCallback(() => {
    switch (visualizerType) {
      case 'array':
        return (
          <ArrayVisualizer
            data={data}
            highlightIndices={highlightIndices}
            comparingIndices={comparingIndices}
            swappingIndices={swappingIndices}
            activeIndex={activeIndex}
          />
        );
      case 'linked-list':
        return (
          <LinkedListVisualizer
            nodes={linkedListNodes}
            headId={linkedListHeadId}
            activeNodeId={activeNodeId}
            highlightNodeIds={highlightNodeIds}
          />
        );
      case 'tree':
        return (
          <TreeVisualizer
            nodes={treeNodes}
            rootId={treeRootId}
            activeNodeId={activeNodeId}
            highlightNodeIds={highlightNodeIds}
            visitedNodeIds={visitedNodeIds}
          />
        );
      case 'graph':
        return (
          <GraphVisualizer
            nodes={graphNodes}
            edges={graphEdges}
            activeNodeId={activeNodeId}
            highlightNodeIds={highlightNodeIds}
            visitedNodeIds={visitedNodeIds}
            highlightEdgeIds={highlightEdgeIds}
          />
        );
      case 'sorting':
        return (
          <SortingVisualizer
            data={data}
            highlightIndices={highlightIndices}
            comparingIndices={comparingIndices}
            swappingIndices={swappingIndices}
            sortedIndices={sortedIndices}
            pivotIndex={pivotIndex}
            algorithm={algorithm}
          />
        );
      default:
        return <ArrayVisualizer data={data} />;
    }
  }, [
    visualizerType,
    data,
    highlightIndices,
    comparingIndices,
    swappingIndices,
    activeIndex,
    sortedIndices,
    pivotIndex,
    algorithm,
    treeNodes,
    treeRootId,
    activeNodeId,
    highlightNodeIds,
    visitedNodeIds,
    graphNodes,
    graphEdges,
    highlightEdgeIds,
    linkedListNodes,
    linkedListHeadId,
  ]);

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      camera={{
        position: mode === 'hero' ? [0, 0, 18] : [0, 2, 14],
        fov: 50,
        near: 0.1,
        far: 1000,
      }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={<LoadingFallback />}>
        {/* Environment */}
        <color attach="background" args={['#05050A']} />
        <fog attach="fog" args={['#05050A', 20, 60]} />

        {/* Stars background */}
        <Stars
          radius={50}
          depth={50}
          count={2000}
          factor={3}
          saturation={0}
          fade
          speed={0.5}
        />

        {/* Content */}
        {mode === 'hero' ? <HelixScene /> : renderVisualizer()}

        {/* Controls */}
        {mode === 'visualizer' && (
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={false}
            maxDistance={30}
            minDistance={5}
            target={[0, 2, 0]}
          />
        )}
        {mode === 'hero' && (
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={0.5}
            maxDistance={25}
            minDistance={15}
          />
        )}

        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 10, 5]} intensity={0.5} color="#ffffff" />
      </Suspense>
    </Canvas>
  );
}
