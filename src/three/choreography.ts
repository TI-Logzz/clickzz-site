import type { SectionId } from '../lib/store';

/**
 * Coreografia do canvas persistente: para cada seção, onde ficam o cristal,
 * o cluster de blocos e quão visíveis estão fios e partículas.
 * Unidades em espaço de mundo (câmera em z=10, fov 32 → ~5.7 de altura e ~9.2 de largura visíveis em 16:10).
 * Regra: objetos 3D nunca atrás de texto; ficam nas bordas ou atrás/ao redor dos dispositivos.
 */
export interface SceneKey {
  crystal: { pos: [number, number, number]; scale: number; spin: number; visible: number; /** posição alternativa em viewport retrato (x em unidades já estreitas) */ posNarrow?: [number, number, number] };
  blocks: { center: [number, number, number]; spread: number; layout: 'orbit' | 'grid' | 'stack' | 'column' | 'ring' | 'hidden'; scale: number };
  wires: number; // 0..1
  particles: number; // 0..1
  wash: number; // intensidade do fundo shader 0..1
}

export const keys: Record<SectionId, SceneKey> = {
  hero: {
    crystal: { pos: [3.95, 1.95, -0.5], scale: 0.48, spin: 0.35, visible: 1, posNarrow: [0.98, -1.75, -0.3] },
    blocks: { center: [2.6, -0.6, -3.5], spread: 2.4, layout: 'orbit', scale: 0.7 },
    wires: 0.3, particles: 0.5, wash: 0.6,
  },
  positioning: {
    crystal: { pos: [-4.7, 2.6, -3], scale: 0.5, spin: 0.2, visible: 0.6 },
    blocks: { center: [2.8, -0.2, -2], spread: 2.6, layout: 'grid', scale: 0.9 },
    wires: 0.1, particles: 0.15, wash: 0.25,
  },
  formats: {
    crystal: { pos: [4.6, 3.0, -4], scale: 0.5, spin: 0.2, visible: 0.5 },
    blocks: { center: [0, -3.8, -5], spread: 4.8, layout: 'ring', scale: 0.5 },
    wires: 0.4, particles: 0.1, wash: 0.2,
  },
  ai: {
    crystal: { pos: [3.55, 1.7, 0], scale: 0.85, spin: 0.6, visible: 1 },
    blocks: { center: [1.5, -0.8, -6], spread: 4.6, layout: 'ring', scale: 0.55 },
    wires: 0.6, particles: 1, wash: 0.8,
  },
  builder: {
    crystal: { pos: [-4.2, 2.35, -2], scale: 0.45, spin: 0.2, visible: 0.6 },
    blocks: { center: [-3.4, -3.3, -3], spread: 1.4, layout: 'orbit', scale: 0.45 },
    wires: 0.2, particles: 0.15, wash: 0.3,
  },
  quiz: {
    crystal: { pos: [4.5, 2.7, -3], scale: 0.5, spin: 0.25, visible: 0.5 },
    blocks: { center: [0, 0, -7], spread: 5.5, layout: 'ring', scale: 0.5 },
    wires: 1, particles: 0.4, wash: 0.45,
  },
  pages: {
    crystal: { pos: [-4.7, 2.5, -3], scale: 0.5, spin: 0.2, visible: 0.5 },
    blocks: { center: [-3.6, -3.0, -3], spread: 1.4, layout: 'stack', scale: 0.7 },
    wires: 0.15, particles: 0.1, wash: 0.3,
  },
  publish: {
    crystal: { pos: [4.4, -2.6, -3], scale: 0.5, spin: 0.2, visible: 0.5 },
    blocks: { center: [0, -4.2, -6], spread: 5, layout: 'ring', scale: 0.5 },
    wires: 0.3, particles: 0.5, wash: 0.35,
  },
  analytics: {
    crystal: { pos: [-4.6, 2.2, -3], scale: 0.45, spin: 0.2, visible: 0.4 },
    blocks: { center: [0, 0, -8], spread: 6, layout: 'ring', scale: 0.4 },
    wires: 0.3, particles: 0.2, wash: 0.25,
  },
  compare: {
    crystal: { pos: [4.4, 3.2, -2], scale: 0.55, spin: 0.3, visible: 0.8 },
    blocks: { center: [0, 0, -9], spread: 1, layout: 'hidden', scale: 0.5 },
    wires: 0.1, particles: 0.2, wash: 0.3,
  },
  integrations: {
    crystal: { pos: [-4.4, 2.8, -2], scale: 0.6, spin: 0.5, visible: 0.9 },
    blocks: { center: [0, 0.2, -7], spread: 5.5, layout: 'ring', scale: 0.5 },
    wires: 0.45, particles: 0.6, wash: 0.5,
  },
  plans: {
    crystal: { pos: [-4.8, 2.8, -3], scale: 0.45, spin: 0.2, visible: 0.4 },
    blocks: { center: [0, 0, -9], spread: 1, layout: 'hidden', scale: 0.5 },
    wires: 0, particles: 0.1, wash: 0.2,
  },
  allinone: {
    crystal: { pos: [-4.3, 3.0, -2], scale: 0.7, spin: 0.4, visible: 1 },
    blocks: { center: [0, 0, -9], spread: 1, layout: 'hidden', scale: 0.5 },
    wires: 0.3, particles: 0.5, wash: 0.5,
  },
  cta: {
    crystal: { pos: [4.1, 2.2, -1], scale: 0.9, spin: 0.6, visible: 1 },
    blocks: { center: [0, -3.5, -7], spread: 6, layout: 'ring', scale: 0.45 },
    wires: 0.5, particles: 1, wash: 0.9,
  },
};

export const order: SectionId[] = [
  'hero', 'positioning', 'formats', 'ai', 'builder', 'quiz', 'pages', 'publish', 'analytics', 'compare', 'integrations', 'plans', 'allinone', 'cta',
];
