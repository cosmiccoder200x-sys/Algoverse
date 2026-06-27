import {
  Trophy,
  Flame,
  Target,
  BookOpen,
  TrendingUp,
  Award,
  Clock,
  Star,
  Bookmark,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router';
import NavBar from '@/components/NavBar';

export default function Dashboard() {
  const stats = {
    points: 340,
    streak: 5,
    completed: 12,
    totalTopics: 20,
  };

  const recentActivity = [
    { action: 'Completed', topic: 'Bubble Sort', type: 'algorithm', time: '2 hours ago' },
    { action: 'Visualized', topic: 'Binary Search Tree', type: 'data-structure', time: '5 hours ago' },
    { action: 'Completed', topic: 'Linked List Operations', type: 'challenge', time: '1 day ago' },
    { action: 'Learned', topic: 'Hash Tables', type: 'data-structure', time: '1 day ago' },
  ];

  const bookmarks = [
    { id: 'bst', name: 'Binary Search Tree', type: 'ds' },
    { id: 'merge-sort', name: 'Merge Sort', type: 'algo' },
    { id: 'graph', name: 'Graph', type: 'ds' },
    { id: 'dijkstra', name: "Dijkstra's Algorithm", type: 'algo' },
  ];

  const achievements = [
    { id: 'first-step', name: 'First Step', description: 'Complete your first visualization', earned: true },
    { id: 'streak-5', name: 'On Fire', description: '5-day learning streak', earned: true },
    { id: 'ds-master', name: 'DS Master', description: 'Learn all data structures', earned: false },
    { id: 'algo-expert', name: 'Algo Expert', description: 'Learn all algorithms', earned: false },
    { id: 'speed-demon', name: 'Speed Demon', description: 'Complete a challenge under 5 minutes', earned: false },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <NavBar />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display font-bold text-3xl text-white mb-2">Dashboard</h1>
            <p className="text-[var(--color-text-secondary)]">
              Track your progress and achievements
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass-panel rounded-xl p-5">
              <Trophy className="w-6 h-6 text-[var(--color-brand-gold)] mb-3" />
              <div className="font-display font-bold text-2xl text-white">{stats.points}</div>
              <div className="text-xs text-[var(--color-text-muted)]">Total Points</div>
            </div>
            <div className="glass-panel rounded-xl p-5">
              <Flame className="w-6 h-6 text-orange-400 mb-3" />
              <div className="font-display font-bold text-2xl text-white">{stats.streak}</div>
              <div className="text-xs text-[var(--color-text-muted)]">Day Streak</div>
            </div>
            <div className="glass-panel rounded-xl p-5">
              <Target className="w-6 h-6 text-[var(--color-brand-primary)] mb-3" />
              <div className="font-display font-bold text-2xl text-white">{stats.completed}</div>
              <div className="text-xs text-[var(--color-text-muted)]">Completed</div>
            </div>
            <div className="glass-panel rounded-xl p-5">
              <TrendingUp className="w-6 h-6 text-green-400 mb-3" />
              <div className="font-display font-bold text-2xl text-white">
                {Math.round((stats.completed / stats.totalTopics) * 100)}%
              </div>
              <div className="text-xs text-[var(--color-text-muted)]">Progress</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Column - Activity & Bookmarks */}
            <div className="md:col-span-2 space-y-6">
              {/* Recent Activity */}
              <div className="glass-panel rounded-xl p-5">
                <h2 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[var(--color-brand-primary)]" />
                  Recent Activity
                </h2>
                <div className="space-y-3">
                  {recentActivity.map((activity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03]"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          activity.type === 'algorithm'
                            ? 'bg-[var(--color-brand-secondary)]/20'
                            : activity.type === 'challenge'
                              ? 'bg-[var(--color-brand-gold)]/20'
                              : 'bg-[var(--color-brand-primary)]/20'
                        }`}
                      >
                        {activity.type === 'algorithm' ? (
                          <Zap className="w-4 h-4 text-[var(--color-brand-secondary)]" />
                        ) : activity.type === 'challenge' ? (
                          <Target className="w-4 h-4 text-[var(--color-brand-gold)]" />
                        ) : (
                          <BookOpen className="w-4 h-4 text-[var(--color-brand-primary)]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white">
                          {activity.action}{' '}
                          <span className="text-[var(--color-brand-primary)]">
                            {activity.topic}
                          </span>
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="glass-panel rounded-xl p-5">
                <h2 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[var(--color-brand-gold)]" />
                  Achievements
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-3 rounded-lg border transition-all ${
                        achievement.earned
                          ? 'bg-[var(--color-brand-gold)]/5 border-[var(--color-brand-gold)]/20'
                          : 'bg-white/[0.02] border-[var(--color-border-subtle)] opacity-50'
                      }`}
                    >
                      <Star
                        className={`w-5 h-5 mb-2 ${
                          achievement.earned
                            ? 'text-[var(--color-brand-gold)] fill-current'
                            : 'text-[var(--color-text-muted)]'
                        }`}
                      />
                      <h4 className="text-xs font-semibold text-white mb-0.5">
                        {achievement.name}
                      </h4>
                      <p className="text-[10px] text-[var(--color-text-muted)]">
                        {achievement.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Bookmarks & Quick Links */}
            <div className="space-y-6">
              {/* Bookmarks */}
              <div className="glass-panel rounded-xl p-5">
                <h2 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-[var(--color-brand-primary)]" />
                  Bookmarks
                </h2>
                <div className="space-y-2">
                  {bookmarks.map((bookmark) => (
                    <Link
                      key={bookmark.id}
                      to={`/visualize/${bookmark.type}/${bookmark.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all group"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          bookmark.type === 'ds'
                            ? 'bg-[var(--color-brand-primary)]/20'
                            : 'bg-[var(--color-brand-secondary)]/20'
                        }`}
                      >
                        {bookmark.type === 'ds' ? (
                          <BookOpen className="w-4 h-4 text-[var(--color-brand-primary)]" />
                        ) : (
                          <Zap className="w-4 h-4 text-[var(--color-brand-secondary)]" />
                        )}
                      </div>
                      <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-white transition-colors">
                        {bookmark.name}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[var(--color-text-muted)] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="glass-panel rounded-xl p-5">
                <h2 className="font-display font-semibold text-white mb-4">Quick Links</h2>
                <div className="space-y-2">
                  {[
                    { label: 'Data Structures', href: '/data-structures', icon: BookOpen },
                    { label: 'Algorithms', href: '/algorithms', icon: Zap },
                    { label: 'Practice', href: '/practice', icon: Target },
                    { label: 'Learn', href: '/learn', icon: TrendingUp },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all group"
                    >
                      <link.icon className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-primary)] transition-colors" />
                      <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-white transition-colors">
                        {link.label}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[var(--color-text-muted)] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
