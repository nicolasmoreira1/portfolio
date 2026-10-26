import { useEffect, useState } from "react";

export function useTheme() {
  const [tema, setTema] = useState(() => {
    const temaSalvo = localStorage.getItem("tema");
    return temaSalvo || "claro";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-tema", tema);
    localStorage.setItem("tema", tema);
  }, [tema]);

  function alternarTema() {
    setTema((atual) => (atual === "claro" ? "escuro" : "claro"));
  }

  return { tema, alternarTema };
}