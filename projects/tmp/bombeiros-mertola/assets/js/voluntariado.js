(function () {
/**
 * voluntariado.js — Formulário de candidatura
 * Validação em JavaScript puro + preparação da candidatura por email (mailto)
 * para o endereço oficial da corporação. Sem backend: nenhum dado é guardado.
 */

const DESTINATARIO = CONTACTOS.emailCandidaturas;
const ASSUNTO = 'Candidatura a Voluntário — Bombeiros Voluntários de Mértola';

const regras = [
  {
    campo: 'nome',
    valido: (v) => v.trim().length >= 3,
    mensagem: 'Indique o seu nome completo (pelo menos 3 caracteres).',
  },
  {
    campo: 'telefone',
    valido: (v) => /^(\+?351)?[923]\d{8}$/.test(v.replace(/[\s.-]/g, '')),
    mensagem: 'Indique um telefone português válido (ex.: 912 345 678 ou 286 610 010).',
  },
  {
    campo: 'email',
    valido: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    mensagem: 'Indique um endereço de email válido.',
  },
  {
    campo: 'freguesia',
    valido: (v) => v.trim() !== '',
    mensagem: 'Escolha a freguesia de residência.',
  },
  {
    campo: 'nif',
    valido: (v) => v.trim() === '' || validarNIF(v).valido,
    mensagem: (v) => validarNIF(v).erro || 'NIF inválido.',
  },
  {
    campo: 'area',
    valido: (v) => v !== null,
    mensagem: 'Escolha a área de interesse.',
  },
  {
    campo: 'disponibilidade',
    valido: (v) => v.length > 0,
    mensagem: 'Selecione pelo menos um período de disponibilidade.',
  },
  {
    campo: 'consentimento',
    valido: (v) => v === true,
    mensagem: 'É necessário autorizar o tratamento dos seus dados para avançar.',
  },
];

function lerFormulario(form) {
  const dados = new FormData(form);
  const disponibilidade = [...form.querySelectorAll('input[name="disponibilidade"]:checked')].map(
    (el) => el.value
  );
  const area = form.querySelector('input[name="area"]:checked');
  const consentimento = form.querySelector('#campo-consentimento').checked;
  return {
    nome: dados.get('nome') || '',
    telefone: dados.get('telefone') || '',
    email: dados.get('email') || '',
    freguesia: dados.get('freguesia') || '',
    nif: (dados.get('nif') || '').replace(/[\s.\-]/g, ''),
    area: area ? area.value : null,
    disponibilidade,
    mensagem: dados.get('mensagem') || '',
    consentimento,
  };
}

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

function marcarCampoInvalido(form, campo) {
  const el =
    form.querySelector(`[name="${campo}"]`) ||
    form.querySelector(`input[name="area"]`)?.closest('fieldset')?.querySelector('[data-erro]') ||
    document.getElementById(`campo-${campo}`);
  if (el) {
    const alvo = el.closest('div, fieldset')?.querySelector('.field-input') || el;
    if (alvo.tagName === 'INPUT' || alvo.tagName === 'SELECT' || alvo.tagName === 'TEXTAREA') {
      alvo.setAttribute('data-invalid', 'true');
    }
  }
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
      mostrarErro(`erro-${regra.campo}`, mensagem);
      marcarCampoInvalido(form, regra.campo);
    }
  });

  return valido ? dados : null;
}

function textoCandidatura(d) {
  return [
    `CANDIDATURA A VOLUNTÁRIO — BOMBEIROS VOLUNTÁRIOS DE MÉRTOLA`,
    ``,
    `Nome: ${d.nome}`,
    `Telefone: ${d.telefone}`,
    `Email: ${d.email}`,
    `Freguesia de residência: ${d.freguesia}`,
    `NIF: ${d.nif.trim() === '' ? 'não indicado' : d.nif}`,
    `Área de interesse: ${d.area}`,
    `Disponibilidade: ${d.disponibilidade.join(', ')}`,
    d.mensagem.trim() ? `\nMensagem:\n${d.mensagem.trim()}` : '',
    ``,
    `Autorização de tratamento de dados: concedida através do formulário em ${new Date().toLocaleDateString('pt-PT')}.`,
  ].join('\n');
}

