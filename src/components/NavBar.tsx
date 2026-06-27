import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import {
  Menu,
  X,
  Database,
  Cpu,
  BookOpen,
  Target,
  LogIn,
  User,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user } = useStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Data Structures', href: '/data-structures', icon: Database },
    { label: 'Algorithms', href: '/algorithms', icon: Cpu },
    { label: 'Practice', href: '/practice', icon: Target },
    { label: 'Learn', href: '/learn', icon: BookOpen },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-panel border-b border-[var(--color-border-subtle)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Wordmark */}
            <Link to="/" className="flex items-center gap-2">
              <span className="font-display font-bold text-sm tracking-widest-brand text-white">
                ALGOVERSE
              </span>
              <span className="text-[10px] font-mono-code text-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/10 px-1.5 py-0.5 rounded">
                3D
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive(link.href)
                        ? 'text-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/10'
                        : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* CTA / Auth */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5 transition-all"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Dashboard
                  </Link>
                  <button className="p-2 rounded-lg hover:bg-white/5 transition-all text-[var(--color-text-secondary)] hover:text-white">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-[var(--color-bg-primary)] gradient-accent hover:opacity-90 transition-all"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Get Started
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-all text-[var(--color-text-secondary)]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 glass-panel border-l border-[var(--color-border-subtle)] p-4 pt-20">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive(link.href)
                        ? 'text-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/10'
                        : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 pt-6 border-t border-[var(--color-border-subtle)]">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-[var(--color-bg-primary)] gradient-accent"
              >
                <User className="w-4 h-4" />
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
