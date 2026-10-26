import { Link } from "react-router-dom";
import Card from "./Card";

const formatadorDeData = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function ProjectCard({ projeto, destacado = false }) {
  return (
    <Card className={destacado ? "cartao--destaque" : ""}>
      <h2>
        {projeto.name}
        {destacado && <span className="selo">destaque</span>}
      </h2>

      <p className="cartao__descricao">
        {projeto.description || "Sem descrição."}
      </p>

      <dl className="cartao__meta">
        <div>
          <dt>Linguagem</dt>
          <dd>{projeto.language || "—"}</dd>
        </div>
        <div>
          <dt>Atualizado</dt>
          <dd>{formatadorDeData.format(new Date(projeto.updated_at))}</dd>
        </div>
      </dl>

      <Link className="botao botao--secundario" to={`/projetos/${projeto.name}`}>
        Ver detalhes
      </Link>
    </Card>
  );
}

export default ProjectCard;
