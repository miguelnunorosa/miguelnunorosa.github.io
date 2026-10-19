/**
 * main.js — Arranque do site
 * Bombeiros Voluntários de Mértola
 *
 * Script clássico (sem módulos ES) para garantir o funcionamento
 * em qualquer contexto: servidor, GitHub Pages ou abertura direta
 * do ficheiro index.html no computador (file://).
 */

/* Ano atual no rodapé */
document.getElementById('ano-atual')?.replaceChildren(
  document.createTextNode(String(new Date().getFullYear()))
);

/* Menu em ecrãs pequenos */
function initMenuMovel() {
  const botao = document.getElementById('botao-menu');
  const menu = document.getElementById('menu-movel');
  if (!botao || !menu) return;

  const ICONE_ABRIR =
    '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
  const ICONE_FECHAR =
    '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';

  const alternar = (aberto) => {
    menu.classList.toggle('hidden', !aberto);
    botao.setAttribute('aria-expanded', String(aberto));
    botao.setAttribute(
      'aria-label',
      aberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
    );
    botao.innerHTML = aberto ? ICONE_FECHAR : ICONE_ABRIR;
  };

  botao.addEventListener('click', () => {
    alternar(menu.classList.contains('hidden'));
  });

  menu.querySelectorAll('a').forEach((ligacao) => {
    ligacao.addEventListener('click', () => alternar(false));
  });
}

/* Sombra no cabeçalho após pequena rolagem */
function initSombraCabecalho() {
  const cabecalho = document.getElementById('cabecalho');
  if (!cabecalho) return;
  const atualizar = () => {
    cabecalho.classList.toggle('shadow-pop', window.scrollY > 8);
  };
  window.addEventListener('scroll', atualizar, { passive: true });
  atualizar();
}

/* Inicialização (os scripts são carregados por ordem com defer) */
document.addEventListener('DOMContentLoaded', () => {
  initMenuMovel();
  initSombraCabecalho();
  if (typeof window.initEscala === 'function') window.initEscala();
  if (typeof window.initGaleria === 'function') window.initGaleria();
  if (typeof window.initModalViaturas === 'function') window.initModalViaturas();
  if (typeof window.initVoluntariado === 'function') window.initVoluntariado();
  if (typeof window.initSocio === 'function') window.initSocio();
});
