import { useState } from 'react';
import {
  X,
  BookOpen,
  Clock,
  MemoryStick,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Code2,
  HelpCircle,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { dataStructures } from '@/data/dataStructures';
import { algorithms } from '@/data/algorithms';

export default function LearningPanel() {
  const { learningPanelOpen, activeLearningTab, setLearningPanelOpen, setActiveLearningTab } =
    useStore();
  const selectedDS = useStore((s) => s.visualization.selectedDataStructure);
  const selectedAlgo = useStore((s) => s.visualization.selectedAlgorithm);

  const item =
    dataStructures.find((ds) => ds.id === selectedDS) ||
    algorithms.find((a) => a.id === selectedAlgo);

  if (!learningPanelOpen || !item) return null;

  const tabs = [
    { id: 'theory', label: 'Theory', icon: BookOpen },
    { id: 'complexity', label: 'Complexity', icon: Clock },
    { id: 'code', label: 'Code', icon: Code2 },
    { id: 'applications', label: 'Applications', icon: Lightbulb },
    { id: 'questions', label: 'Questions', icon: HelpCircle },
  ];

  return (
    <div className="fixed right-0 top-0 bottom-0 w-[480px] max-w-[90vw] z-40 glass-panel border-l border-[var(--color-border)] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 glass-panel border-b border-[var(--color-border-subtle)] px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-white">{item.name}</h2>
            <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
              {'category' in item ? item.category : ''}
            </p>
          </div>
          <button
            onClick={() => setLearningPanelOpen(false)}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5 text-[var(--color-text-secondary)]" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-4 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveLearningTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  activeLearningTab === tab.id
                    ? 'bg-[var(--color-brand-primary)]/20 text-[var(--color-brand-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {activeLearningTab === 'theory' && <TheoryTab item={item} />}
        {activeLearningTab === 'complexity' && <ComplexityTab item={item} />}
        {activeLearningTab === 'code' && <CodeTab item={item} />}
        {activeLearningTab === 'applications' && <ApplicationsTab item={item} />}
        {activeLearningTab === 'questions' && <QuestionsTab item={item} />}
      </div>
    </div>
  );
}

function TheoryTab({ item }: { item: any }) {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="font-display text-lg font-semibold text-white mb-3">Description</h3>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {item.description}
        </p>
      </section>

      <section>
        <h3 className="font-display text-lg font-semibold text-white mb-3">Theory</h3>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {item.theory}
        </p>
      </section>

      {'operations' in item && (
        <section>
          <h3 className="font-display text-lg font-semibold text-white mb-3">Operations</h3>
          <div className="space-y-2">
            {item.operations.map((op: any) => (
              <div
                key={op.name}
                className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-[var(--color-border-subtle)]"
              >
                <div>
                  <span className="text-sm font-medium text-white">{op.name}</span>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                    {op.description}
                  </p>
                </div>
                <span className="font-mono-code text-xs text-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/10 px-2 py-1 rounded">
                  {op.timeComplexity}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {'steps' in item && (
        <section>
          <h3 className="font-display text-lg font-semibold text-white mb-3">Algorithm Steps</h3>
          <div className="space-y-2">
            {item.steps.map((step: string, i: number) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-[var(--color-border-subtle)]"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-brand-primary)]/20 text-[var(--color-brand-primary)] text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm text-[var(--color-text-secondary)]">{step}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h3 className="font-display text-lg font-semibold text-white mb-3">Pseudocode</h3>
        <pre className="code-block p-4 rounded-lg bg-[#0d1117] border border-[var(--color-border-subtle)] overflow-x-auto text-[#c9d1d9]">
          {item.pseudocode}
        </pre>
      </section>
    </div>
  );
}

function ComplexityTab({ item }: { item: any }) {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="font-display text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Clock className="w-5 h-5 text-[var(--color-brand-primary)]" />
          Time Complexity
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Best Case', value: item.complexities.time.best, color: 'text-green-400' },
            {
              label: 'Average Case',
              value: item.complexities.time.average,
              color: 'text-yellow-400',
            },
            { label: 'Worst Case', value: item.complexities.time.worst, color: 'text-red-400' },
          ].map((c) => (
            <div
              key={c.label}
              className="p-4 rounded-lg bg-white/[0.03] border border-[var(--color-border-subtle)] text-center"
            >
              <div className={`font-mono-code text-xl font-bold ${c.color}`}>{c.value}</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1">{c.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-display text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <MemoryStick className="w-5 h-5 text-[var(--color-brand-secondary)]" />
          Space Complexity
        </h3>
        <div className="p-4 rounded-lg bg-white/[0.03] border border-[var(--color-border-subtle)] text-center">
          <div className="font-mono-code text-2xl font-bold text-[var(--color-brand-secondary)]">
            {item.complexities.space}
          </div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">Auxiliary Space</div>
        </div>
      </section>

      {'advantages' in item && (
        <section>
          <h3 className="font-display text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Advantages
          </h3>
          <ul className="space-y-2">
            {item.advantages.map((adv: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                <span className="text-green-400 mt-1">+</span>
                {adv}
              </li>
            ))}
          </ul>
        </section>
      )}

      {'disadvantages' in item && (
        <section>
          <h3 className="font-display text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Disadvantages
          </h3>
          <ul className="space-y-2">
            {item.disadvantages.map((dis: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                <span className="text-yellow-400 mt-1">!</span>
                {dis}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function CodeTab({ item }: { item: any }) {
  const [language, setLanguage] = useState<'python' | 'cpp' | 'java' | 'javascript'>('python');

  const languages = [
    { id: 'python', label: 'Python' },
    { id: 'cpp', label: 'C++' },
    { id: 'java', label: 'Java' },
    { id: 'javascript', label: 'JavaScript' },
  ] as const;

  const code = item.codeExamples[language];

  const highlightSyntax = (code: string, lang: string) => {
    // Simple syntax highlighting
    return code
      .replace(/\b(def|class|return|if|else|for|while|import|from|try|except|raise|void|int|float|bool|string|public|private|static|new|this|const|let|var|function)\b/g, '<span class="syntax-keyword">$1</span>')
      .replace(/(".*?")/g, '<span class="syntax-string">$1</span>')
      .replace(/('.*?')/g, '<span class="syntax-string">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="syntax-number">$1</span>')
      .replace(/(\/\/.*$|#.*$)/gm, '<span class="syntax-comment">$1</span>')
      .replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g, '<span class="syntax-type">$1</span>');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-1">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setLanguage(lang.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              language === lang.id
                ? 'bg-[var(--color-brand-primary)]/20 text-[var(--color-brand-primary)]'
                : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      <div className="rounded-lg bg-[#0d1117] border border-[var(--color-border-subtle)] overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-xs text-[var(--color-text-muted)] ml-2">
            {item.name.toLowerCase().replace(/\s+/g, '_')}.{language === 'python' ? 'py' : language === 'cpp' ? 'cpp' : language === 'java' ? 'java' : 'js'}
          </span>
        </div>
        <pre
          className="code-block p-4 overflow-x-auto text-[#c9d1d9] text-xs leading-6"
          dangerouslySetInnerHTML={{ __html: highlightSyntax(code, language) }}
        />
      </div>
    </div>
  );
}

function ApplicationsTab({ item }: { item: any }) {
  return (
    <div className="space-y-6">
      {'applications' in item && (
        <section>
          <h3 className="font-display text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[var(--color-brand-gold)]" />
            Real-World Applications
          </h3>
          <div className="grid gap-3">
            {item.applications.map((app: string, i: number) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-[var(--color-border-subtle)]"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-brand-gold)]/20 text-[var(--color-brand-gold)] text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm text-[var(--color-text-secondary)]">{app}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {'commonMistakes' in item && (
        <section>
          <h3 className="font-display text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Common Mistakes
          </h3>
          <div className="grid gap-2">
            {item.commonMistakes.map((mistake: string, i: number) => (
              <div
                key={i}
                className="flex items-start gap-2 p-3 rounded-lg bg-yellow-400/5 border border-yellow-400/10"
              >
                <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[var(--color-text-secondary)]">{mistake}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function QuestionsTab({ item }: { item: any }) {
  return (
    <div className="space-y-4">
      {'interviewQuestions' in item && (
        <section>
          <h3 className="font-display text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[var(--color-brand-primary)]" />
            Common Interview Questions
          </h3>
          <div className="space-y-3">
            {item.interviewQuestions.map((q: string, i: number) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-white/[0.03] border border-[var(--color-border-subtle)] hover:border-[var(--color-border)] transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[var(--color-brand-primary)]/20 text-[var(--color-brand-primary)] text-xs font-bold flex items-center justify-center">
                    Q{i + 1}
                  </span>
                  <p className="text-sm text-[var(--color-text-secondary)]">{q}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
