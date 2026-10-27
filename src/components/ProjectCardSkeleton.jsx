import Card from "./Card";

const QUANTIDADE_PADRAO = 6;

/**
 * Ocupa o mesmo espaço do ProjectCard enquanto os dados chegam, evitando que o
 * layout "salte" quando a lista real aparece.
 */
function ProjectCardSkeleton({ quantidade = QUANTIDADE_PADRAO }) {
  return Array.from({ length: quantidade }, (_, indice) => (
    <Card key={indice} className="cartao--esqueleto">
      <span className="barra barra--titulo" />
      <span className="barra" />
      <span className="barra barra--curta" />
    </Card>
  ));
}

export default ProjectCardSkeleton;
