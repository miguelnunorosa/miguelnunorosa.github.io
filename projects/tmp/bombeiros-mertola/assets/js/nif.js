/**
 * nif.js — Validação do Número de Identificação Fiscal (NIF) português
 *
 * Algoritmo do dígito de controlo (Decreto-Lei n.º 14/2013, art. 4.º/5.º;
 * ver também https://geranif.pt/en/nif/algorithm/):
 *   1. O NIF tem 9 dígitos; os 8 primeiros são sequenciais e o último é o
 *      dígito de controlo.
 *   2. Soma de controlo: os primeiros 8 dígitos são multiplicados pelos
 *      pesos 9, 8, 7, 6, 5, 4, 3, 2 e somados.
 *      Se o resto da divisão por 11 for 0 ou 1, o dígito de controlo é 0;
 *      caso contrário, é 11 menos o resto.
 *      O último dígito tem de ser igual ao dígito de controlo.
 *   3. Gamas atribuídas (primeiros dígitos):
 *      1, 2, 3 — pessoa singular (a gama 3 começou a ser atribuída em 2019);
 *      1 a 4 — pessoa singular nos termos do art. 4.º/2 do DL 14/2013;
 *      45 — cidadão não residente com retenção na fonte definitiva;
 *      5 — pessoa coletiva; 6 — administração pública; 8 — empresário em
 *      nome individual (regime extinto); 7x — heranças indivisas, fundos e
 *      entidades não residentes; 9x — pessoa coletiva irregular,
 *      condomínios e casos especiais.
 *      Como todas as gamas atribuídas cobrem os dígitos iniciais 1-9, este
 *      módulo apenas rejeita números a começar por 0 (nunca atribuídos) e
 *      delega no dígito de controlo a deteção de erros de digitação.
 *
 * Nota: esta validação verifica APENAS a estrutura e o dígito de controlo.
 * Não confirma a existência, atribuição ou titularidade do NIF — para isso
 * seria necessária uma consulta ao serviço da Autoridade Tributária.
 *
 * Uso:
 *   import { validarNIF } from './nif.js';
 *   const r = validarNIF('123456789'); // { valido: true }
 *   const r = validarNIF('123456788'); // { valido: false, erro: '…' }
 */

/** Pesos oficiais aplicados aos primeiros 8 dígitos */
const PESOS = [9, 8, 7, 6, 5, 4, 3, 2];

/**
 * As gamas atribuídas cobrem os dígitos iniciais 1-9 (pessoas singulares
 * 1-4, coletivas 5/6/8/9, heranças e fundos 7x, não residentes 45).
 * NIFs nunca começam por 0 — é a única rejeição de prefixo aplicada.
 */
const PRIMEIRO_DIGITO_INVALIDO = '0';

/**
 * Remove espaços, pontos e hífenes de um valor introduzido.
 * @param {string} valor
 * @returns {string} apenas dígitos
 */
function limparNIF(valor) {
  return String(valor == null ? '' : valor).replace(/[\s.\-]/g, '');
}

/**
 * Calcula o dígito de controlo a partir dos primeiros 8 dígitos.
 * @param {string} oitoDigitos
 * @returns {number|null} dígito de controlo (0-9) ou null se entrada inválida
 */
function digitoControloNIF(oitoDigitos) {
  if (!/^\d{8}$/.test(oitoDigitos)) return null;

  const soma = oitoDigitos
    .split('')
    .slice(0, 8)
    .reduce((total, digito, i) => total + Number(digito) * PESOS[i], 0);

  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

/**
 * Valida um NIF português.
 * @param {string} valor NIF, com ou sem espaços/pontos/hífenes
 * @returns {{ valido: boolean, erro?: string, nif?: string }}
 */
function validarNIF(valor) {
  const nif = limparNIF(valor);

  if (nif === '') {
    return { valido: false, erro: 'Indique o NIF (9 dígitos).' };
  }

  if (!/^\d{9}$/.test(nif)) {
    return { valido: false, erro: 'O NIF tem de ter exatamente 9 dígitos.', nif };
  }

  const comecaPorZero = nif[0] === PRIMEIRO_DIGITO_INVALIDO;
  if (comecaPorZero) {
    return {
      valido: false,
      erro: 'O NIF não pode começar por 0.',
      nif,
    };
  }

  const controlo = digitoControloNIF(nif.slice(0, 8));
  if (controlo === null || Number(nif[8]) !== controlo) {
    return {
      valido: false,
      erro: 'O NIF não é válido (dígito de controlo incorreto).',
      nif,
    };
  }

  return { valido: true, nif };
}
