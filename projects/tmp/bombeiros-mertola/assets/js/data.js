/**
 * dados.js — Fontes de dados do site
 * Bombeiros Voluntários de Mértola
 *
 * Os blocos abaixo são editáveis pela corporação sem mexer no resto do código:
 * - ESCALA: equipas de socorristas por dia e turno da semana corrente
 * - VEICULOS: entradas da galeria de viaturas
 */

const ESCALA = [
  { dia: 'Segunda-feira',  equipaDia: 'Equipa Alfa',   equipaNoite: 'Equipa Bravo' },
  { dia: 'Terça-feira',    equipaDia: 'Equipa Bravo',  equipaNoite: 'Equipa Charlie' },
  { dia: 'Quarta-feira',   equipaDia: 'Equipa Charlie', equipaNoite: 'Equipa Alfa' },
  { dia: 'Quinta-feira',   equipaDia: 'Equipa Alfa',   equipaNoite: 'Equipa Bravo' },
  { dia: 'Sexta-feira',    equipaDia: 'Equipa Bravo',  equipaNoite: 'Equipa Charlie' },
  { dia: 'Sábado',         equipaDia: 'Equipa Charlie', equipaNoite: 'Equipa Alfa' },
  { dia: 'Domingo',        equipaDia: 'Equipa Alfa',   equipaNoite: 'Equipa Bravo' },
];

const VEICULOS = [
  {
    id: 'vci-florestal',
    nome: 'VCI 4x4 Florestal',
    classe: 'Veículo de Combate a Incêndios',
    categoria: 'incendio',
    descricao:
      'Carro-tanque todo-o-terreno para primeira intervenção em incêndio rural e florestal, com autonomia de água reforçada para os acessos difíceis do território de Mértola.',
    especificacoes: [
      ' Tanque de água e de espuma',
      ' Bomba de caudal elevado',
      ' Mangueiras de primeira resposta',
      ' Tração todo-o-terreno',
    ],
  },
  {
    id: 'vci-urbano',
    nome: 'VCI Urbano',
    classe: 'Veículo de Combate a Incêndios',
    categoria: 'incendio',
    descricao:
      'Viatura pesada de combate a incêndio urbano, equipada com escada automática e autoclismo para resposta a fogos em edifícios, arruamentos e comércio local.',
    especificacoes: [
      ' Tanque de água de grande capacidade',
      ' Escada automática com cesto de salvamento',
      ' Autoclismo de proteção de viatura e efetivos',
      ' Iluminação de cena',
    ],
  },
  {
    id: 'vot',
    nome: 'VOT',
    classe: 'Veículo de Operações Táticas',
    categoria: 'incendio',
    descricao:
      'Viatura de operações táticas para emprego em incêndios florestais: reconhecimento, remoção de perigos, pequenos fogos e apoios logísticos em dispositivo de campo.',
    especificacoes: [
      ' Tripulação reforçada',
      ' Equipamento de desmatação e abertura de aceiros',
      ' Tanque tático com bomba',
      ' Suporte a operações prolongadas em dispositivo de campo',
    ],
  },
  {
    id: 'ambulancia-socorro',
    nome: 'Ambulância de Socorro',
    classe: 'Veículo de Socorro e Assistência',
    categoria: 'socorro',
    descricao:
      'Ambulância destinada ao transporte de doentes não urgentes e a situações de socorro, dotada de maca, cadeira de rodas e equipamento de imobilização.',
    especificacoes: [
      ' Transporte de doente sentado e deitado',
      ' Cadeira de rodas e maca de transferência',
      ' Equipamento de imobilização e suporte básico de vida',
    ],
  },
  {
    id: 'ambulancia-uin',
    nome: 'Ambulância UIN',
    classe: 'Veículo de Socorro e Assistência',
    categoria: 'socorro',
    descricao:
      'Unidade Intermédia de suporte à vida para doentes instáveis, com monitorização e ventilação de transporte, em articulação com o INEM.',
    especificacoes: [
      ' Monitorização de sinais vitais e desfibrilhação',
      ' Ventilação de transporte',
      ' Suporte de soros e bombas de infusão',
    ],
  },
  {
    id: 'viatura-comando',
    nome: 'Viatura de Comando',
    classe: 'Comando e Direção de Operações',
    categoria: 'comando',
    descricao:
      'Viatura de comando e comunicações para direção de operações de proteção e socorro, ligação ao SIOE e articulação com o posto de comando operacional.',
    especificacoes: [
      ' Rádio-telefonia em rede nacional de proteção civil',
      ' Cartografia operacional de bordo',
      ' Transporte do comandante das operações de socorro',
    ],
  },
];

const CONTACTOS = {
  telefoneSecretaria: '286 610 010',
  telefoneCentral: '286 610 014',
  emailCandidaturas: 'bvmertola@sapo.pt',
  emergencia: '112',
};
