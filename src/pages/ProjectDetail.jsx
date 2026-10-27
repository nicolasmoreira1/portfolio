import { Link, useParams } from "react-router-dom";
import { useRepositorios } from "../hooks/useRepositorios";

function ProjectDetail() {
  const { nome } = useParams();
  const { repositorios, carregando, erro } = useRepositorios();

  if (carregando) {
    return <p className="aviso">Carregando projeto...</p>;
  }

  if (erro) {
    return <p className="aviso aviso--erro">{erro}</p>;
  }

  const projeto = repositorios.find((repositorio) => repositorio.name === nome);

  if (!projeto) {
    return (
      <section className="abertura">
        <h1>Projeto não encontrado</h1>
        <p>Não existe um repositório chamado “{nome}”.</p>
        <Link className="botao botao--secundario" to="/">
          Voltar para os projetos
        </Link>
      </section>
    );
  }

  return (
    <article className="detalhe">
      <h1>{projeto.name}</h1>
      <p>{projeto.description || "Sem descrição."}</p>

      <dl className="cartao__meta">
        <div>
          <dt>Linguagem</dt>
          <dd>{projeto.language || "—"}</dd>
        </div>
        <div>
          <dt>Estrelas</dt>
          <dd>{projeto.stargazers_count}</dd>
        </div>
        <div>
          <dt>Atualizado</dt>
          <dd>{new Date(projeto.updated_at).toLocaleDateString("pt-BR")}</dd>
        </div>
      </dl>

      <a
        className="botao botao--primario"
        href={projeto.html_url}
        target="_blank"
        rel="noreferrer"
      >
        Ver no GitHub
      </a>
    </article>
  );
}

export default ProjectDetail;
