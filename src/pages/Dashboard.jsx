import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

function Dashboard() {
  const [mensagens, setMensagens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function verificarLoginECarregar() {
      const { data: sessao } = await supabase.auth.getSession();

      if (!sessao.session) {
        navigate("/login");
        return;
      }

      const { data } = await supabase
        .from("mensagens")
        .select("*")
        .order("created_at", { ascending: false });

      setMensagens(data || []);
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
    </div>
  );
}

export default Dashboard;