import { useState } from 'react';
import {
  BookOpen,
  Code2,
  Lightbulb,
  HelpCircle,
  ChevronRight,
  CheckCircle,
  Clock,
  Target,
  Star,
} from 'lucide-react';
import { Link } from 'react-router';
import { dataStructures } from '@/data/dataStructures';
import { algorithms } from '@/data/algorithms';
import NavBar from '@/components/NavBar';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  topics: string[];
  estimatedTime: string;
  difficulty: string;
  color: string;
  completed: boolean;
}

const learningPaths: LearningPath[] = [
  {
    id: 'basics',
    title: 'Data Structures Fundamentals',
    description: 'Master the essential data structures every programmer should know.',
    topics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues'],
    estimatedTime: '4 hours',
    difficulty: 'Beginner',
    color: '#2fadaa',
    completed: true,
  },
  {
    id: 'trees',
    title: 'Tree Data Structures',
    description: 'Deep dive into hierarchical data structures and their applications.',
    topics: ['Binary Trees', 'BST', 'AVL Trees', 'Heaps'],
    estimatedTime: '6 hours',
    difficulty: 'Intermediate',
    color: '#7B5EA7',
    completed: false,
  },
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    description: 'Understand and compare different sorting strategies.',
    topics: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort'],
    estimatedTime: '5 hours',
    difficulty: 'Intermediate',
    color: '#FF9800',
    completed: false,
  },
  {
    id: 'graphs',
    title: 'Graph Algorithms',
    description: 'Explore graph traversal and shortest path algorithms.',
    topics: ['BFS', 'DFS', 'Dijkstra', 'Topological Sort'],
    estimatedTime: '8 hours',
    difficulty: 'Advanced',
    color: '#4CAF50',
    completed: false,
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    description: 'Master the art of solving complex problems through optimal substructure.',
    topics: ['Knapsack', 'LCS', 'LIS', 'Coin Change'],
    estimatedTime: '10 hours',
    difficulty: 'Advanced',
    color: '#8e3a6e',
    completed: false,
  },
];

const difficultyColors: Record<string, string> = {
  Beginner: '#4CAF50',
  Intermediate: '#FF9800',
  Advanced: '#F44336',
};

export default function Learn() {
  const [activePath, setActivePath] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const allItems = [...dataStructures, ...algorithms];
  const searchResults = searchQuery
    ? allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <NavBar />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs font-medium tracking-widest text-[var(--color-brand-primary)] uppercase">
              Learn
            </span>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white mt-2 mb-3">
              Learning Paths
            </h1>
            <p className="text-[var(--color-text-secondary)] max-w-lg">
              Structured learning paths to master data structures and algorithms at your own pace.
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search topics, algorithms, data structures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border-subtle)] text-white text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-brand-primary)]/50 transition-colors"
            />
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="mb-8 glass-panel rounded-xl p-4">
              <h3 className="text-sm font-semibold text-white mb-3">
                Search Results ({searchResults.length})
              </h3>
              {searchResults.length > 0 ? (
                <div className="space-y-2">
                  {searchResults.map((item) => (
                    <Link
                      key={item.id}
                      to={`/visualize/${'category' in item ? 'ds' : 'algo'}/${item.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: `${'category' in item ? '#2fadaa' : '#7B5EA7'}20`,
                        }}
                      >
                        {'category' in item ? (
                          <BookOpen className="w-4 h-4 text-[var(--color-brand-primary)]" />
                        ) : (
                          <Code2 className="w-4 h-4 text-[var(--color-brand-secondary)]" />
                        )}
                      </div>
                      <div>
                        <span className="text-sm text-white">{item.name}</span>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          {item.description.slice(0, 60)}...
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[var(--color-text-muted)] ml-auto" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[var(--color-text-secondary)]">
                  No results found for &ldquo;{searchQuery}&rdquo;
                </p>
              )}
            </div>
          )}

          {/* Learning Paths */}
          <div className="space-y-4">
            {learningPaths.map((path) => {
              const isActive = activePath === path.id;
              return (
                <div
                  key={path.id}
                  className={`glass-panel rounded-xl overflow-hidden transition-all ${
                    isActive ? 'border-[var(--color-brand-primary)]/30' : ''
                  }`}
                >
                  <button
                    onClick={() => setActivePath(isActive ? null : path.id)}
                    className="w-full p-5 flex items-center gap-4 text-left"
                  >
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${path.color}20` }}
                    >
                      {path.completed ? (
                        <CheckCircle className="w-6 h-6" style={{ color: path.color }} />
                      ) : (
                        <BookOpen className="w-6 h-6" style={{ color: path.color }} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className={`font-display font-semibold ${
                            path.completed ? 'text-green-400 line-through opacity-60' : 'text-white'
                          }`}
                        >
                          {path.title}
                        </h3>
                        {path.completed && (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                      <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                        {path.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <span
                          className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${difficultyColors[path.difficulty]}20`,
                            color: difficultyColors[path.difficulty],
                          }}
                        >
                          {path.difficulty}
                        </span>
                        <span className="text-[10px] text-[var(--color-text-muted)] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {path.estimatedTime}
                        </span>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-5 h-5 text-[var(--color-text-muted)] transition-transform ${
                        isActive ? 'rotate-90' : ''
                      }`}
                    />
                  </button>

                  {/* Expanded content */}
                  {isActive && (
                    <div className="px-5 pb-5 border-t border-[var(--color-border-subtle)]">
                      <div className="pt-4 space-y-2">
                        <h4 className="text-xs font-semibold text-white uppercase tracking-wide mb-2">
                          Topics Covered
                        </h4>
                        {path.topics.map((topic, i) => (
                          <div
                            key={topic}
                            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-all"
                          >
                            <span
                              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                              style={{
                                backgroundColor: `${path.color}20`,
                                color: path.color,
                              }}
                            >
                              {i + 1}
                            </span>
                            <span className="text-sm text-[var(--color-text-secondary)]">
                              {topic}
                            </span>
                            <Link
                              to={`/visualize/${dataStructures.find((d) => d.name === topic) ? 'ds' : 'algo'}/${
                                dataStructures.find((d) => d.name === topic)?.id ||
                                algorithms.find((a) => a.name === topic)?.id ||
                                ''
                              }`}
                              className="ml-auto text-xs text-[var(--color-brand-primary)] hover:text-white transition-colors"
                            >
                              Start
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Tips */}
          <div className="mt-12 glass-panel rounded-xl p-6">
            <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[var(--color-brand-gold)]" />
              Study Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  icon: Target,
                  title: 'Focus on One Topic',
                  description:
                    'Master one data structure or algorithm before moving to the next.',
                },
                {
                  icon: Code2,
                  title: 'Implement from Scratch',
                  description: 'Write code without looking at references to build muscle memory.',
                },
                {
                  icon: HelpCircle,
                  title: 'Practice with Problems',
                  description: 'Apply what you learn on LeetCode, HackerRank, or similar platforms.',
                },
                {
                  icon: Star,
                  title: 'Review Regularly',
                  description: 'Spaced repetition helps solidify understanding over time.',
                },
              ].map((tip) => (
                <div
                  key={tip.title}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03]"
                >
                  <tip.icon className="w-5 h-5 text-[var(--color-brand-primary)] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-white mb-0.5">{tip.title}</h4>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
