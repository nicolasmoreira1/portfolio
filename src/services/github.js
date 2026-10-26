const GITHUB_USERNAME = "nicolasmoreira1";
const CHAVE_CACHE = "repositorios";
const STATUS_LIMITE_EXCEDIDO = 403;

// A API pública do GitHub permite 60 requisições por hora por IP. Guardamos a
// resposta na sessão para que navegar entre as páginas não gaste o limite.
function lerCache() {
  const bruto = sessionStorage.getItem(CHAVE_CACHE);
  return bruto ? JSON.parse(bruto) : null;
}

export async function buscarRepositorios() {
  const cache = lerCache();
  if (cache) {
    return cache;
  }

  const resposta = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`
  );

  if (resposta.status === STATUS_LIMITE_EXCEDIDO) {
    throw new Error(
      "Limite de requisições da API do GitHub atingido. Tente novamente em alguns minutos."
    );
  }

  if (!resposta.ok) {
    throw new Error("Não foi possível carregar os projetos do GitHub.");
  }

  const dados = await resposta.json();
  sessionStorage.setItem(CHAVE_CACHE, JSON.stringify(dados));
  return dados;
}
