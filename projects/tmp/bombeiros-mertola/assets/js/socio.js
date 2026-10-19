(function () {
/**
 * socio.js — Adesão como sócio sem sair da página
 * Abre um <dialog> nativo (sem navegação) com o formulário de adesão,
 * valida os campos em JavaScript e prepara o pedido por email (mailto).
 */

const DESTINATARIO = CONTACTOS.emailCandidaturas;
const ASSUNTO = 'Pedido de Adesão como Sócio — Bombeiros Voluntários de Mértola';

let botaoQueAbriu = null;

function lerFormulario(form) {
  const dados = new FormData(form);
  return {
    nome: dados.get('nome') || '',
    email: dados.get('email') || '',
    telefone: dados.get('telefone') || '',
    nif: (dados.get('nif') || '').replace(/[\s.\-]/g, ''),
    morada: dados.get('morada') || '',
    mensagem: dados.get('mensagem') || '',
    consentimento: form.querySelector('#socio-consentimento').checked,
  };
}

const regras = [
  {
    campo: 'nome',
    valido: (v) => v.trim().length >= 3,
    mensagem: 'Indique o seu nome completo (pelo menos 3 caracteres).',
  },
  {
    campo: 'email',
    valido: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    mensagem: 'Indique um endereço de email válido.',
  },
  {
    campo: 'telefone',
    valido: (v) => /^(\+?351)?[923]\d{8}$/.test(v.replace(/[\s.-]/g, '')),
    mensagem: 'Indique um telefone português válido (ex.: 912 345 678 ou 286 610 010).',
  },
  {
    campo: 'nif',
    valido: (v) => v.trim() === '' || validarNIF(v).valido,
    mensagem: (v) => validarNIF(v).erro || 'NIF inválido.',
  },
  {
    campo: 'consentimento',
    valido: (v) => v === true,
    mensagem: 'É necessário autorizar o tratamento dos seus dados para avançar.',
  },
];

function mostrarErro(id, mensagem) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = mensagem;
  el.dataset.visible = 'true';
}

function limparErros(form) {
  form.querySelectorAll('[data-erro]').forEach((el) => {
    el.dataset.visible = 'false';
    el.textContent = '';
  });
  form.querySelectorAll('[data-invalid]').forEach((el) => el.removeAttribute('data-invalid'));
}

function validar(form) {
  const dados = lerFormulario(form);
  let valido = true;
  limparErros(form);

  regras.forEach((regra) => {
    const valor = dados[regra.campo];
    if (!regra.valido(valor)) {
      valido = false;
      const mensagem =
        typeof regra.mensagem === 'function' ? regra.mensagem(valor) : regra.mensagem;
      mostrarErro(`socio-erro-${regra.campo}`, mensagem);

      const campo =
        form.querySelector(`[name="${regra.campo}"]`) ||
        form.querySelector(`#socio-${regra.campo}`);
      if (campo) campo.setAttribute('data-invalid', 'true');
    }
  });

  return valido ? dados : null;
}

function textoAdesao(d) {
  return [
    `PEDIDO DE ADESÃO COMO SÓCIO — BOMBEIROS VOLUNTÁRIOS DE MÉRTOLA`,
    ``,
    `Nome: ${d.nome}`,
    `Email: ${d.email}`,
    `Telefone: ${d.telefone}`,
    `NIF: ${d.nif.trim() === '' ? 'não indicado' : d.nif}`,
    `Localidade: ${d.morada.trim() === '' ? 'não indicada' : d.morada}`,
    d.mensagem.trim() ? `\nMensagem:\n${d.mensagem.trim()}` : '',
    ``,
    `Autorização de tratamento de dados: concedida através do formulário em ${new Date().toLocaleDateString('pt-PT')}.`,
  ].join('\n');
}

function estado(tipo, texto) {
  const caixa = document.getElementById('socio-estado');
  if (!caixa) return;
  caixa.classList.remove('hidden');

  const estilos = {
    ok: 'border border-ember/40 bg-ember/5 px-4 py-3 font-body text-sm text-ink/80',
    erro: 'border border-ember bg-ember/10 px-4 py-3 font-body text-sm font-medium text-ember',
  };
  caixa.className = estilos[tipo] || estilos.ok;
  caixa.textContent = texto;
}

function initSocio() {
  const dialogo = document.getElementById('dialogo-socio');
  const form = document.getElementById('form-socio');
  if (!dialogo || !form) return;

  /* Abertura por qualquer botão de adesão */
  document.querySelectorAll('[data-abrir-socio]').forEach((botao) => {
    botao.addEventListener('click', () => {
      botaoQueAbriu = botao;
      document.body.style.overflow = 'hidden';
      dialogo.showModal();
    });
  });

  /* Fechamento: botão X, clique no fundo escuro e tecla Escape (nativo) */
  document.getElementById('fechar-socio')?.addEventListener('click', () => dialogo.close());

  dialogo.addEventListener('click', (e) => {
    if (e.target === dialogo) dialogo.close();
  });

  dialogo.addEventListener('close', () => {
    document.body.style.overflow = '';
    if (botaoQueAbriu) botaoQueAbriu.focus();
  });

  /* Validação do NIF em tempo real (ao sair do campo) */
  const campoNIF = form.querySelector('#socio-nif');
  campoNIF?.addEventListener('blur', () => {
    const valor = campoNIF.value;
    if (valor.trim() === '') {
      document.getElementById('socio-erro-nif')?.setAttribute('data-visible', 'false');
      campoNIF.removeAttribute('data-invalid');
      return;
    }
    const resultado = validarNIF(valor);
    if (resultado.valido) {
      document.getElementById('socio-erro-nif')?.setAttribute('data-visible', 'false');
      campoNIF.removeAttribute('data-invalid');
    } else {
      mostrarErro('socio-erro-nif', resultado.erro);
      campoNIF.setAttribute('data-invalid', 'true');
    }
  });

  /* Submissão */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dados = validar(form);

    if (!dados) {
      estado(
        'erro',
        'O pedido ainda não pode ser preparado: corrija os campos assinalados e tente de novo.'
      );
      const primeiroErro = form.querySelector('[data-erro][data-visible="true"]');
      if (primeiroErro) {
        const nomeCampo = primeiroErro.id.replace('socio-erro-', '');
        const campo = form.querySelector(`[name="${nomeCampo}"]`) ||
          form.querySelector(`#socio-${nomeCampo}`);
        (campo || primeiroErro).scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (campo) campo.focus({ preventScroll: true });
      }
      return;
    }

    const corpo = encodeURIComponent(textoAdesao(dados));
    const assunto = encodeURIComponent(`${ASSUNTO} — ${dados.nome}`);
    const mailto = `mailto:${DESTINATARIO}?subject=${assunto}&body=${corpo}`;
    form.dataset.mailto = mailto;

    estado(
      'ok',
      'Pedido de adesão preparado. A sua aplicação de email vai abrir com a mensagem pronta a enviar — confirme os dados e pressione «Enviar». A inscrição fica concluída após confirmação pela direção.'
    );

    window.location.href = mailto;
  });
}

window.initSocio = initSocio;
})();
