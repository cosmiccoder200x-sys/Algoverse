import { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  Maximize2,
  BookOpen,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import SceneContainer from '@/components/3d/SceneContainer';
import AnimationControls from '@/components/panels/AnimationControls';
import LearningPanel from '@/components/panels/LearningPanel';
import { useStore } from '@/store/useStore';
import { dataStructures } from '@/data/dataStructures';
import { algorithms } from '@/data/algorithms';

function generateRandomArray(size: number = 10, max: number = 100): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);
}

function generateLinkedListNodes(count: number = 8) {
  const nodes: { id: string; value: number; next: string | null }[] = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      id: `node-${i}`,
      value: Math.floor(Math.random() * 99) + 1,
      next: i < count - 1 ? `node-${i + 1}` : null,
    });
  }
  return { nodes, headId: count > 0 ? 'node-0' : null };
}

function generateTreeNodes(count: number = 15) {
  const nodes: { id: string; value: number; left: string | null; right: string | null }[] = [];
  for (let i = 0; i < count; i++) {
    const leftIdx = 2 * i + 1;
    const rightIdx = 2 * i + 2;
    nodes.push({
      id: `node-${i}`,
      value: Math.floor(Math.random() * 99) + 1,
      left: leftIdx < count ? `node-${leftIdx}` : null,
      right: rightIdx < count ? `node-${rightIdx}` : null,
    });
  }
  return { nodes, rootId: count > 0 ? 'node-0' : null };
}

function generateGraphData(nodeCount: number = 8) {
  const nodes = Array.from({ length: nodeCount }, (_, i) => ({
    id: `v${i}`,
    label: String(i),
  }));
  const edges: { from: string; to: string; weight?: number }[] = [];
  for (let i = 0; i < nodeCount; i++) {
    const numEdges = Math.floor(Math.random() * 2) + 1;
    for (let j = 0; j < numEdges; j++) {
      const target = Math.floor(Math.random() * nodeCount);
      if (target !== i) {
        edges.push({
          from: `v${i}`,
          to: `v${target}`,
          weight: Math.floor(Math.random() * 20) + 1,
        });
      }
    }
  }
  return { nodes, edges };
}

