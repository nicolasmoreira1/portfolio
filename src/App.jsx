import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import Contato from "./pages/Contato";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { tema, alternarTema } = useTheme();

  return (
    <BrowserRouter>
      <button onClick={alternarTema}>
        {tema === "claro" ? "🌙 Modo escuro" : "☀️ Modo claro"}
      </button>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projetos/:nome" element={<ProjectDetail />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;