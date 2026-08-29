# Portfólio — Miguel (Meln)

Site pessoal e página de serviços: desenvolvimento web, aplicativos, jogos e Linux
(Arch Linux / CachyOS).

HTML, CSS e JavaScript puros. **Sem build, sem backend, sem base de dados** — basta
colocar os ficheiros num repositório e ativar o GitHub Pages.

---

## Estrutura

```
portfolio/
├── index.html              # página completa (todas as secções)
├── css/
│   └── styles.css          # estilos, design tokens e responsividade
├── js/
│   └── main.js             # menu, animações, terminal e copiar contactos
├── assets/
│   ├── favicon.svg         # ícone do separador
│   ├── apple-touch-icon.png# ícone para iOS (180×180)
│   └── og-image.png        # imagem de partilha (1200×630)
├── .nojekyll               # impede o GitHub de processar o site com Jekyll
└── README.md
```

Todos os caminhos são **relativos** (`css/styles.css`, `assets/...`), por isso o site
funciona tanto em `utilizador.github.io` como em `utilizador.github.io/repositorio/`.

---

## Publicar no GitHub Pages

Os ficheiros já estão neste repositório (<https://github.com/mello13256/VOU>), no ramo
`claude/vou-site-publication-014fi2`. Os endereços de SEO no `index.html` apontam para
<https://mello13256.github.io/VOU/>. Falta apenas ligar o GitHub Pages — dois cliques,
uma única vez:

1. **Settings → Pages** (no repositório).
2. *Source*: **Deploy from a branch**.
3. *Branch*: `claude/vou-site-publication-014fi2` (ou `main`, se já tiver juntado o
   trabalho a esse ramo) + `/ (root)` → **Save**.
4. Espere 1 a 2 minutos e abra <https://mello13256.github.io/VOU/>.

O ficheiro `.nojekyll` já está incluído, por isso o GitHub publica os ficheiros tal como
estão, sem passar pelo Jekyll.

### Atualizações futuras

```bash
git add .
git commit -m "o que mudou"
git push
```

O site atualiza sozinho 1 a 2 minutos depois de cada push para o ramo publicado.

---

## Onde mexer no conteúdo

| O que quer mudar | Onde |
|---|---|
| Frase principal | `index.html` → `<h1 class="hero__title">` |
| Texto do "Sobre mim" | `index.html` → secção `id="sobre"` |
| Serviços | `index.html` → secção `id="servicos"`, blocos `<article class="card card--service">` |
| Nome e cargo no topo | `index.html` → `<div class="hero__identity">` (`hero__name` e `hero__role`) |
| Passos do "Como trabalho" | `index.html` → secção `id="processo"`, blocos `<li class="step">` |
| Descrição dos projetos | `index.html` → secção `id="projetos"`, `<p class="project__text">` |
| Adicionar um projeto | copiar um bloco `<article class="project">` inteiro e trocar textos, link e etiquetas |
| Conhecimentos | `index.html` → secção `id="stack"` |
| Contactos | `index.html` → secção `id="contato"` **e** o rodapé |
| Cores | `css/styles.css` → bloco `:root` (`--arch`, `--mint`, `--abyss`…) |
| Linhas do terminal | `js/main.js` → variável `session` |
| Luz que segue o rato | `css/styles.css` → `.cursor-glow` (cor e tamanho) e `js/main.js` → secção 8 |

O número de WhatsApp aparece em dois formatos: `+351 910 052 169` (o que se lê) e
`351910052169` (dentro do link `wa.me` e do botão de copiar). Se mudar o número,
mude nos dois sítios.

---

## Ver o site no computador antes de publicar

Basta abrir o `index.html` no navegador. Para ficar igual ao ambiente real:

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

---

## Notas técnicas

- **Sem dependências.** Nenhuma biblioteca, nenhum framework, nenhum passo de build.
- **Tipografia** via Google Fonts (Sora, Inter, JetBrains Mono). Se ficar sem internet,
  o site cai para as fontes do sistema e continua legível.
- **Acessibilidade:** HTML semântico, link para saltar o menu, foco visível pelo teclado,
  menu que fecha com `Esc`, `prefers-reduced-motion` respeitado.
- **Responsivo** de 320 px a monitores grandes. Pontos de quebra: 380, 720, 900, 960 e 1400 px.
- **Luz do cursor:** um halo azul de 240 px acompanha o rato, numa camada com
  `z-index: -1` — atrás de todo o conteúdo, a iluminar o fundo. Só aparece em ecrãs
  com rato (nada em toque); com `prefers-reduced-motion` a luz mantém-se, mas
  cola-se ao cursor em vez de o perseguir.
- **Sem `localStorage`, sem cookies, sem rastreio.**
