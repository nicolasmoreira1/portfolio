import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buscarRepositorios } from "../services/github";
import { supabase } from "../services/supabase";

function Home() {
  const [projetos, setProjetos] = useState([]);
  const [destaques, setDestaques] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const repos = await buscarRepositorios();
        const { data: dadosDestaques } = await supabase
          .from("projetos_destaque")
          .select("*");

        setProjetos(repos);
        setDestaques(dadosDestaques || []);
      } catch (erroCapturado) {
        setErro(erroCapturado.message);
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  function estaDestacado(nomeRepositorio) {
    return destaques.some((d) => d.nome_repositorio === nomeRepositorio);
  }

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
            <h3>
              {projeto.name} {estaDestacado(projeto.name) && "⭐ Destaque"}
            </h3>
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