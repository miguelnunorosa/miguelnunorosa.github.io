(function () {
/**
 * galeria.js — Galeria de viaturas
 * Renderiza os cartões, aplica filtros e abre a janela modal com detalhes.
 * As ilustrações são SVG gerados por código, partilhando a mesma linguagem visual.
 */

/* ---------- Ilustrações SVG (vista lateral) ---------- */

const V = {
  red: '#b32226',
  redDark: '#8c171b',
  cream: '#f6f1e4',
  ink: '#26231c',
  glass: '#d8e2e6',
  glass2: '#b7c6cc',
  grey: '#3a362e',
};

const wheels = (front, rear) => `
  <circle cx="${front}" cy="132" r="18" fill="${V.ink}"/>
  <circle cx="${front}" cy="132" r="8" fill="${V.cream}"/>
  <circle cx="${rear}" cy="132" r="18" fill="${V.ink}"/>
  <circle cx="${rear}" cy="132" r="8" fill="${V.cream}"/>
  <rect x="30" y="149" width="300" height="4" rx="2" fill="#26231c" opacity="0.18"/>
`;

const base = (inner) => `
<svg viewBox="0 0 360 170" role="img" aria-hidden="true" focusable="false" style="width:100%;height:auto">${inner}</svg>
`;

/* Carroça de combate a incêndios (urbano com escada, florestal com tanque) */
function artVCI(tipo) {
  const cab = `
    <path d="M46 114 V66 q0-8 8-8 h44 l20 20 v36 z" fill="${V.red}"/>
    <path d="M54 62 h40 l16 16 h-56 z" fill="${V.glass}"/>
    <rect x="46" y="94" width="64" height="8" fill="${V.redDark}" opacity="0.35"/>
    <rect x="42" y="108" width="10" height="8" rx="2" fill="${V.cream}"/>
  `;
  const caixa = `
    <rect x="118" y="38" width="204" height="76" rx="6" fill="${V.red}"/>
    <rect x="118" y="96" width="204" height="10" fill="${V.cream}"/>
    <rect x="130" y="50" width="34" height="34" rx="3" fill="${V.cream}" opacity="0.9"/>
    <polygon points="147,53 155,66 147,70 139,66" fill="${V.red}"/>
    <rect x="176" y="52" width="2.5" height="46" fill="${V.redDark}" opacity="0.3"/>
    <rect x="216" y="52" width="2.5" height="46" fill="${V.redDark}" opacity="0.3"/>
    <rect x="256" y="52" width="2.5" height="46" fill="${V.redDark}" opacity="0.3"/>
    <rect x="292" y="52" width="16" height="10" rx="2" fill="${V.glass2}"/>
  `;
  let topo = '';
  if (tipo === 'urbano') {
    topo = `
      <rect x="126" y="14" width="186" height="12" rx="3" fill="${V.grey}"/>
      <rect x="140" y="10" width="4" height="30" fill="${V.grey}"/>
      <rect x="288" y="10" width="4" height="30" fill="${V.grey}"/>
      <path d="M150 24 h60 l6 6 h-72 z" fill="${V.redDark}"/>
    `;
  } else {
    topo = `
      <rect x="126" y="16" width="180" height="22" rx="8" fill="${V.grey}"/>
      <rect x="132" y="21" width="168" height="3" rx="1.5" fill="${V.red}"/>
      <circle cx="316" cy="30" r="13" fill="${V.grey}"/>
      <circle cx="316" cy="30" r="5" fill="${V.red}"/>
    `;
  }
  return base(`
    <rect x="40" y="112" width="276" height="8" fill="${V.grey}"/>
    ${topo}${caixa}${cab}
    ${wheels(84, 268)}
  `);
}

/* Ambulância (socorro ou UIN) */
function artAmbulancia(uin) {
  const corFaixa = uin ? V.red : '#c99a2e';
  const caixa = `
    <rect x="112" y="34" width="196" height="82" rx="6" fill="#ffffff" stroke="#26231c" stroke-opacity="0.12"/>
    <rect x="112" y="88" width="196" height="8" fill="${V.red}"/>
    <rect x="124" y="46" width="52" height="30" rx="4" fill="${V.glass}" opacity="0.75"/>
    <rect x="188" y="46" width="52" height="30" rx="4" fill="${V.glass}" opacity="0.75"/>
    <rect x="252" y="46" width="44" height="30" rx="4" fill="${V.glass}" opacity="0.75"/>
    <rect x="188" y="82" width="108" height="2" fill="#26231c" opacity="0.08"/>
  `;
  const cab = `
    <path d="M50 116 V70 q0-10 10-10 h50 v56 z" fill="#ffffff" stroke="#26231c" stroke-opacity="0.12"/>
    <path d="M58 60 h48 v14 h-56 z" fill="${V.glass}"/>
    <rect x="46" y="110" width="9" height="7" rx="2" fill="${V.cream}"/>
  `;
  const emblema = `
    <rect x="292" y="52" width="10" height="10" rx="2" fill="${V.red}"/>
  `;
  return base(`
    <rect x="44" y="112" width="272" height="8" fill="${V.grey}"/>
    ${caixa}${cab}${emblema}
    <rect x="112" y="34" width="196" height="6" rx="3" fill="${corFaixa}"/>
    ${wheels(82, 262)}
  `);
}

/* Viatura de comando (todo-o-terreno) */
function artComando() {
  return base(`
    <rect x="44" y="112" width="268" height="8" fill="${V.grey}"/>
    <path d="M54 112 V72 q0-12 12-12 h72 q8 0 10 8 l8 22 v22 z" fill="${V.grey}"/>
    <path d="M62 60 h64 q6 0 8 6 l4 12 h-84 z" fill="${V.glass}"/>
    <rect x="54" y="96" width="96" height="6" fill="${V.red}"/>
    <rect x="158" y="64" width="148" height="48" rx="4" fill="${V.grey}"/>
    <rect x="158" y="64" width="148" height="6" fill="${V.red}"/>
    <rect x="170" y="78" width="36" height="26" rx="2" fill="${V.cream}" opacity="0.16"/>
    <rect x="216" y="78" width="36" height="26" rx="2" fill="${V.cream}" opacity="0.16"/>
    <rect x="262" y="78" width="36" height="26" rx="2" fill="${V.cream}" opacity="0.16"/>
    <line x1="292" y1="64" x2="292" y2="26" stroke="${V.grey}" stroke-width="3"/>
    <circle cx="292" cy="24" r="4" fill="${V.red}"/>
    <rect x="46" y="104" width="9" height="7" rx="2" fill="${V.cream}"/>
    ${wheels(92, 250)}
  `);
}

const ARTES = {
  'vci-florestal': () => artVCI('florestal'),
  'vci-urbano': () => artVCI('urbano'),
  vot: () => artVCI('urbano'),
  'ambulancia-socorro': () => artAmbulancia(false),
  'ambulancia-uin': () => artAmbulancia(true),
  'viatura-comando': () => artComando(),
};

const artPara = (id) => (ARTES[id] ? ARTES[id]() : artVCI('urbano'));

/* ---------- Renderização dos cartões ---------- */

const ROTULOS = { incendio: 'Incêndio', socorro: 'Socorro', comando: 'Comando' };

function cartao(v) {
  const li = document.createElement('li');
  li.className = 'group cursor-pointer border border-cream/10 bg-charcoal-2 p-5 transition-colors hover:border-ember/60 focus-within:border-ember/60';
  li.dataset.categoria = v.categoria;
  li.innerHTML = `
    <div class="px-4 py-3">
      ${artPara(v.id)}
    </div>
    <div class="mt-3 flex items-center justify-between gap-3">
      <h3 class="text-lg font-display font-semibold text-cream">${v.nome}</h3>
      <span class="shrink-0 border border-ember/50 px-2.5 py-0.5 font-body text-[0.7rem] font-bold uppercase tracking-[0.12em] text-ember-bright">${ROTULOS[v.categoria] || v.categoria}</span>
    </div>
    <p class="mt-1 font-body text-xs font-bold uppercase tracking-[0.1em] text-cream/60">${v.classe}</p>
    <button class="mt-4 inline-flex items-center gap-2 font-body text-sm font-bold text-ember-bright transition-colors hover:text-cream" aria-haspopup="dialog">
      Ver detalhes
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    </button>
  `;
  li.addEventListener('click', () => abrirModal(v));
  li.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      abrirModal(v);
    }
  });
  li.setAttribute('tabindex', '0');
  li.setAttribute('role', 'button');
  li.setAttribute('aria-label', `Ver detalhes de ${v.nome}`);
  return li;
}

