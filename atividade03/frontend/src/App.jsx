import { useState } from "react";
import Tarefas from "./Tarefas.jsx";
import Projetos from "./Projetos.jsx";

// Casca da aplicação: um menu simples alterna entre as telas.
export default function App() {
  const [aba, setAba] = useState("tarefas");

  return (
    <main className="card">
      <nav className="abas">
        <button className={aba === "tarefas" ? "ativa" : ""} onClick={() => setAba("tarefas")}>
          ✅ Tarefas
        </button>
        <button className={aba === "projetos" ? "ativa" : ""} onClick={() => setAba("projetos")}>
          📁 Projetos
        </button>
      </nav>

      {aba === "tarefas" ? <Tarefas /> : <Projetos />}
    </main>
  );
}
