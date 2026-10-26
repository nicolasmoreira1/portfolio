import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Contato from "./Contato";

vi.mock("../services/supabase", () => ({
  supabase: {
    from: () => ({
      insert: () => Promise.resolve({ error: null }),
    }),
  },
}));

describe("Formulário de contato", () => {
  it("mostra erros quando o formulário é enviado vazio", async () => {
    render(<Contato />);

    const botaoEnviar = screen.getByText("Enviar");
    fireEvent.click(botaoEnviar);

    expect(await screen.findByText("O nome é obrigatório.")).toBeInTheDocument();
    expect(await screen.findByText("E-mail inválido.")).toBeInTheDocument();
    expect(
      await screen.findByText("A mensagem precisa ter no mínimo 20 caracteres.")
    ).toBeInTheDocument();
  });
});