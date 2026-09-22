import { create } from 'zustand';

/**
 * Relógio único da página. Lenis escreve scroll/velocidade e cada seção escreve
 * o progresso do seu ScrollTrigger (para quem precisar ler o estado global sem re-renderizar).
 */
export type SectionId =
  | 'hero' | 'positioning' | 'formats' | 'ai' | 'builder' | 'quiz' | 'pages'
  | 'publish' | 'analytics' | 'compare' | 'integrations' | 'plans' | 'allinone' | 'cta';

export const progress = new Map<SectionId, number>();
export const sectionRects = new Map<SectionId, { top: number; height: number }>();

export const clock = {
  scroll: 0,
  velocity: 0,
  pointer: { x: 0, y: 0 }, // -1..1 normalizado
  pointerSmooth: { x: 0, y: 0 },
  time: 0,
  /** seção mais visível no momento */
  active: 'hero' as SectionId,
};

interface UIState {
  reducedMotion: boolean;
  isTouch: boolean;
  billing: 'monthly' | 'yearly';
  setBilling: (b: 'monthly' | 'yearly') => void;
  setEnv: (p: Partial<Pick<UIState, 'reducedMotion' | 'isTouch'>>) => void;
}

export const useUI = create<UIState>((set) => ({
  reducedMotion: false,
  isTouch: false,
  billing: 'monthly',
  setBilling: (billing) => set({ billing }),
  setEnv: (p) => set(p),
}));

export function getProgress(id: SectionId) {
  return progress.get(id) ?? 0;
}
