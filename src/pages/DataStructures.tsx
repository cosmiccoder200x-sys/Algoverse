import { useState } from 'react';
import { Link } from 'react-router';
import {
  Box,
  GitBranch,
  Layers,
  ArrowRightLeft,
  Network,
  Hash,
  ArrowUpDown,
  TreePine,
  GitFork,
  Search,
  Bookmark,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { dataStructures } from '@/data/dataStructures';
import NavBar from '@/components/NavBar';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Blocks: Box,
  Link: GitBranch,
  Layers: Layers,
  ArrowRightLeft: ArrowRightLeft,
  GitFork: GitFork,
  ArrowUpDown: ArrowUpDown,
  Hash: Hash,
  Network: Network,
  GitBranch: GitBranch,
  TreePine: TreePine,
};

const categoryColors: Record<string, string> = {
  linear: '#2fadaa',
  tree: '#7B5EA7',
  graph: '#4CAF50',
  advanced: '#FF9800',
};

export default function DataStructures() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(new Set());

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'linear', label: 'Linear' },
    { id: 'tree', label: 'Tree' },
    { id: 'graph', label: 'Graph' },
    { id: 'advanced', label: 'Advanced' },
  ];

  const filteredDS = dataStructures.filter((ds) => {
    const matchesSearch =
      ds.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ds.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleBookmark = (id: string) => {
    setBookmarkedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <NavBar />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs font-medium tracking-widest text-[var(--color-brand-primary)] uppercase">
              Data Structures
            </span>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white mt-2 mb-3">
              Explore Data Structures
            </h1>
            <p className="text-[var(--color-text-secondary)] max-w-lg">
              Interactive 3D visualizations of fundamental and advanced data structures. Click on any
              structure to visualize and learn.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Search data structures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-[var(--color-border-subtle)] text-white text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-brand-primary)]/50 transition-colors"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[var(--color-text-muted)]" />
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[var(--color-brand-primary)]/20 text-[var(--color-brand-primary)]'
                      : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDS.map((ds) => {
              const Icon = iconMap[ds.icon] || Box;
              const color = categoryColors[ds.category] || '#7B5EA7';
              const isBookmarked = bookmarkedItems.has(ds.id);

              return (
                <div
                  key={ds.id}
                  className="glass-panel rounded-xl p-5 glass-panel-hover group relative"
                >
                  {/* Bookmark button */}
                  <button
                    onClick={() => toggleBookmark(ds.id)}
                    className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/5 transition-all"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        isBookmarked
                          ? 'text-[var(--color-brand-primary)] fill-current'
                          : 'text-[var(--color-text-muted)]'
                      }`}
                    />
                  </button>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-semibold text-white">{ds.name}</h3>
                        <span
                          className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${color}20`,
                            color,
                          }}
                        >
                          {ds.category}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 mb-3">
                        {ds.description}
                      </p>

                      {/* Complexity badges */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-mono-code text-[10px] text-[var(--color-text-muted)] bg-white/5 px-2 py-1 rounded">
                          T: {ds.complexities.time.average}
                        </span>
                        <span className="font-mono-code text-[10px] text-[var(--color-text-muted)] bg-white/5 px-2 py-1 rounded">
                          S: {ds.complexities.space}
                        </span>
                      </div>

                      <Link
                        to={`/visualize/ds/${ds.id}`}
                        className="inline-flex items-center gap-1 text-xs text-[var(--color-brand-primary)] hover:text-white transition-colors"
                      >
                        Visualize
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredDS.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-4" />
              <p className="text-[var(--color-text-secondary)]">
                No data structures found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
