import { create } from 'zustand';

/**
 * Relógio único da página. Lenis escreve scroll/velocidade, cada seção escreve
 * o progresso do seu ScrollTrigger, e o canvas 3D lê tudo daqui no useFrame.
 * Progressos ficam em um Map mutável (não em estado React) para não re-renderizar a 60 fps.
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
  webgl: boolean;
  isTouch: boolean;
  billing: 'monthly' | 'yearly';
  setBilling: (b: 'monthly' | 'yearly') => void;
  setEnv: (p: Partial<Pick<UIState, 'reducedMotion' | 'webgl' | 'isTouch'>>) => void;
}

export const useUI = create<UIState>((set) => ({
  reducedMotion: false,
  webgl: true,
  isTouch: false,
  billing: 'monthly',
  setBilling: (billing) => set({ billing }),
  setEnv: (p) => set(p),
}));

export function getProgress(id: SectionId) {
  return progress.get(id) ?? 0;
}

export function detectWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}
