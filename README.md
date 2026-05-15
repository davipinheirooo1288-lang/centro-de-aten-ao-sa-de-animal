# CASA - Centro de Atenção à Saúde Animal

Site institucional premium para o Centro de Atenção à Saúde Animal - CASA.

## Estrutura

- `index.html`: estrutura da página.
- `styles.css`: identidade visual, responsividade e animações.
- `script.js`: serviços, carrossel de depoimentos, WhatsApp, formulário e popup.
- `server.cjs`: servidor local simples para pré-visualização.
- `casa 2.png`, `casa 3.png`, `casa logo.jpg`: imagens usadas no site.

## Rodar localmente

```bash
npm run dev
```

Depois abra:

```text
http://127.0.0.1:4173
```

## Validação rápida

```bash
npm run check
```

## Publicação

Projeto estático pronto para deploy na Vercel. O arquivo `vercel.json` define `index.html` como rota principal.
