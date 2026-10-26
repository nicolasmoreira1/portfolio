import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import Button from "../components/Button";
import Field from "../components/Field";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [entrando, setEntrando] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(evento) {
    evento.preventDefault();
    setErro(null);
    setEntrando(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    setEntrando(false);

    if (error) {
      setErro("E-mail ou senha incorretos.");
      return;
    }

    navigate("/dashboard");
  }

  return (
    <section className="formulario">
      <h1>Login</h1>

      <form onSubmit={handleSubmit} noValidate>
        <Field
          id="email"
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Field
          id="senha"
          label="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {erro && <p className="aviso aviso--erro">{erro}</p>}

        <Button type="submit" disabled={entrando}>
          {entrando ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </section>
  );
}

export default Login;
