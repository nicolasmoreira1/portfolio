import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { useRepositorios } from "../hooks/useRepositorios";
import Button from "../components/Button";
import Card from "../components/Card";

function Dashboard() {
  const [mensagens, setMensagens] = useState([]);
  const [destaques, setDestaques] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const { repositorios } = useRepositorios();
  const navigate = useNavigate();

  useEffect(() => {
    async function exigirLoginECarregar() {
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

      setMensagens(dadosMensagens || []);
      setDestaques(dadosDestaques || []);
      setCarregando(false);
    }

    exigirLoginECarregar();
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
      return;
    }

    const { data } = await supabase
      .from("projetos_destaque")
      .insert({ nome_repositorio: nomeRepositorio })
      .select();

    setDestaques((atual) => [...atual, data[0]]);
  }

  async function sair() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  if (carregando) {
    return <p className="aviso">Carregando...</p>;
  }

  return (
    <>
      <header className="painel__topo">
        <h1>Dashboard</h1>
        <Button variante="secundario" onClick={sair}>
          Sair
        </Button>
      </header>

      <h2>Mensagens recebidas</h2>
      {mensagens.length === 0 && (
        <p className="aviso">Nenhuma mensagem recebida ainda.</p>
      )}

      <div className="grade">
        {mensagens.map((msg) => (
          <Card key={msg.id}>
            <h2>{msg.nome}</h2>
            <p className="cartao__descricao">{msg.email}</p>
            <p>{msg.mensagem}</p>
            <p className="selo">{msg.respondida ? "respondida" : "pendente"}</p>
            {!msg.respondida && (
              <Button
                variante="secundario"
                onClick={() => marcarComoRespondida(msg.id)}
              >
                Marcar como respondida
              </Button>
            )}
          </Card>
        ))}
      </div>

      <h2>Projetos em destaque na home</h2>
      <ul className="lista-destaques">
        {repositorios.map((projeto) => (
          <li key={projeto.id}>
            <label>
              <input
                type="checkbox"
                checked={estaDestacado(projeto.name)}
                onChange={() => alternarDestaque(projeto.name)}
              />
              {projeto.name}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Dashboard;
