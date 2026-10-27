import { useEffect, useState } from "react";
import { useRepositorios } from "../hooks/useRepositorios";
import ProjectCard from "../components/ProjectCard";
import ProjectCardSkeleton from "../components/ProjectCardSkeleton";

function Home() {
  const { repositorios, carregando, erro } = useRepositorios();
  const [destaques, setDestaques] = useState([]);

  useEffect(() => {
    // Import dinâmico: a lista de destaques é um enfeite, não pode atrasar a
    // primeira pintura carregando o SDK do Supabase junto com a página.
    import("../services/supabase").then(({ supabase }) =>
      supabase
        .from("projetos_destaque")
        .select("*")
        .then(({ data }) => setDestaques(data || []))
    );
  }, []);

  function estaDestacado(nomeRepositorio) {
    return destaques.some((d) => d.nome_repositorio === nomeRepositorio);
  }

  // Destaques primeiro, mantendo a ordem original (mais recentes) dentro de
  // cada grupo.
  const projetosOrdenados = [...repositorios].sort(
    (a, b) => estaDestacado(b.name) - estaDestacado(a.name)
  );

  return (
    <>
      <section className="abertura">
        <h1>Nicolas Moreira</h1>
        <p>
          Desenvolvedor front-end. Abaixo, os projetos que estão no meu GitHub,
          carregados automaticamente.
        </p>
      </section>

      {erro && <p className="aviso aviso--erro">{erro}</p>}

      {!erro && !carregando && repositorios.length === 0 && (
        <p className="aviso">Nenhum projeto encontrado.</p>
      )}

      <div className="grade">
        {carregando && <ProjectCardSkeleton />}

        {!carregando &&
          projetosOrdenados.map((projeto) => (
            <ProjectCard
              key={projeto.id}
              projeto={projeto}
              destacado={estaDestacado(projeto.name)}
            />
          ))}
      </div>
    </>
  );
}

export default Home;
