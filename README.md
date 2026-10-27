# Portfólio

Site de portfólio pessoal em React. Os projetos são carregados automaticamente
da API do GitHub, e o dono do site tem uma área protegida por login para ler as
mensagens recebidas e escolher quais projetos aparecem em destaque.

## Tecnologias

| Tecnologia | Para quê |
|---|---|
| React + Vite | Interface e servidor de desenvolvimento |
| React Router | Rotas, incluindo link próprio por projeto e página 404 |
| Supabase | Banco das mensagens e dos destaques + autenticação do dono |
| Resend | Envio do e-mail de aviso quando chega uma mensagem nova |
| Vitest + Testing Library | Testes automatizados |
| ESLint + Husky + lint-staged | Padrão de código verificado antes de cada commit |
| Vercel | Publicação automática a cada push na `main` |

## Estrutura de pastas

- `src/components` — componentes visuais reaproveitáveis (`Button`, `Card`, `Field`, `ProjectCard`, `Layout`), sem lógica de busca de dados
- `src/pages` — uma tela por rota (Home, ProjectDetail, Contato, Login, Dashboard, NotFound)
- `src/services` — acesso a dados externos (API do GitHub, cliente do Supabase)
- `src/hooks` — hooks personalizados (`useTheme`, `useRepositorios`)

A regra é: componente de `pages` ou `components` nunca chama `fetch` direto —
sempre passa por um hook ou por um service.

## Convenções de nomenclatura

- Componentes em PascalCase (`ProjectCard.jsx`)
- Hooks começando com `use` (`useRepositorios.js`)
- Variáveis e funções em português, nomes de arquivo e props em inglês
- Testes ao lado do arquivo testado, com sufixo `.test.jsx`

## Padrão de commits

Conventional Commits:

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `refactor:` mudança de código sem mudar comportamento
- `test:` testes
- `chore:` configuração e manutenção
- `docs:` documentação

## Estratégia de branches

GitHub Flow: a `main` está sempre publicável. Cada funcionalidade nasce numa
branch própria (`feature/<assunto>`, ex.: `feature/dashboard`), e volta para a
`main` por pull request. Nada é commitado direto na `main`.

## Como rodar

```bash
npm install
cp .env.example .env   # preencha as chaves do Supabase
npm run dev
```

Outros comandos:

```bash
npm test     # roda os testes
npm run lint # verifica o padrão de código
npm run build # gera a versão de produção em dist/
```

## Fluxo do formulário de contato

Quando o visitante envia o formulário, acontecem duas coisas:

1. O front-end grava a mensagem na tabela `mensagens` do Supabase — é ela que
   alimenta o dashboard.
2. Um **Database Webhook** do Supabase dispara no `INSERT` dessa tabela e chama
   o **Resend**, que manda o e-mail de aviso para o dono do site.

O passo 2 é configurado no painel do Supabase, não neste repositório. Quem
clonar o projeto terá o formulário salvando no banco, mas **nenhum e-mail será
enviado** até configurar o webhook.

A chave do Resend fica guardada no Supabase, nunca no `.env` deste projeto:
tudo que começa com `VITE_` é embutido no JavaScript e fica visível para
qualquer visitante.

## Variáveis de ambiente

Veja `.env.example`. O `.env` não vai para o repositório.

- `VITE_SUPABASE_URL` — URL do projeto no Supabase
- `VITE_SUPABASE_ANON_KEY` — chave pública (anon) do Supabase
