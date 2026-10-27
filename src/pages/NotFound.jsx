import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="abertura">
      <h1>404</h1>
      <p>Esta página não existe.</p>
      <Link className="botao botao--secundario" to="/">
        Voltar para o início
      </Link>
    </section>
  );
}

export default NotFound;
