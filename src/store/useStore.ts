import { create } from 'zustand';

export interface AnimationState {
  isPlaying: boolean;
  speed: number;
  currentStep: number;
  totalSteps: number;
  operation: string | null;
}

export interface VisualizationState {
  selectedDataStructure: string | null;
  selectedAlgorithm: string | null;
  data: any[];
  originalData: any[];
  animation: AnimationState;
  cameraMode: 'orbit' | 'auto' | 'focus';
  highlightIndices: number[];
  comparingIndices: number[];
  swappingIndices: number[];
}

export interface UserState {
  bookmarks: string[];
  progress: Record<string, number>;
  notes: Record<string, string>;
  achievements: string[];
  dailyChallengeCompleted: boolean;
}

export interface AppState {
  // Navigation
  currentPage: string;
  sidebarOpen: boolean;
  setCurrentPage: (page: string) => void;
  setSidebarOpen: (open: boolean) => void;

  // Visualization
  visualization: VisualizationState;
  setSelectedDataStructure: (id: string | null) => void;
  setSelectedAlgorithm: (id: string | null) => void;
  setData: (data: any[]) => void;
  setOriginalData: (data: any[]) => void;
  setAnimationPlaying: (playing: boolean) => void;
  setAnimationSpeed: (speed: number) => void;
  setAnimationStep: (step: number) => void;
  setTotalSteps: (steps: number) => void;
  setOperation: (op: string | null) => void;
  setCameraMode: (mode: 'orbit' | 'auto' | 'focus') => void;
  setHighlightIndices: (indices: number[]) => void;
  setComparingIndices: (indices: number[]) => void;
  setSwappingIndices: (indices: number[]) => void;
  resetVisualization: () => void;

  // User
  user: UserState;
  toggleBookmark: (id: string) => void;
  setProgress: (id: string, value: number) => void;
  setNote: (id: string, note: string) => void;
  addAchievement: (id: string) => void;
  setDailyChallenge: (completed: boolean) => void;

  // Learning Panel
  learningPanelOpen: boolean;
  activeLearningTab: string;
  setLearningPanelOpen: (open: boolean) => void;
  setActiveLearningTab: (tab: string) => void;
}

const initialVisualizationState: VisualizationState = {
  selectedDataStructure: null,
  selectedAlgorithm: null,
  data: [],
  originalData: [],
  animation: {
    isPlaying: false,
    speed: 1,
    currentStep: 0,
    totalSteps: 0,
    operation: null,
  },
  cameraMode: 'orbit',
  highlightIndices: [],
  comparingIndices: [],
  swappingIndices: [],
};

const initialUserState: UserState = {
  bookmarks: [],
  progress: {},
  notes: {},
  achievements: [],
  dailyChallengeCompleted: false,
};

export const useStore = create<AppState>((set) => ({
  // Navigation
  currentPage: 'home',
  sidebarOpen: false,
  setCurrentPage: (page) => set({ currentPage: page }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  // Visualization
  visualization: initialVisualizationState,
  setSelectedDataStructure: (id) =>
    set((state) => ({
      visualization: { ...state.visualization, selectedDataStructure: id },
    })),
  setSelectedAlgorithm: (id) =>
    set((state) => ({
      visualization: { ...state.visualization, selectedAlgorithm: id },
    })),
  setData: (data) =>
    set((state) => ({
      visualization: { ...state.visualization, data },
    })),
  setOriginalData: (data) =>
    set((state) => ({
      visualization: { ...state.visualization, originalData: data },
    })),
  setAnimationPlaying: (playing) =>
    set((state) => ({
      visualization: {
        ...state.visualization,
        animation: { ...state.visualization.animation, isPlaying: playing },
      },
    })),
  setAnimationSpeed: (speed) =>
    set((state) => ({
      visualization: {
        ...state.visualization,
        animation: { ...state.visualization.animation, speed },
      },
    })),
  setAnimationStep: (step) =>
    set((state) => ({
      visualization: {
        ...state.visualization,
        animation: { ...state.visualization.animation, currentStep: step },
      },
    })),
  setTotalSteps: (steps) =>
    set((state) => ({
      visualization: {
        ...state.visualization,
        animation: { ...state.visualization.animation, totalSteps: steps },
      },
    })),
  setOperation: (op) =>
    set((state) => ({
      visualization: {
        ...state.visualization,
        animation: { ...state.visualization.animation, operation: op },
      },
    })),
  setCameraMode: (mode) =>
    set((state) => ({
      visualization: { ...state.visualization, cameraMode: mode },
    })),
  setHighlightIndices: (indices) =>
    set((state) => ({
      visualization: { ...state.visualization, highlightIndices: indices },
    })),
  setComparingIndices: (indices) =>
    set((state) => ({
      visualization: { ...state.visualization, comparingIndices: indices },
    })),
  setSwappingIndices: (indices) =>
    set((state) => ({
      visualization: { ...state.visualization, swappingIndices: indices },
    })),
  resetVisualization: () =>
    set((state) => ({
      visualization: {
        ...initialVisualizationState,
        selectedDataStructure: state.visualization.selectedDataStructure,
        selectedAlgorithm: state.visualization.selectedAlgorithm,
      },
    })),

  // User
  user: initialUserState,
  toggleBookmark: (id) =>
    set((state) => ({
      user: {
        ...state.user,
        bookmarks: state.user.bookmarks.includes(id)
          ? state.user.bookmarks.filter((b) => b !== id)
          : [...state.user.bookmarks, id],
      },
    })),
  setProgress: (id, value) =>
    set((state) => ({
      user: {
        ...state.user,
        progress: { ...state.user.progress, [id]: value },
      },
    })),
  setNote: (id, note) =>
    set((state) => ({
      user: { ...state.user, notes: { ...state.user.notes, [id]: note } },
    })),
  addAchievement: (id) =>
    set((state) => ({
      user: {
        ...state.user,
        achievements: state.user.achievements.includes(id)
          ? state.user.achievements
          : [...state.user.achievements, id],
      },
    })),
  setDailyChallenge: (completed) =>
    set((state) => ({
      user: { ...state.user, dailyChallengeCompleted: completed },
    })),

  // Learning Panel
  learningPanelOpen: false,
  activeLearningTab: 'theory',
  setLearningPanelOpen: (open) => set({ learningPanelOpen: open }),
  setActiveLearningTab: (tab) => set({ activeLearningTab: tab }),
}));
