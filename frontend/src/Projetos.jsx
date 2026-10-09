import { useEffect, useState } from "react";
import {
  listarProjetos,
  criarProjeto,
  atualizarProjeto,
  removerProjeto,
  ErroDeValidacao,
} from "./api.js";

// Mesmas cores aceitas pelo backend (@IsIn em create-projeto.dto.ts).
const CORES = {
  vermelho: "#dc2626",
  verde: "#16a34a",
  azul: "#2563eb",
  amarelo: "#eab308",
  roxo: "#9333ea",
};

export default function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [erroLista, setErroLista] = useState(false);

  // Formulário de criação.
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cor, setCor] = useState("azul");
  const [erros, setErros] = useState([]);

  // Edição inline do nome.
  const [editandoId, setEditandoId] = useState(null);
  const [textoEdicao, setTextoEdicao] = useState("");

  async function carregar() {
    try {
      setErroLista(false);
      setProjetos(await listarProjetos());
    } catch {
      setErroLista(true);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function adicionar(e) {
    e.preventDefault();
    setErros([]);
    try {
      await criarProjeto({ nome, descricao: descricao || undefined, cor });
      setNome("");
      setDescricao("");
      setCor("azul");
      carregar();
    } catch (err) {
      if (err instanceof ErroDeValidacao) setErros(err.mensagens);
      else setErros(["Não foi possível criar o projeto."]);
    }
  }

  function iniciarEdicao(p) {
    setEditandoId(p.id);
    setTextoEdicao(p.nome);
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setTextoEdicao("");
  }

  async function salvarEdicao(id) {
    try {
      await atualizarProjeto(id, { nome: textoEdicao });
      cancelarEdicao();
      carregar();
    } catch (err) {
      const msg =
        err instanceof ErroDeValidacao ? err.mensagens.join(" ") : "Erro ao salvar.";
      alert(msg);
    }
  }

  async function excluir(id) {
    try {
      await removerProjeto(id);
      carregar();
    } catch {
      /* ignorado */
    }
  }

  return (
    <>
      <h1>📁 Meus Projetos</h1>
      <p className="sub">CRUD de projetos consumindo a API NestJS.</p>

      <form className="form-nova" onSubmit={adicionar}>
        <input
          type="text"
          placeholder="Nome do projeto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <textarea
          placeholder="Descrição (opcional)"
          rows={2}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <select value={cor} onChange={(e) => setCor(e.target.value)}>
          {Object.keys(CORES).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button type="submit">Adicionar</button>

        {erros.length > 0 && (
          <ul className="erros">
            {erros.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        )}
      </form>

      {erroLista && (
        <div className="aviso">
          Não foi possível carregar os projetos. O backend está rodando em{" "}
          <code>localhost:3000</code>?
        </div>
      )}

      {!erroLista && projetos.length === 0 && (
        <div className="aviso">Nenhum projeto ainda. Adicione o primeiro!</div>
      )}

      <ul className="lista">
        {projetos.map((p) =>
          editandoId === p.id ? (
            <li key={p.id} className="item editando">
              <input
                className="edit-input"
                type="text"
                autoFocus
                value={textoEdicao}
                onChange={(e) => setTextoEdicao(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") salvarEdicao(p.id);
                  if (e.key === "Escape") cancelarEdicao();
                }}
              />
              <button className="btn-ok" title="Salvar" onClick={() => salvarEdicao(p.id)}>
                ✓
              </button>
              <button className="btn-cancel" title="Cancelar" onClick={cancelarEdicao}>
                ✗
              </button>
            </li>
          ) : (
            <li key={p.id} className="item">
              <span className="bolinha" style={{ background: CORES[p.cor] || "#64748b" }} title={p.cor} />
              <div className="conteudo">
                <span className="titulo" title="Clique para editar" onClick={() => iniciarEdicao(p)}>
                  {p.nome}
                </span>
                {p.descricao && <span className="descricao">{p.descricao}</span>}
              </div>
              <button className="btn-del" title="Excluir" onClick={() => excluir(p.id)}>
                🗑
              </button>
            </li>
          )
        )}
      </ul>
    </>
  );
}
