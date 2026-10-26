import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

function Layout({ children }) {
  const { tema, alternarTema } = useTheme();

  return (
    <>
      <header className="cabecalho">
        <Link className="marca" to="/">
          nicolas<span>.dev</span>
        </Link>

        <nav className="navegacao">
          <NavLink to="/">Projetos</NavLink>
          <NavLink to="/contato">Contato</NavLink>
          <button
            className="botao botao--icone"
            onClick={alternarTema}
            aria-label={
              tema === "claro" ? "Ativar modo escuro" : "Ativar modo claro"
            }
          >
            {tema === "claro" ? "🌙" : "☀️"}
          </button>
        </nav>
      </header>

      <main className="conteudo">{children}</main>

      <footer className="rodape">
        <p>Feito em React por Nicolas Moreira.</p>
      </footer>
    </>
  );
}

export default Layout;
