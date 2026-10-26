import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";

// Estas rotas são as únicas que falam com o Supabase. Carregá-las sob demanda
// tira o SDK do Supabase (~400 kB) do pacote inicial que todo visitante baixa.
const Contato = lazy(() => import("./pages/Contato"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<p>Carregando...</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos/:nome" element={<ProjectDetail />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
