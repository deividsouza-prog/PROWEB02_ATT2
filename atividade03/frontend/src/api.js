// Funções que falam com a NOSSA API REST (NestJS).
// Caminhos relativos ("/api/..."): o Vite (npm run dev) ou o Nginx (Docker)
// encaminham para o backend na porta 3000.
const API_TAREFAS = "/api/tarefas";
const API_PROJETOS = "/api/projetos";

// Erro de validação: carrega a lista de mensagens que o NestJS devolve no 400.
export class ErroDeValidacao extends Error {
  constructor(mensagens) {
    super("Erro de validação");
    this.mensagens = mensagens;
  }
}

// Lê a resposta e, se o status não for ok, transforma o corpo do NestJS
// ({ message: string | string[], ... }) em um ErroDeValidacao.
async function tratar(resposta) {
  if (resposta.status === 204) return null;
  const corpo = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    const msgs = Array.isArray(corpo.message)
      ? corpo.message
      : [corpo.message || "Ocorreu um erro."];
    throw new ErroDeValidacao(msgs);
  }
  return corpo;
}

function enviar(url, metodo, dados) {
  return fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  }).then(tratar);
}

// ---------------------------- TAREFAS ----------------------------

// GET /api/tarefas
export async function listarTarefas() {
  const resposta = await fetch(API_TAREFAS);
  if (!resposta.ok) throw new Error("Falha ao listar tarefas");
  return resposta.json();
}

// POST /api/tarefas  (envia { titulo, descricao, projetoId })
export function criarTarefa(dados) {
  return enviar(API_TAREFAS, "POST", dados);
}

// PUT /api/tarefas/:id
export function atualizarTarefa(id, campos) {
  return enviar(`${API_TAREFAS}/${id}`, "PUT", campos);
}

// DELETE /api/tarefas/:id
export async function removerTarefa(id) {
  const resposta = await fetch(`${API_TAREFAS}/${id}`, { method: "DELETE" });
  if (!resposta.ok) throw new Error("Falha ao remover tarefa");
}

// ---------------------------- PROJETOS ----------------------------

// GET /api/projetos
export async function listarProjetos() {
  const resposta = await fetch(API_PROJETOS);
  if (!resposta.ok) throw new Error("Falha ao listar projetos");
  return resposta.json();
}

// POST /api/projetos  (envia { nome, descricao, cor })
export function criarProjeto(dados) {
  return enviar(API_PROJETOS, "POST", dados);
}

// PUT /api/projetos/:id
export function atualizarProjeto(id, campos) {
  return enviar(`${API_PROJETOS}/${id}`, "PUT", campos);
}

// DELETE /api/projetos/:id
export async function removerProjeto(id) {
  const resposta = await fetch(`${API_PROJETOS}/${id}`, { method: "DELETE" });
  if (!resposta.ok) throw new Error("Falha ao remover projeto");
}
