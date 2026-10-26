import { useParams } from "react-router-dom";

function ProjectDetail() {
  const { nome } = useParams();

  return (
    <div>
      <h1>Projeto: {nome}</h1>
      <p>Detalhes do projeto vão aparecer aqui.</p>
    </div>
  );
}

export default ProjectDetail;