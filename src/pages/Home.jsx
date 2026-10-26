import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buscarRepositorios } from "../services/github";

function Home() {
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    buscarRepositorios()
      .then((dados) => {
        setProjetos(dados);
      })
      .catch((erro) => {
        setErro(erro.message);
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  if (carregando) {
    return <p>Carregando projetos...</p>;
  }

  if (erro) {
    return <p>Não foi possível carregar os projetos. Tente novamente mais tarde.</p>;
  }

  if (projetos.length === 0) {
    return <p>Nenhum projeto encontrado.</p>;
  }

  return (
    <div>
      <h1>Meu Portfólio</h1>
      <div>
        {projetos.map((projeto) => (
          <div key={projeto.id}>
            <h3>{projeto.name}</h3>
            <p>{projeto.description}</p>
            <p>Linguagem: {projeto.language}</p>
            <Link to={`/projetos/${projeto.name}`}>Ver detalhes</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;