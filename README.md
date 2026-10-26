# Portfólio

Site de portfólio pessoal feito em React, com projetos carregados automaticamente do GitHub.

## Tecnologias

- React + Vite
- ESLint (padronização de código)

## Estrutura de pastas

- `src/components` — componentes visuais reaproveitáveis (botões, cards), sem lógica de busca de dados
- `src/pages` — telas completas do site (Home, página de projeto, 404)
- `src/services` — funções que buscam dados externos (ex.: API do GitHub)
- `src/hooks` — hooks personalizados do React (funções reaproveitáveis que começam com `use`)

## Convenções de nomenclatura

- Componentes em PascalCase (ex.: `ProjectCard.jsx`)
- Hooks começando com `use` (ex.: `useTheme.js`)

## Padrão de commits

Seguimos o padrão Conventional Commits:
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `chore:` tarefas de configuração/manutenção
- `docs:` mudanças em documentação

## Como rodar o projeto

\`\`\`
npm install
npm run dev
\`\`\`