export default function Visualization() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const animationRef = useRef<number | null>(null);

  const {
    visualization,
    setSelectedDataStructure,
    setSelectedAlgorithm,
    setData,
    setAnimationPlaying,
    setAnimationStep,
    setTotalSteps,
    setOperation,
    setHighlightIndices,
    setComparingIndices,
    setSwappingIndices,
    setLearningPanelOpen,
    resetVisualization,
  } = useStore();

  const [visualizerType, setVisualizerType] = useState<string>('array');
  const [linkedListData, setLinkedListData] = useState(generateLinkedListNodes());
  const [treeData, setTreeData] = useState(generateTreeNodes());
  const [graphData, setGraphData] = useState(generateGraphData());
  const [customInputOpen, setCustomInputOpen] = useState(false);
  const [customInputValue, setCustomInputValue] = useState('');

  const item =
    type === 'ds'
      ? dataStructures.find((ds) => ds.id === id)
      : algorithms.find((a) => a.id === id);

  // Initialize
  useEffect(() => {
    resetVisualization();
    if (type === 'ds' && id) {
      setSelectedDataStructure(id);
      setSelectedAlgorithm(null);
      const ds = dataStructures.find((d) => d.id === id);
      if (ds) {
        switch (ds.category) {
          case 'linear':
            if (ds.id === 'linked-list') {
              setVisualizerType('linked-list');
              setLinkedListData(generateLinkedListNodes());
            } else if (ds.id === 'stack' || ds.id === 'queue') {
              setVisualizerType('array');
              setData(generateRandomArray(ds.id === 'stack' ? 8 : 8));
            } else {
              setVisualizerType('array');
              setData(generateRandomArray());
            }
            break;
          case 'tree':
            setVisualizerType('tree');
            setTreeData(generateTreeNodes());
            break;
          case 'graph':
            setVisualizerType('graph');
            setGraphData(generateGraphData());
            break;
          default:
            setVisualizerType('array');
            setData(generateRandomArray());
        }
      }
    } else if (type === 'algo' && id) {
      setSelectedAlgorithm(id);
      setSelectedDataStructure(null);
      const algo = algorithms.find((a) => a.id === id);
      if (algo) {
        if (algo.category === 'sorting') {
          setVisualizerType('sorting');
          setData(generateRandomArray(10, 50));
        } else if (algo.category === 'searching') {
          setVisualizerType('array');
          const sorted = generateRandomArray(15, 50).sort((a, b) => a - b);
          setData(sorted);
        } else if (algo.category === 'graph') {
          setVisualizerType('graph');
          setGraphData(generateGraphData());
        } else {
          setVisualizerType('array');
          setData(generateRandomArray());
        }
      }
    }
  }, [type, id]);

  // Animation loop
  useEffect(() => {
    if (visualization.animation.isPlaying) {
      const animate = () => {
        if (visualization.animation.currentStep < visualization.animation.totalSteps) {
          setAnimationStep(visualization.animation.currentStep + 1);
          runAnimationStep(visualization.animation.currentStep + 1);
        } else {
          setAnimationPlaying(false);
        }
        animationRef.current = requestAnimationFrame(animate);
      };
      const timeout = setTimeout(() => {
        animationRef.current = requestAnimationFrame(animate);
      }, 1000 / visualization.animation.speed);
      return () => {
        clearTimeout(timeout);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
    }
  }, [visualization.animation.isPlaying, visualization.animation.speed]);

  const runAnimationStep = useCallback(
    (step: number) => {
      if (type === 'algo' && id?.includes('sort')) {
        // Simulate sorting steps
        const data = [...visualization.data];
        if (step < data.length) {
          setComparingIndices([step, step + 1]);
          setOperation(`Comparing elements at indices ${step} and ${step + 1}`);
          if (data[step] > data[step + 1]) {
            setSwappingIndices([step, step + 1]);
            [data[step], data[step + 1]] = [data[step + 1], data[step]];
            setData(data);
          }
        } else {
          setComparingIndices([]);
          setSwappingIndices([]);
          setHighlightIndices([...Array(data.length).keys()]);
          setOperation('Sorting complete!');
        }
      }
    },
    [type, id, visualization.data]
  );

  const handleGenerateRandom = useCallback(() => {
    resetVisualization();
    if (visualizerType === 'array' || visualizerType === 'sorting') {
      const newData = generateRandomArray(10, 50);
      setData(newData);
    } else if (visualizerType === 'linked-list') {
      setLinkedListData(generateLinkedListNodes());
    } else if (visualizerType === 'tree') {
      setTreeData(generateTreeNodes());
    } else if (visualizerType === 'graph') {
      setGraphData(generateGraphData());
    }
    setTotalSteps(visualization.data.length * 2);
  }, [visualizerType, resetVisualization]);

  const handleCustomInput = useCallback(() => {
    setCustomInputOpen(true);
  }, []);

  const handleCustomInputSubmit = useCallback(() => {
    const values = customInputValue
      .split(/[,\s]+/)
      .map((v) => parseInt(v.trim()))
      .filter((v) => !isNaN(v));
    if (values.length > 0) {
      setData(values);
      setCustomInputOpen(false);
      setCustomInputValue('');
      setTotalSteps(values.length * 2);
    }
  }, [customInputValue, setData, setTotalSteps]);

  const handleReset = useCallback(() => {
    resetVisualization();
    setHighlightIndices([]);
    setComparingIndices([]);
    setSwappingIndices([]);
    handleGenerateRandom();
  }, [resetVisualization, handleGenerateRandom]);

  if (!item) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[var(--color-text-secondary)] mb-4">Item not found</p>
          <button
            onClick={() => navigate('/')}
            className="text-[var(--color-brand-primary)] hover:underline"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-30 glass-panel border-b border-[var(--color-border-subtle)]">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(type === 'ds' ? '/data-structures' : '/algorithms')}
              className="p-2 rounded-lg hover:bg-white/5 transition-all text-[var(--color-text-secondary)] hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="h-6 w-px bg-[var(--color-border-subtle)]" />
            <h1 className="font-display font-semibold text-white text-sm">{item.name}</h1>
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded-full capitalize"
              style={{
                backgroundColor: `${type === 'ds' ? '#2fadaa' : '#7B5EA7'}20`,
                color: type === 'ds' ? '#2fadaa' : '#7B5EA7',
              }}
            >
              {'category' in item ? item.category : item.category.replace('-', ' ')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLearningPanelOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Learn</span>
            </button>
            <button className="p-2 rounded-lg hover:bg-white/5 transition-all text-[var(--color-text-secondary)] hover:text-white">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-14 flex h-screen">
        {/* 3D Canvas */}
        <div className="flex-1 relative">
          <SceneContainer
            mode="visualizer"
            visualizerType={visualizerType as 'array' | 'linked-list' | 'tree' | 'graph' | 'sorting'}
            data={visualization.data}
            highlightIndices={visualization.highlightIndices}
            comparingIndices={visualization.comparingIndices}
            swappingIndices={visualization.swappingIndices}
            activeIndex={-1}
            sortedIndices={[]}
            pivotIndex={-1}
            algorithm={'id' in item ? item.id : 'bubble-sort'}
            treeNodes={treeData.nodes}
            treeRootId={treeData.rootId}
            graphNodes={graphData.nodes}
            graphEdges={graphData.edges}
            linkedListNodes={linkedListData.nodes}
            linkedListHeadId={linkedListData.headId}
          />

          {/* Custom Input Modal */}
          {customInputOpen && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50">
              <div className="glass-panel rounded-xl p-6 w-96 max-w-[90vw]">
                <h3 className="font-display font-semibold text-white mb-3">Custom Input</h3>
                <p className="text-xs text-[var(--color-text-secondary)] mb-3">
                  Enter comma-separated numbers
                </p>
                <input
                  type="text"
                  value={customInputValue}
                  onChange={(e) => setCustomInputValue(e.target.value)}
                  placeholder="e.g., 5, 2, 8, 1, 9"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-[var(--color-border-subtle)] text-white text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-brand-primary)]/50 mb-4"
                  onKeyDown={(e) => e.key === 'Enter' && handleCustomInputSubmit()}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setCustomInputOpen(false)}
                    className="flex-1 py-2 rounded-lg text-xs text-[var(--color-text-secondary)] hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCustomInputSubmit}
                    className="flex-1 py-2 rounded-lg bg-[var(--color-brand-primary)] text-[var(--color-bg-primary)] text-xs font-medium hover:brightness-110 transition-all"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Controls */}
        <div
          className={`w-72 glass-panel border-l border-[var(--color-border-subtle)] p-4 space-y-4 overflow-y-auto transition-all ${
            useStore.getState().learningPanelOpen ? 'hidden lg:block' : ''
          }`}
        >
          {/* Info Card */}
          <div className="glass-panel rounded-xl p-4">
            <h3 className="font-display font-semibold text-white text-sm mb-2">{item.name}</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3">
              {item.description}
            </p>
            <div className="flex items-center gap-2">
              <span className="font-mono-code text-[10px] text-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/10 px-2 py-1 rounded">
                T: {item.complexities.time.average}
              </span>
              <span className="font-mono-code text-[10px] text-[var(--color-brand-secondary)] bg-[var(--color-brand-secondary)]/10 px-2 py-1 rounded">
                S: {item.complexities.space}
              </span>
            </div>
          </div>

          {/* Animation Controls */}
          <AnimationControls
            onGenerateRandom={handleGenerateRandom}
            onCustomInput={handleCustomInput}
            onReset={handleReset}
          />

          {/* Operations (for data structures) */}
          {'operations' in item && (
            <div className="glass-panel rounded-xl p-4">
              <h4 className="text-xs font-semibold text-white mb-3 uppercase tracking-wide">
                Operations
              </h4>
              <div className="space-y-1.5">
                {item.operations.map((op: any) => (
                  <button
                    key={op.name}
                    onClick={() => {
                      setOperation(op.name);
                      setTotalSteps(10);
                      setAnimationStep(0);
                      setAnimationPlaying(true);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition-all text-left group"
                  >
                    <div>
                      <span className="text-xs text-white group-hover:text-[var(--color-brand-primary)] transition-colors">
                        {op.name}
                      </span>
                      <p className="text-[10px] text-[var(--color-text-muted)]">
                        {op.description}
                      </p>
                    </div>
                    <ChevronRight className="w-3 h-3 text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Steps (for algorithms) */}
          {'steps' in item && (
            <div className="glass-panel rounded-xl p-4">
              <h4 className="text-xs font-semibold text-white mb-3 uppercase tracking-wide">
                Algorithm Steps
              </h4>
              <div className="space-y-1.5">
                {item.steps.map((step: string, i: number) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 px-3 py-2 rounded-lg transition-all ${
                      visualization.animation.currentStep === i
                        ? 'bg-[var(--color-brand-primary)]/10 border border-[var(--color-brand-primary)]/20'
                        : ''
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                        visualization.animation.currentStep >= i
                          ? 'bg-[var(--color-brand-primary)]/20 text-[var(--color-brand-primary)]'
                          : 'bg-white/5 text-[var(--color-text-muted)]'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-xs text-[var(--color-text-secondary)]">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="glass-panel rounded-xl p-4">
            <h4 className="text-xs font-semibold text-white mb-3 uppercase tracking-wide">
              Quick Actions
            </h4>
            <div className="space-y-1.5">
              <button
                onClick={handleGenerateRandom}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-all text-left"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                <span className="text-xs text-[var(--color-text-secondary)]">
                  Generate Random Data
                </span>
              </button>
              <button
                onClick={() => setLearningPanelOpen(true)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-all text-left"
              >
                <BookOpen className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                <span className="text-xs text-[var(--color-text-secondary)]">
                  View Documentation
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Panel */}
      <LearningPanel />
    </div>
  );
}
