import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buscarRepositorios } from "../services/github";

function Home() {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    buscarRepositorios().then((dados) => {
      setProjetos(dados);
    });
  }, []);

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