function initGaleria() {
  const grelha = document.getElementById('galeria-viaturas');
  if (!grelha) return;

  VEICULOS.forEach((v) => grelha.appendChild(cartao(v)));

  const filtros = document.getElementById('filtros-viaturas');
  if (!filtros) return;

  filtros.addEventListener('click', (e) => {
    const botao = e.target.closest('[data-filtro]');
    if (!botao) return;

    filtros.querySelectorAll('[data-filtro]').forEach((b) => {
      const ativo = b === botao;
      b.setAttribute('aria-pressed', String(ativo));
      b.classList.toggle('bg-ember', ativo);
      b.classList.toggle('text-cream', ativo);
      b.classList.toggle('text-cream/70', !ativo);
    });

    const filtro = botao.dataset.filtro;
    grelha.querySelectorAll('li').forEach((li) => {
      const visivel = filtro === 'todas' || li.dataset.categoria === filtro;
      li.style.display = visivel ? '' : 'none';
    });
  });
}

/* ---------- Modal ---------- */

let ultimoFoco = null;

function abrirModal(v) {
  const modal = document.getElementById('modal-viatura');
  const conteudo = document.getElementById('modal-viatura-conteudo');
  if (!modal || !conteudo) return;

  document.getElementById('modal-viatura-titulo').textContent = v.nome;
  conteudo.innerHTML = `
    <p class="font-body text-xs text-ink/60">Exemplo representativo da tipologia — não descreve a viatura ao serviço da corporação.</p>
    <div class="bg-paper-2 px-6 py-5">
      ${artPara(v.id)}
    </div>
    <p class="mt-4 font-body text-base text-ink/75">${v.descricao}</p>
    <p class="mt-4 section-eyebrow text-ember">Especificações principais</p>
    <ul class="mt-2 space-y-2" role="list">
      ${v.especificacoes.map((e) => `
        <li class="flex gap-2.5 font-body text-sm text-ink/70">
          <svg class="mt-1 shrink-0 text-ember" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
          <span>${e.replace(/^\s*/, '')}</span>
        </li>
      `).join('')}
    </ul>
  `;

  ultimoFoco = document.activeElement;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
  document.getElementById('fechar-modal').focus();

  /* Isolamento do foco: Tab nunca sai da janela modal */
  modal._libertarFoco = (e) => {
    if (e.key !== 'Tab') return;
    const focussiveis = modal.querySelectorAll(
      'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focussiveis.length === 0) return;
    const primeiro = focussiveis[0];
    const ultimo = focussiveis[focussiveis.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault();
      primeiro.focus();
    }
  };
  modal.addEventListener('keydown', modal._libertarFoco);
}

function fecharModal() {
  const modal = document.getElementById('modal-viatura');
  if (!modal || modal.classList.contains('hidden')) return;
  if (modal._libertarFoco) {
    modal.removeEventListener('keydown', modal._libertarFoco);
    modal._libertarFoco = null;
  }
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
  if (ultimoFoco) ultimoFoco.focus();
}

function initModalViaturas() {
  const modal = document.getElementById('modal-viatura');
  if (!modal) return;

  document.getElementById('fechar-modal')?.addEventListener('click', fecharModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModal();
  });
}

window.initGaleria = initGaleria;
window.initModalViaturas = initModalViaturas;
})();
