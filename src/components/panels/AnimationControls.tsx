import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Zap,
  Grid3x3,
  Shuffle,
  Keyboard,
  Info,
  BookOpen,
} from 'lucide-react';
import { useStore } from '@/store/useStore';

interface AnimationControlsProps {
  onGenerateRandom: () => void;
  onCustomInput: () => void;
  onReset: () => void;
}

export default function AnimationControls({
  onGenerateRandom,
  onCustomInput,
  onReset,
}: AnimationControlsProps) {
  const { visualization, setAnimationPlaying, setAnimationSpeed, setAnimationStep, setLearningPanelOpen } =
    useStore();
  const { isPlaying, speed, currentStep, totalSteps } = visualization.animation;

  return (
    <div className="glass-panel rounded-xl p-4 space-y-4">
      {/* Playback Controls */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={onReset}
          className="p-2.5 rounded-lg hover:bg-white/5 transition-all text-[var(--color-text-secondary)] hover:text-white"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => setAnimationStep(Math.max(0, currentStep - 1))}
          className="p-2.5 rounded-lg hover:bg-white/5 transition-all text-[var(--color-text-secondary)] hover:text-white"
          title="Step Back"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          onClick={() => setAnimationPlaying(!isPlaying)}
          className="p-3 rounded-xl bg-[var(--color-brand-primary)] text-[var(--color-bg-primary)] hover:brightness-110 transition-all"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>

        <button
          onClick={() => setAnimationStep(Math.min(totalSteps - 1, currentStep + 1))}
          className="p-2.5 rounded-lg hover:bg-white/5 transition-all text-[var(--color-text-secondary)] hover:text-white"
          title="Step Forward"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        <button
          onClick={() => setLearningPanelOpen(true)}
          className="p-2.5 rounded-lg hover:bg-white/5 transition-all text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)]"
          title="Learn"
        >
          <BookOpen className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          <span>Step {currentStep}</span>
          <span>{totalSteps > 0 ? Math.round((currentStep / totalSteps) * 100) : 0}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] rounded-full transition-all duration-300"
            style={{
              width: `${totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      {/* Speed Control */}
      <div className="flex items-center gap-3">
        <Zap className="w-4 h-4 text-[var(--color-text-muted)]" />
        <input
          type="range"
          min={0.25}
          max={3}
          step={0.25}
          value={speed}
          onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
          className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-brand-primary)]"
        />
        <span className="text-xs font-mono-code text-[var(--color-text-secondary)] w-10 text-right">
          {speed}x
        </span>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onGenerateRandom}
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-[var(--color-border-subtle)] hover:border-[var(--color-border)] transition-all text-xs text-[var(--color-text-secondary)] hover:text-white"
        >
          <Shuffle className="w-3.5 h-3.5" />
          Random
        </button>
        <button
          onClick={onCustomInput}
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-[var(--color-border-subtle)] hover:border-[var(--color-border)] transition-all text-xs text-[var(--color-text-secondary)] hover:text-white"
        >
          <Keyboard className="w-3.5 h-3.5" />
          Custom
        </button>
      </div>

      {/* Operation Info */}
      {visualization.animation.operation && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-brand-primary)]/10 border border-[var(--color-brand-primary)]/20">
          <Info className="w-3.5 h-3.5 text-[var(--color-brand-primary)]" />
          <span className="text-xs text-[var(--color-brand-primary)]">
            {visualization.animation.operation}
          </span>
        </div>
      )}
    </div>
  );
}
