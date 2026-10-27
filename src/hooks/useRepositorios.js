import { useEffect, useState } from "react";
import { buscarRepositorios } from "../services/github";

/**
 * Carrega os repositórios do GitHub e expõe os três estados que a interface
 * precisa mostrar: carregando, erro e a lista em si.
 */
export function useRepositorios() {
  const [repositorios, setRepositorios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let componenteMontado = true;

    buscarRepositorios()
      .then((dados) => componenteMontado && setRepositorios(dados))
      .catch((falha) => componenteMontado && setErro(falha.message))
      .finally(() => componenteMontado && setCarregando(false));

    return () => {
      componenteMontado = false;
    };
  }, []);

  return { repositorios, carregando, erro };
}
