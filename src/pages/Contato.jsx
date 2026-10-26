import { useState } from "react";
import { supabase } from "../services/supabase";
import Button from "../components/Button";
import Field from "../components/Field";

const TAMANHO_MINIMO_MENSAGEM = 20;
const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    if (!FORMATO_EMAIL.test(email)) {
      novosErros.email = "E-mail inválido.";
    }

    if (mensagem.trim().length < TAMANHO_MINIMO_MENSAGEM) {
      novosErros.mensagem = `A mensagem precisa ter no mínimo ${TAMANHO_MINIMO_MENSAGEM} caracteres.`;
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
      setErros({
        geral: "Não foi possível enviar sua mensagem. Tente novamente.",
      });
      return;
    }

    setSucesso(true);
    setNome("");
    setEmail("");
    setMensagem("");
  }

  return (
    <section className="formulario">
      <h1>Contato</h1>

      <form onSubmit={handleSubmit} noValidate>
        <Field
          id="nome"
          label="Nome"
          value={nome}
          erro={erros.nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <Field
          id="email"
          label="E-mail"
          value={email}
          erro={erros.email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Field
          as="textarea"
          id="mensagem"
          label="Mensagem"
          rows={6}
          value={mensagem}
          erro={erros.mensagem}
          onChange={(e) => setMensagem(e.target.value)}
        />

        {erros.geral && <p className="aviso aviso--erro">{erros.geral}</p>}
        {sucesso && (
          <p className="aviso aviso--sucesso">Mensagem enviada com sucesso!</p>
        )}

        <Button type="submit" disabled={enviando}>
          {enviando ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </section>
  );
}

export default Contato;
