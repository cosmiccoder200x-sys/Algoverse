import { useState } from 'react';
import {
  Trophy,
  Flame,
  Target,
  CheckCircle,
  XCircle,
  ArrowRight,
  Star,
  Zap,
  Clock,
  TrendingUp,
} from 'lucide-react';
import NavBar from '@/components/NavBar';

interface Challenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  points: number;
  completed: boolean;
  description: string;
}

const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Reverse an Array',
    difficulty: 'Easy',
    category: 'Arrays',
    points: 10,
    completed: true,
    description: 'Write a function to reverse an array in-place.',
  },
  {
    id: '2',
    title: 'Detect Cycle in Linked List',
    difficulty: 'Medium',
    category: 'Linked List',
    points: 25,
    completed: true,
    description: 'Use Floyd\'s cycle detection algorithm.',
  },
  {
    id: '3',
    title: 'Implement LRU Cache',
    difficulty: 'Hard',
    category: 'Hash Table',
    points: 50,
    completed: false,
    description: 'Design and implement a Least Recently Used cache.',
  },
  {
    id: '4',
    title: 'Merge Two Sorted Arrays',
    difficulty: 'Easy',
    category: 'Arrays',
    points: 15,
    completed: false,
    description: 'Merge two sorted arrays into one sorted array.',
  },
  {
    id: '5',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    category: 'Trees',
    points: 30,
    completed: false,
    description: 'Return the level order traversal of a binary tree.',
  },
  {
    id: '6',
    title: 'Dijkstra Shortest Path',
    difficulty: 'Hard',
    category: 'Graph',
    points: 50,
    completed: false,
    description: 'Implement Dijkstra\'s shortest path algorithm.',
  },
];

const difficultyColors: Record<string, string> = {
  Easy: '#4CAF50',
  Medium: '#FF9800',
  Hard: '#F44336',
};

export default function Practice() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [userProgress, setUserProgress] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    challenges.forEach((c) => (init[c.id] = c.completed));
    return init;
  });

  const filteredChallenges =
    activeFilter === 'all'
      ? challenges
      : activeFilter === 'completed'
        ? challenges.filter((c) => userProgress[c.id])
        : challenges.filter((c) => !userProgress[c.id]);

  const totalPoints = challenges.reduce((sum, c) => sum + c.points, 0);
  const earnedPoints = challenges.reduce(
    (sum, c) => sum + (userProgress[c.id] ? c.points : 0),
    0
  );
  const streak = 5;

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <NavBar />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs font-medium tracking-widest text-[var(--color-brand-primary)] uppercase">
              Practice
            </span>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white mt-2 mb-3">
              Daily Challenges
            </h1>
            <p className="text-[var(--color-text-secondary)] max-w-lg">
              Sharpen your skills with curated algorithm challenges. Track your progress and earn
              points.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass-panel rounded-xl p-4 text-center">
              <Trophy className="w-6 h-6 text-[var(--color-brand-gold)] mx-auto mb-2" />
              <div className="font-display font-bold text-xl text-white">
                {earnedPoints}/{totalPoints}
              </div>
              <div className="text-xs text-[var(--color-text-muted)]">Points</div>
            </div>
            <div className="glass-panel rounded-xl p-4 text-center">
              <Flame className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <div className="font-display font-bold text-xl text-white">{streak}</div>
              <div className="text-xs text-[var(--color-text-muted)]">Day Streak</div>
            </div>
            <div className="glass-panel rounded-xl p-4 text-center">
              <Target className="w-6 h-6 text-[var(--color-brand-primary)] mx-auto mb-2" />
              <div className="font-display font-bold text-xl text-white">
                {Object.values(userProgress).filter(Boolean).length}
              </div>
              <div className="text-xs text-[var(--color-text-muted)]">Completed</div>
            </div>
            <div className="glass-panel rounded-xl p-4 text-center">
              <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="font-display font-bold text-xl text-white">
                {Math.round((earnedPoints / totalPoints) * 100)}%
              </div>
              <div className="text-xs text-[var(--color-text-muted)]">Progress</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6">
            {['all', 'completed', 'pending'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                  activeFilter === filter
                    ? 'bg-[var(--color-brand-primary)]/20 text-[var(--color-brand-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Challenges */}
          <div className="space-y-3">
            {filteredChallenges.map((challenge) => {
              const isCompleted = userProgress[challenge.id];
              return (
                <div
                  key={challenge.id}
                  className={`glass-panel rounded-xl p-5 flex items-start gap-4 transition-all ${
                    isCompleted ? 'border-green-500/20' : 'glass-panel-hover'
                  }`}
                >
                  {/* Status indicator */}
                  <div className="flex-shrink-0 mt-0.5">
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-[var(--color-border-subtle)]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className={`font-display font-semibold text-sm ${
                          isCompleted ? 'text-green-400 line-through opacity-60' : 'text-white'
                        }`}
                      >
                        {challenge.title}
                      </h3>
                      <span
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${difficultyColors[challenge.difficulty]}20`,
                          color: difficultyColors[challenge.difficulty],
                        }}
                      >
                        {challenge.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                      {challenge.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-[var(--color-text-muted)] bg-white/5 px-2 py-0.5 rounded">
                        {challenge.category}
                      </span>
                      <span className="text-[10px] text-[var(--color-brand-gold)] flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {challenge.points} pts
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  <button
                    onClick={() => {
                      setUserProgress((prev) => ({
                        ...prev,
                        [challenge.id]: !prev[challenge.id],
                      }));
                    }}
                    className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isCompleted
                        ? 'text-[var(--color-text-muted)] hover:text-red-400 hover:bg-red-400/10'
                        : 'text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)]/10'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        Undo
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5" />
                        Solve
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
