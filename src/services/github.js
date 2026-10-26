const GITHUB_USERNAME = "nicolasmoreira1";

export async function buscarRepositorios() {
  const resposta = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`
  );

  if (!resposta.ok) {
    throw new Error("Erro ao buscar repositórios do GitHub");
  }

  const dados = await resposta.json();
  return dados;
}