# Instruções do projeto — Portfólio

Site de portfólio em React. Leia o `README.md` para entender o que o projeto
faz; este arquivo diz **como escrever código aqui**.

## Idioma

- Respostas, explicações e comentários de código em **português (pt-BR)**
- Nomes de variáveis e funções em **português** (`buscarRepositorios`, `carregando`)
- Nomes de arquivo, componentes e props em **inglês** (`ProjectCard.jsx`, `onChange`)

Essa mistura é proposital: o vocabulário do React é inglês e brigar com ele
confunde; a lógica do domínio é nossa e fica mais clara em português.

## Arquitetura

```
src/
  components/  peças visuais reaproveitáveis, sem busca de dados
  pages/       uma tela por rota
  services/    acesso a dados externos (GitHub, Supabase)
  hooks/       lógica reaproveitável de React (use*)
```

**Regra principal:** componente em `pages/` ou `components/` nunca chama `fetch`
nem `supabase` direto. Sempre através de um hook ou de um service.

- Dado que vem de fora → service em `services/`
- Service + estado de tela (carregando / erro / dados) → hook em `hooks/`
- Hook consumido pela página → página só decide o que desenhar

Exemplo: `services/github.js` busca e cacheia; `hooks/useRepositorios.js`
embrulha isso em `{ repositorios, carregando, erro }`; `pages/Home.jsx` só usa.

## Componentes

- Um componente por arquivo, `export default` no fim
- Componente que crescer além de ~120 linhas provavelmente são dois
- Antes de escrever um botão, card ou campo novo, use os que já existem:
  `Button`, `Card`, `Field`, `ProjectCard`, `ProjectCardSkeleton`, `Layout`
- Nada de biblioteca de UI nova sem conversa antes

## Estados de interface

Toda tela que depende de dado externo mostra os três estados: **carregando**,
**erro** e **lista vazia**. Carregando usa skeleton com altura fixa igual à do
conteúdo real — não pode haver salto de layout (CLS).

Botão que dispara requisição fica `disabled` enquanto ela corre.

## Performance

- Rota que puxa dependência pesada entra por `React.lazy`
- O SDK do Supabase (~214 kB) **não pode** voltar para o pacote inicial. Se uma
  página carregada de imediato precisar dele, use `import()` dinâmico
- Confira com `npm run build`: o chunk `index-*.js` deve ficar abaixo de 280 kB
- Cores novas precisam de contraste mínimo de 4,5:1 nos **dois** temas

## Estilo

CSS puro em `src/index.css`, com variáveis em `:root` e sobrescritas em
`[data-tema="escuro"]`. Cor nova entra como variável nos dois temas, nunca
como hex solto dentro de uma regra.

## Testes

Vitest + Testing Library, arquivo `.test.jsx` ao lado do testado. O mínimo que
não pode quebrar: validação do formulário de contato e bloqueio do dashboard
sem login.

```bash
npm test
```

## Commits e branches

Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`, `chore:`, `docs:`),
mensagem em português, assunto no imperativo e sem ponto final.

GitHub Flow: nada direto na `main`. Cada assunto numa branch `feature/<nome>`,
integrada por pull request.

Husky roda `eslint --fix` nos arquivos do commit antes de cada commit. Se o
lint falhar, corrija — não use `--no-verify`.

## Segurança

- Chave de API nunca no código. Variáveis `VITE_*` no `.env` (fora do repo),
  com o nome espelhado no `.env.example`
- Lembre que tudo que começa com `VITE_` **vai para o navegador**. Segredo de
  verdade (ex.: chave do Resend) mora no Supabase, não aqui
- `git push` e deploy: avise e espere confirmação

## Antes de dizer que terminou

```bash
npm run lint && npm test && npm run build
```

Os três têm que passar. Se um falhou, mostre a saída do erro — não afirme que
está funcionando sem ter rodado.
