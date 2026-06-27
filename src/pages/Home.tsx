import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import {
  Box,
  GitBranch,
  Layers,
  ArrowRightLeft,
  Network,
  Hash,
  Database,
  Cpu,
  Target,
  Zap,
  Star,
  ChevronRight,
  Sparkles,
  BarChart3,
  Globe,
  BookOpen,
  Code2,
  Users,
  Award,
  ArrowRight,
} from 'lucide-react';
import SceneContainer from '@/components/3d/SceneContainer';
import WireframeGrid from '@/components/3d/WireframeGrid';
import NavBar from '@/components/NavBar';

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="glass-panel rounded-2xl p-6 glass-panel-hover">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <h3 className="font-display font-semibold text-lg text-white mb-2">{title}</h3>
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{description}</p>
    </div>
  );
}

function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <div className="glass-panel rounded-2xl p-6 min-w-[300px] md:min-w-0">
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-[var(--color-brand-gold)] fill-current" />
        ))}
      </div>
      <p className="text-sm text-white italic mb-4 leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <div>
        <p className="text-sm font-semibold text-white">{name}</p>
        <p className="text-xs text-[var(--color-text-secondary)]">{role}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const dataStructures = [
    { icon: Box, name: 'Array', color: '#2fadaa' },
    { icon: GitBranch, name: 'Linked List', color: '#7B5EA7' },
    { icon: Layers, name: 'Stack', color: '#4CAF50' },
    { icon: ArrowRightLeft, name: 'Queue', color: '#FF9800' },
    { icon: Network, name: 'Graph', color: '#5C6BC0' },
    { icon: Hash, name: 'Hash Table', color: '#8e3a6e' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <NavBar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <WireframeGrid />
          <div className="absolute inset-0">
            <SceneContainer mode="hero" />
          </div>
          {/* Gradient overlays */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{
              background: 'linear-gradient(to top, rgb(5, 5, 10) 0%, rgba(5, 5, 10, 0) 100%)',
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-6">
            <Sparkles className="w-4 h-4 text-[var(--color-brand-primary)]" />
            <span className="text-xs text-[var(--color-text-secondary)]">
              The future of algorithm education
            </span>
          </div>

          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white text-shadow-glow mb-6">
            Master Algorithms
            <br />
            <span className="text-gradient">in 3D</span>
          </h1>

          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto mb-8 leading-relaxed">
            Visualize data structures and algorithms through immersive 3D interactions. Build
            intuition, ace interviews, and become a better engineer.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/data-structures"
              className="px-8 py-3.5 rounded-full bg-[var(--color-brand-primary)] text-[var(--color-bg-primary)] font-semibold text-sm hover:translate-y-[-2px] hover:shadow-[0_0_20px_rgba(47,173,170,0.3)] transition-all"
            >
              Start Learning
            </Link>
            <Link
              to="/algorithms"
              className="px-8 py-3.5 rounded-full border border-[var(--color-border-subtle)] text-white font-medium text-sm hover:bg-white/5 transition-all"
            >
              Explore Visualizations
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-16">
            {[
              { value: '20+', label: 'Data Structures' },
              { value: '15+', label: 'Algorithms' },
              { value: '50+', label: 'Visualizations' },
              { value: '4', label: 'Languages' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-2xl text-white">{stat.value}</div>
                <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <span className="text-xs font-medium tracking-widest text-[var(--color-brand-primary)] uppercase">
              Why AlgoVerse
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-3 mb-4">
              Learn by Seeing, Understand by Doing
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
              Interactive 3D visualizations that make complex algorithms intuitive
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Box}
              title="3D Visualizations"
              description="Every data structure comes alive in an interactive 3D space you can rotate, zoom, and explore."
              color="#2fadaa"
            />
            <FeatureCard
              icon={Zap}
              title="Step-by-Step Execution"
              description="Watch algorithms execute frame by frame. Control the pace, rewind, and understand every decision."
              color="#7B5EA7"
            />
            <FeatureCard
              icon={BarChart3}
              title="Complexity Analysis"
              description="Built-in Big-O notation, space-time tradeoffs, and performance comparisons for every algorithm."
              color="#8e3a6e"
            />
          </div>
        </div>
      </section>

      {/* Data Structures Section */}
      <section className="relative py-24 px-4 bg-[var(--color-bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <span className="text-xs font-medium tracking-widest text-[var(--color-brand-secondary)] uppercase">
              Data Structures
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-3 mb-4">
              See the Invisible
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
              From simple arrays to complex graphs, every structure rendered in beautiful 3D
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {dataStructures.map((ds) => (
              <Link
                key={ds.name}
                to="/data-structures"
                className="glass-panel rounded-xl p-6 text-center glass-panel-hover group"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${ds.color}20` }}
                >
                  <ds.icon className="w-7 h-7" style={{ color: ds.color }} />
                </div>
                <span className="text-sm font-medium text-white">{ds.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Algorithms Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <span className="text-xs font-medium tracking-widest text-[var(--color-brand-tertiary)] uppercase">
              Algorithms
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-3 mb-4">
              Watch Logic Unfold
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
              Sorting, searching, graph algorithms and dynamic programming visualized in real-time
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: BarChart3, name: 'Bubble Sort', category: 'Sorting', color: '#2fadaa' },
              { icon: GitBranch, name: 'Merge Sort', category: 'Sorting', color: '#7B5EA7' },
              { icon: Zap, name: 'Quick Sort', category: 'Sorting', color: '#FF9800' },
              { icon: Network, name: 'Dijkstra', category: 'Graph', color: '#4CAF50' },
              { icon: Globe, name: 'BFS', category: 'Graph', color: '#5C6BC0' },
              { icon: Target, name: 'Binary Search', category: 'Searching', color: '#8e3a6e' },
              { icon: BookOpen, name: 'Knapsack', category: 'Dynamic Programming', color: '#D4AF37' },
              { icon: Code2, name: 'Heap Sort', category: 'Sorting', color: '#FF5722' },
            ].map((algo) => (
              <Link
                key={algo.name}
                to="/algorithms"
                className="glass-panel rounded-xl p-5 flex items-center gap-4 glass-panel-hover group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${algo.color}20` }}
                >
                  <algo.icon className="w-5 h-5" style={{ color: algo.color }} />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{algo.name}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{algo.category}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--color-text-muted)] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 px-4 bg-[var(--color-bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <span className="text-xs font-medium tracking-widest text-[var(--color-brand-primary)] uppercase">
              Testimonials
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-3 mb-4">
              Loved by Engineers Worldwide
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              quote="AlgoVerse 3D transformed how I understand algorithms. The visualizations make abstract concepts concrete."
              name="Sarah Chen"
              role="Software Engineer at Google"
            />
            <TestimonialCard
              quote="I aced my FAANG interviews thanks to AlgoVerse. The step-by-step animations built my intuition better than any textbook."
              name="Marcus Johnson"
              role="Senior Engineer at Meta"
            />
            <TestimonialCard
              quote="As a CS professor, I recommend AlgoVerse to all my students. It bridges the gap between theory and practice."
              name="Dr. Emily Rodriguez"
              role="CS Professor at MIT"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            background: 'linear-gradient(135deg, #2fadaa 0%, #5d4d90 50%, #8e3a6e 100%)',
          }}
        />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Ready to Master Algorithms?
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-8">
            Join thousands of engineers who learn faster with AlgoVerse 3D
          </p>
          <Link
            to="/data-structures"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[var(--color-bg-primary)] font-semibold hover:scale-105 transition-transform"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border-subtle)] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-display font-bold text-sm tracking-widest-brand text-white">
                  ALGOVERSE
                </span>
                <span className="text-[10px] font-mono-code text-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/10 px-1.5 py-0.5 rounded">
                  3D
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)]">
                The future of algorithm education. Interactive 3D visualizations for data structures
                and algorithms.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
              <ul className="space-y-2">
                {['Data Structures', 'Algorithms', 'Practice Problems', 'Complexity Guide'].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        to="#"
                        className="text-xs text-[var(--color-text-secondary)] hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Resources</h4>
              <ul className="space-y-2">
                {['Documentation', 'API Reference', 'Tutorials', 'Blog'].map((item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="text-xs text-[var(--color-text-secondary)] hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
              <ul className="space-y-2">
                {['About', 'Careers', 'Contact', 'Privacy'].map((item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="text-xs text-[var(--color-text-secondary)] hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-[var(--color-border-subtle)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[var(--color-text-muted)]">
              2025 AlgoVerse 3D. All rights reserved.
            </p>
            <div className="flex gap-4">
              {['Terms', 'Privacy', 'Cookies'].map((item) => (
                <Link
                  key={item}
                  to="#"
                  className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
