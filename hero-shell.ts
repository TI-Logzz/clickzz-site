import type { Plugin } from 'vite';
import { hero, nav, APP_URL } from './src/content/copy.ts';

/**
 * Primeira dobra no HTML: menu + texto do hero vão dentro do #root já no index.html, com as
 * mesmas classes dos componentes React (Nav e Hero). O celular pinta o título, o texto e o CTA
 * assim que o CSS chega, sem esperar o JavaScript baixar e executar; quando o React monta,
 * ele substitui este bloco por um idêntico (no mobile o texto do hero não tem animação de
 * entrada, então a troca é invisível).
 *
 * No desktop o texto do hero tem entrada animada: ali o bloco fica invisível (só o menu aparece)
 * para a animação não "apagar" um texto que já estava na tela.
 */
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const CHECK = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>';
const MENU = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path></svg>';
// mesma gema de ui.tsx (StarGem), com ids próprios para não colidir com a do React durante a troca
const GEM = '<span class="star-gem" role="img" aria-label="✦" style="display:inline-block;width:0.72em;height:0.72em;vertical-align:-0.06em;margin-left:0.08em"><svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true"><defs><linearGradient id="shA" x1="20" y1="10" x2="80" y2="95" gradientUnits="userSpaceOnUse"><stop stop-color="#c9a4ff"/><stop offset="0.55" stop-color="#8b3fe0"/><stop offset="1" stop-color="#5b21b6"/></linearGradient><linearGradient id="shB" x1="50" y1="0" x2="50" y2="60" gradientUnits="userSpaceOnUse"><stop stop-color="#ffffff" stop-opacity="0.9"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs><path d="M50 2 C56 34 66 44 98 50 C66 56 56 66 50 98 C44 66 34 56 2 50 C34 44 44 34 50 2 Z" fill="url(#shA)"/><path d="M50 2 C56 34 66 44 98 50 L50 50 Z" fill="url(#shB)" opacity="0.8"/><path d="M50 2 C44 34 34 44 2 50 L50 50 Z" fill="#ffffff" opacity="0.28"/><path d="M50 98 C56 66 66 56 98 50 L50 50 Z" fill="#2e1065" opacity="0.28"/></svg></span>';

function shell() {
  const words = hero.title.split(' ');
  const title = words.map((w, i) => `<span class="word">${esc(w)}${i < words.length - 1 ? ' ' : ''}</span>`).join('') + `<span class="word">${GEM}</span>`;
  const links = nav.links.map((l) => `<a href="${l.href}">${esc(l.label)}</a>`).join('');
  return `<div class="page-root hero-shell" id="top">
<header class="nav"><div class="nav__bar"><a href="#" class="nav__brand" aria-label="Clickzz — início"><img alt="Clickzz" height="26" width="105" src="./brand/clickzz-logo-white@78.webp" style="height:26px;width:auto;display:block"></a><nav class="nav__links" aria-label="Seções da página">${links}</nav><div class="nav__actions"><a class="nav__login" href="${APP_URL}/login">Entrar</a><a class="btn btn--primary btn--sm" href="${APP_URL}"><span class="btn__sheen" aria-hidden="true"></span><span style="position:relative">${esc(nav.cta)}</span></a><button class="nav__burger" aria-label="Abrir menu">${MENU}</button></div></div></header>
<main><section class="hero" aria-labelledby="hero-title"><div class="hero__sticky" style="position:relative;top:0"><div class="container--wide hero__grid"><div class="hero__copy">
<div class="hero__eyebrow"><span class="eyebrow">${esc(hero.eyebrow)}</span></div>
<h1 id="hero-title" class="display h1 hero__title">${title}</h1>
<p class="lead hero__lead">${esc(hero.body)}</p>
<div class="hero__cta"><a class="btn btn--primary btn--lg" href="${APP_URL}"><span class="btn__sheen" aria-hidden="true"></span><span style="position:relative;display:inline-flex;align-items:center;gap:0.5rem">${esc(hero.cta)}</span></a></div>
<ul class="hero__checks">${hero.checks.map((c) => `<li><span class="mark" aria-hidden="true">${CHECK}</span>${esc(c)}</li>`).join('')}</ul>
</div><div class="hero__stage"></div></div></div></section></main>
</div>`;
}

export function heroShell(): Plugin {
  return {
    name: 'clickzz-hero-shell',
    transformIndexHtml(html) {
      return html.replace('<div id="root"></div>', `<div id="root">${shell()}</div>`);
    },
  };
}
