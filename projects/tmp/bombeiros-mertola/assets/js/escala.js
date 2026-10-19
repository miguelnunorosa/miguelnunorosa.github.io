(function () {
/**
 * escala.js — Área operacional
 * Desenha a tabela semanal de equipas de socorristas e indica as equipas
 * de serviço no dia de hoje (turno diurno e noturno).
 */

const DIAS_SEMANA = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

function initEscala() {
  const corpo = document.querySelector('#tabela-escala tbody');
  const hoje = document.getElementById('servico-hoje-valor');
  if (!corpo) return;

  const hojeJS = new Date();
  const diaSemana = DIAS_SEMANA[hojeJS.getDay()];

  corpo.innerHTML = '';

  ESCALA.forEach((linha) => {
    const eHoje = linha.dia === diaSemana;
    const tr = document.createElement('tr');
    if (eHoje) {
      tr.className = 'bg-ember/5';
    } else {
      tr.className = 'border-t border-ink/10';
    }

    const celDia = document.createElement('th');
    celDia.scope = 'row';
    celDia.className =
      'px-5 py-4 font-display text-base font-semibold ' +
      (eHoje ? 'text-ember' : 'text-ink');
    celDia.innerHTML = `${linha.dia}${eHoje ? ' <span class="badge ml-2 align-middle bg-ember text-cream">Hoje</span>' : ''}`;

    const celDiaTurno = document.createElement('td');
    celDiaTurno.className =
      'px-5 py-4 font-body text-base ' + (eHoje ? 'font-bold text-ink' : 'text-ink/70');
    celDiaTurno.textContent = linha.equipaDia;

    const celNoiteTurno = document.createElement('td');
    celNoiteTurno.className =
      'px-5 py-4 font-body text-base ' + (eHoje ? 'font-bold text-ink' : 'text-ink/70');
    celNoiteTurno.textContent = linha.equipaNoite;

    tr.append(celDia, celDiaTurno, celNoiteTurno);
    corpo.appendChild(tr);
  });

  if (hoje) {
    const escalaHoje = ESCALA.find((l) => l.dia === diaSemana);
    hoje.textContent = escalaHoje
      ? `${escalaHoje.equipaDia} (08h–20h) · ${escalaHoje.equipaNoite} (20h–08h)`
      : 'Consulte a escala afixada no quartel';
  }
}



window.initEscala = initEscala;
})();
