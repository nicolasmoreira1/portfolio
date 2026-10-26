import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { buscarRepositorios } from "../services/github";

function Dashboard() {
  const [mensagens, setMensagens] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [destaques, setDestaques] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function verificarLoginECarregar() {
      const { data: sessao } = await supabase.auth.getSession();

      if (!sessao.session) {
        navigate("/login");
        return;
      }

      const { data: dadosMensagens } = await supabase
        .from("mensagens")
        .select("*")
        .order("created_at", { ascending: false });

      const { data: dadosDestaques } = await supabase
        .from("projetos_destaque")
        .select("*");

      const repos = await buscarRepositorios();

      setMensagens(dadosMensagens || []);
      setDestaques(dadosDestaques || []);
      setProjetos(repos);
      setCarregando(false);
    }

    verificarLoginECarregar();
  }, [navigate]);

  async function marcarComoRespondida(id) {
    await supabase.from("mensagens").update({ respondida: true }).eq("id", id);

    setMensagens((atual) =>
      atual.map((m) => (m.id === id ? { ...m, respondida: true } : m))
    );
  }

  function estaDestacado(nomeRepositorio) {
    return destaques.some((d) => d.nome_repositorio === nomeRepositorio);
  }

  async function alternarDestaque(nomeRepositorio) {
    if (estaDestacado(nomeRepositorio)) {
      await supabase
        .from("projetos_destaque")
        .delete()
        .eq("nome_repositorio", nomeRepositorio);

      setDestaques((atual) =>
        atual.filter((d) => d.nome_repositorio !== nomeRepositorio)
      );
    } else {
      const { data } = await supabase
        .from("projetos_destaque")
        .insert({ nome_repositorio: nomeRepositorio })
        .select();

      setDestaques((atual) => [...atual, data[0]]);
    }
  }

  async function sair() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={sair}>Sair</button>

      <h2>Mensagens recebidas</h2>
      {mensagens.length === 0 && <p>Nenhuma mensagem recebida ainda.</p>}

      {mensagens.map((msg) => (
        <div key={msg.id}>
          <p><strong>{msg.nome}</strong> ({msg.email})</p>
          <p>{msg.mensagem}</p>
          <p>Status: {msg.respondida ? "Respondida" : "Pendente"}</p>
          {!msg.respondida && (
            <button onClick={() => marcarComoRespondida(msg.id)}>
              Marcar como respondida
            </button>
          )}
        </div>
      ))}

      <h2>Projetos em destaque</h2>
      {projetos.map((projeto) => (
        <div key={projeto.id}>
          <label>
            <input
              type="checkbox"
              checked={estaDestacado(projeto.name)}
              onChange={() => alternarDestaque(projeto.name)}
            />
            {projeto.name}
          </label>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;   