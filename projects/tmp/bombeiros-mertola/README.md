# Site oficial — Bombeiros Voluntários de Mértola

Site institucional estático em HTML, Tailwind CSS e JavaScript para a Associação
Humanitária dos Bombeiros Voluntários de Mértola. Lema: **Vida por Vida**.

## Estrutura

```
├── index.html               Página única com âncoras (início, sócio, corporação, operacional, viaturas, voluntariado, contactos)
├── .nojekyll                Impede o processamento Jekyll no GitHub Pages
├── assets/
│   ├── css/
│   │   ├── input.css        CSS-fonte (diretivas Tailwind + componentes)
│   │   └── styles.css       CSS final compilado — é o que a página usa
│   ├── img/
│   │   └── emblema.svg      Emblema PROVISÓRIO — substituir pelo logótipo oficial
│   └── js/
│       ├── main.js          Arranque e navegação (menu móvel, cabeçalho)
│       ├── data.js          Dados editáveis: escala semanal e frota
│       ├── escala.js        Renderiza a tabela de serviço e a equipa de hoje
│       ├── galeria.js       Galeria de viaturas, filtros e janela modal
│       ├── nif.js           Validação do NIF português (algoritmo oficial)
│       ├── socio.js         Adesão a sócio: diálogo nativo <dialog> sem navegação
│       └── voluntariado.js  Validação e envio do formulário de candidatura
├── tailwind.config.js       Configuração do Tailwind (cores, tipos, tamanhos)
└── package.json             Dependências de desenvolvimento
```

## Emblema provisório

`assets/img/emblema.svg` é um emblema desenhado para efeitos de arranque.
Para usar o logótipo oficial da corporação, basta substituir o ficheiro
`assets/img/emblema.svg` pela imagem oficial (SVG recomendado; PNG funciona
com o mesmo nome) — é usado no cabeçalho, rodapé e favicon.

## Adesão a sócio sem sair da página

Os botões «Torne-se sócio» (barra utilitária, cabeçalho, hero, faixa vermelha
e menu móvel) abrem um diálogo nativo `<dialog>` com o formulário de adesão —
sem navegação, com foco contido, fecho por Escape/botão/clique no fundo, e
devolução do foco ao botão que abriu. A adesão é preparada num email
(`mailto:`) para o endereço oficial; a inscrição fica concluída após
confirmação pela direção. Não são apresentadas quotas, benefícios ou
requisitos documentais não confirmados.

## Atualizar a escala ou a frota

Tudo o que muda com frequência está em `assets/js/data.js`:

- `ESCALA` — equipas por dia da semana (turno diurno e noturno);
- `VEICULOS` — cartões da galeria de viaturas.

Não é preciso tocar no HTML nem recompilar o CSS para editar estes dados.

## Recompilar o CSS (só se mudar estilos)

O site usa o CSS já compilado (`assets/css/styles.css`), pelo que **a publicação
não exige instalação nem build**. Apenas se editar `assets/css/input.css` ou o
`tailwind.config.js`:

```bash
npm install
npm run build
```

## Publicar no GitHub Pages

1. Se partiu deste pacote ZIP, comece por criar o repositório Git no diretório:
   ```bash
   git init
   git branch -M main
   ```
2. Crie o repositório no GitHub (ex.: `bombeiros-mertola`) e faça push deste conteúdo:
   ```bash
   git add .
   git commit -m "Site dos Bombeiros Voluntários de Mértola"
   git remote add origin https://github.com/UTILIZADOR/bombeiros-mertola.git
   git push -u origin main
   ```
3. No GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root)**.
4. O site fica em `https://UTILIZADOR.github.io/bombeiros-mertola/`.

Os caminhos são todos relativos, pelo que o site funciona tanto na raiz de um
domínio como num subcaminho (`/repositorio/`).

## Formulários (sócio e voluntariado)

O GitHub Pages apenas serve ficheiros estáticos — não há servidor para receber
submissões. Ambos os formulários validam os campos em JavaScript — incluindo o
NIF, através do módulo `assets/js/nif.js`, que implementa o algoritmo do dígito
de controlo descrito no [Decreto-Lei n.º 14/2013](https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/legislacao/diplomas_legislativos/Documents/Decreto-Lei_14-2013.pdf)
(pesos 9–2, aritmética módulo 11) — e preparam a mensagem num email (`mailto:`)
para o endereço oficial da corporação.

Nota: a validação do NIF verifica a estrutura e o dígito de controlo, não a
existência ou titularidade do número. As gamas de primeiros dígitos atribuídas
estão descritas em [Wikipédia — NIF](https://pt.wikipedia.org/wiki/NIF) e no
[algoritmo do GeraNIF](https://geranif.pt/en/nif/algorithm/).

Para envio direto (sem abrir o email) será necessário acrescentar um serviço
externo (ex.: Formspree, Getform) e apontar o `fetch` para esse endpoint em
`assets/js/socio.js` e `assets/js/voluntariado.js`.

## Conteúdo demonstrativo

A escala de serviço e as especificações da frota são demonstrativas, com nomes
genéricos de equipas — devem ser substituídas pela informação oficial da direção
da corporação antes do lançamento público. As ilustrações das viaturas são
representativas das tipologias, não fotografias da frota real.

## Fontes dos dados públicos de contacto

- Contactos da corporação (endereço, telefones 286 610 010 / 286 610 014, fax e emails):
  https://bombeirospinhalnovo.com/contatos-outras-corporacoes-sul-tejo/
- Telefone e email alternativo: https://jf-espiritosanto.pt/contatos-uteis-2/
- Estatuto de utilidade pública e NIF 501057277: https://www.racius.com/associacao-humanitaria-dos-bombeiros-voluntarios-de-mertola/
- Dados recolhidos de diretórios públicos; convém confirmação junto da direção
  dos Bombeiros Voluntários de Mértola.
