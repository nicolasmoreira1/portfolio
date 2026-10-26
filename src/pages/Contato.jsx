import { useState } from "react";
import { supabase } from "../services/supabase";

function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  function validar() {
    const novosErros = {};

    if (nome.trim().length === 0) {
      novosErros.nome = "O nome é obrigatório.";
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      novosErros.email = "E-mail inválido.";
    }

    if (mensagem.trim().length < 20) {
      novosErros.mensagem = "A mensagem precisa ter no mínimo 20 caracteres.";
    }

    return novosErros;
  }

  async function handleSubmit(evento) {
    evento.preventDefault();

    const novosErros = validar();
    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      return;
    }

    setEnviando(true);
    setSucesso(false);

    const { error } = await supabase
      .from("mensagens")
      .insert({ nome, email, mensagem, respondida: false });

    setEnviando(false);

    if (error) {
      setErros({ geral: "Não foi possível enviar sua mensagem. Tente novamente." });
      return;
    }

    setSucesso(true);
    setNome("");
    setEmail("");
    setMensagem("");
  }

  return (
    <div>
      <h1>Contato</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          {erros.nome && <p>{erros.nome}</p>}
        </div>

        <div>
          <label>E-mail</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {erros.email && <p>{erros.email}</p>}
        </div>

        <div>
          <label>Mensagem</label>
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
          />
          {erros.mensagem && <p>{erros.mensagem}</p>}
        </div>

        {erros.geral && <p>{erros.geral}</p>}
        {sucesso && <p>Mensagem enviada com sucesso!</p>}

        <button type="submit" disabled={enviando}>
          {enviando ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}

export default Contato;