function estado(tipo, texto) {
  const caixa = document.getElementById('estado-formulario');
  if (!caixa) return;
  caixa.classList.remove('hidden');

  const estilos = {
    ok: 'border border-ember/40 bg-ember/5 px-4 py-3 font-body text-sm text-ink/80',
    erro: 'border border-ember bg-ember/10 px-4 py-3 font-body text-sm font-medium text-ember',
    copiado: 'border border-ink/20 bg-paper-2 px-4 py-3 font-body text-sm text-ink/80',
  };

  caixa.className = estilos[tipo] || estilos.ok;
  caixa.textContent = texto;
}

function initVoluntariado() {
  const form = document.getElementById('form-voluntariado');
  if (!form) return;

  /* Validação do NIF em tempo real (ao sair do campo) */
  const campoNIF = form.querySelector('#campo-nif');
  campoNIF?.addEventListener('blur', () => {
    const valor = campoNIF.value;
    if (valor.trim() === '') {
      document.getElementById('erro-nif')?.setAttribute('data-visible', 'false');
      campoNIF.removeAttribute('data-invalid');
      return;
    }
    const resultado = validarNIF(valor);
    if (resultado.valido) {
      document.getElementById('erro-nif')?.setAttribute('data-visible', 'false');
      campoNIF.removeAttribute('data-invalid');
    } else {
      mostrarErro('erro-nif', resultado.erro);
      campoNIF.setAttribute('data-invalid', 'true');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dados = validar(form);

    if (!dados) {
      estado(
        'erro',
        'A candidatura ainda não pode ser preparada: corrija os campos assinalados e tente de novo.'
      );
      const primeiroErro = form.querySelector('[data-erro][data-visible="true"]');
      if (primeiroErro) {
        const nomeCampo = primeiroErro.id.replace('erro-', '');
        const campo = form.querySelector(`[name="${nomeCampo}"]`);
        (campo || primeiroErro).scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (campo) campo.focus({ preventScroll: true });
      }
      return;
    }

    const corpo = encodeURIComponent(textoCandidatura(dados));
    const assunto = encodeURIComponent(ASSUNTO);
    const mailto = `mailto:${DESTINATARIO}?subject=${assunto}&body=${corpo}`;

    /* Disponibiliza o link gerado para inspeção/diagnóstico */
    form.dataset.mailto = mailto;

    estado(
      'ok',
      'Candidatura preparada. A sua aplicação de email vai abrir com a mensagem pronta para enviar — confirme os dados e pressione «Enviar». Se nada abrir, use o botão «Copiar dados» e envie para ' + DESTINATARIO + '.'
    );

    window.location.href = mailto;
  });

  const botaoCopiar = document.getElementById('botao-copiar');
  botaoCopiar?.addEventListener('click', async () => {
    const dados = validar(form);
    if (!dados) {
      estado('erro', 'Corrija os campos assinalados antes de copiar os dados da candidatura.');
      return;
    }
    const texto = textoCandidatura(dados);
    try {
      await navigator.clipboard.writeText(texto);
      estado('copiado', 'Dados da candidatura copiados para a área de transferência.');
    } catch {
      estado(
        'copiado',
        'Não foi possível copiar automaticamente. Selecione e copie o texto abaixo.'
      );
      const area = document.createElement('textarea');
      area.value = texto;
      area.className =
        'mt-3 w-full min-h-[140px] border border-ink/15 bg-white p-3 font-mono text-xs';
      const caixa = document.getElementById('estado-formulario');
      caixa.appendChild(area);
      area.select();
    }
  });
}

window.initVoluntariado = initVoluntariado;
})();
