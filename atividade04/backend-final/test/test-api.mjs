// Testador automático da API (Atividade 04) — sem dependências extras.
// Requer Node 18+ (fetch nativo). Uso:
//   1) docker compose up -d db && npm run migration:run && npm run start:dev
//   2) em outro terminal:  npm run test:api
// Outra URL: BASE_URL=http://localhost:3000/api npm run test:api

const BASE = process.env.BASE_URL || 'http://localhost:3000/api';
const email = `aluno+${Date.now()}@uncisal.edu.br`;
const senha = '123456';

let cookie = ''; // "cookie jar" simples: guarda o access_token
let ok = 0;
let falhas = 0;

async function req(method, path, body, { enviarCookie = true, cookieManual } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const c = cookieManual ?? (enviarCookie ? cookie : '');
  if (c) headers.Cookie = c;
  const res = await fetch(BASE + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    redirect: 'manual',
  });
  const texto = await res.text();
  let json = null;
  try { json = JSON.parse(texto); } catch {}
  return { status: res.status, json, setCookie: res.headers.getSetCookie?.() ?? [] };
}

function check(nome, condicao, detalhe = '') {
  if (condicao) { ok++; console.log(`  \x1b[32m✔\x1b[0m ${nome}`); }
  else { falhas++; console.log(`  \x1b[31m✘\x1b[0m ${nome} ${detalhe}`); }
}

function secao(t) { console.log(`\n\x1b[1m${t}\x1b[0m`); }

async function main() {
  console.log(`Testando ${BASE} com o usuário ${email}`);

  secao('1) Registro');
  let r = await req('POST', '/auth/register', { email, senha }, { enviarCookie: false });
  check('POST /auth/register → 201', r.status === 201, `(veio ${r.status})`);
  check('retorna id e email', r.json?.id && r.json?.email === email);
  check('NÃO devolve a senha/hash', r.json && !('senha' in r.json));

  r = await req('POST', '/auth/register', { email, senha }, { enviarCookie: false });
  check('e-mail repetido → 409', r.status === 409, `(veio ${r.status})`);

  r = await req('POST', '/auth/register', { email: 'xxx', senha }, { enviarCookie: false });
  check('e-mail inválido → 400', r.status === 400, `(veio ${r.status})`);
  check('mensagem "E-mail inválido."', JSON.stringify(r.json?.message).includes('E-mail inválido'));

  r = await req('POST', '/auth/register', { email: 'a@b.com', senha: '123' }, { enviarCookie: false });
  check('senha curta → 400', r.status === 400, `(veio ${r.status})`);

  secao('2) Rotas protegidas SEM login');
  r = await req('GET', '/auth/me', null, { enviarCookie: false });
  check('GET /auth/me → 401', r.status === 401, `(veio ${r.status})`);
  r = await req('GET', '/tarefas', null, { enviarCookie: false });
  check('GET /tarefas → 401', r.status === 401, `(veio ${r.status})`);
  r = await req('POST', '/tarefas', { titulo: 'Sem login' }, { enviarCookie: false });
  check('POST /tarefas → 401', r.status === 401, `(veio ${r.status})`);
  r = await req('GET', '/projetos', null, { enviarCookie: false });
  check('GET /projetos → 401', r.status === 401, `(veio ${r.status})`);
  r = await req('POST', '/projetos', { nome: 'Sem login' }, { enviarCookie: false });
  check('POST /projetos → 401', r.status === 401, `(veio ${r.status})`);
  r = await req('GET', '/tarefas', null, { cookieManual: 'access_token=token.invalido.aqui' });
  check('token inválido/adulterado → 401', r.status === 401, `(veio ${r.status})`);

  secao('3) Login');
  r = await req('POST', '/auth/login', { email, senha: 'errada' }, { enviarCookie: false });
  check('senha errada → 401', r.status === 401, `(veio ${r.status})`);
  r = await req('POST', '/auth/login', { email: 'naoexiste@x.com', senha }, { enviarCookie: false });
  check('usuário inexistente → 401', r.status === 401, `(veio ${r.status})`);

  r = await req('POST', '/auth/login', { email, senha }, { enviarCookie: false });
  check('login correto → 201', r.status === 201, `(veio ${r.status})`);
  const sc = r.setCookie.find((c) => c.startsWith('access_token='));
  check('Set-Cookie access_token presente', !!sc);
  check('cookie é HttpOnly', /httponly/i.test(sc || ''));
  check('cookie é SameSite=Lax', /samesite=lax/i.test(sc || ''));
  check('token NÃO vem no corpo da resposta', r.json && !('token' in r.json) && !JSON.stringify(r.json).includes('eyJ'));
  check('corpo traz user.email', r.json?.user?.email === email);
  if (sc) cookie = sc.split(';')[0];

  secao('4) Rotas protegidas COM login (cookie)');
  r = await req('GET', '/auth/me');
  check('GET /auth/me → 200', r.status === 200, `(veio ${r.status})`);
  check('me devolve userId (sub) e email', typeof r.json?.userId === 'number' && r.json?.email === email);

  r = await req('GET', '/tarefas');
  check('GET /tarefas → 200 (array)', r.status === 200 && Array.isArray(r.json), `(veio ${r.status})`);

  r = await req('POST', '/tarefas', { titulo: 'Estudar JWT', descricao: 'Cookies e guards' });
  check('POST /tarefas → 201', r.status === 201, `(veio ${r.status})`);
  const id = r.json?.id;
  check('tarefa criada tem id', !!id);

  r = await req('POST', '/tarefas', { titulo: 'ab' });
  check('título curto → 400 (validação segue valendo)', r.status === 400, `(veio ${r.status})`);

  r = await req('PUT', `/tarefas/${id}`, { concluida: true });
  check('PUT /tarefas/:id → 200 e concluida=true', r.status === 200 && r.json?.concluida === true, `(veio ${r.status})`);

  r = await req('DELETE', `/tarefas/${id}`);
  check('DELETE /tarefas/:id → 204', r.status === 204, `(veio ${r.status})`);

  r = await req('GET', `/tarefas/${id}`);
  check('tarefa excluída → 404', r.status === 404, `(veio ${r.status})`);

  secao('4b) Projetos (rota protegida, com cookie)');
  r = await req('GET', '/projetos');
  check('GET /projetos → 200 (array)', r.status === 200 && Array.isArray(r.json), `(veio ${r.status})`);
  r = await req('POST', '/projetos', { nome: 'Projeto Web 2', descricao: 'API com JWT', cor: 'roxo' });
  check('POST /projetos → 201', r.status === 201 && !!r.json?.id, `(veio ${r.status})`);
  check('projeto guarda a cor', r.json?.cor === 'roxo');
  const pid = r.json?.id;
  r = await req('POST', '/projetos', { nome: 'ab' });
  check('nome curto → 400', r.status === 400, `(veio ${r.status})`);
  r = await req('POST', '/projetos', { nome: 'Cor inválida', cor: 'rosa' });
  check('cor inválida → 400', r.status === 400, `(veio ${r.status})`);
  r = await req('POST', '/projetos', { nome: 'Sem cor informada' });
  check('cor omitida assume "azul"', r.status === 201 && r.json?.cor === 'azul', `(veio ${r.status})`);
  const pidSemCor = r.json?.id;
  if (pidSemCor) await req('DELETE', `/projetos/${pidSemCor}`);
  r = await req('PUT', `/projetos/${pid}`, { nome: 'Projeto Web 2 (editado)' });
  check('PUT /projetos/:id → 200', r.status === 200 && r.json?.nome === 'Projeto Web 2 (editado)', `(veio ${r.status})`);
  r = await req('GET', `/projetos/${pid}`);
  check('GET /projetos/:id → 200', r.status === 200, `(veio ${r.status})`);

  secao('4c) Tarefas dentro de projetos');
  r = await req('POST', '/tarefas', { titulo: 'Tarefa do projeto', projetoId: pid });
  check('POST /tarefas com projetoId → 201', r.status === 201 && r.json?.projetoId === pid, `(veio ${r.status})`);
  const tid = r.json?.id;
  r = await req('POST', '/tarefas', { titulo: 'Tarefa solta' });
  check('tarefa sem projeto → 201', r.status === 201, `(veio ${r.status})`);
  const tidSolta = r.json?.id;
  r = await req('POST', '/tarefas', { titulo: 'Projeto fantasma', projetoId: 999999 });
  check('projetoId inexistente → 400', r.status === 400, `(veio ${r.status})`);
  r = await req('GET', `/tarefas?projetoId=${pid}`);
  check('GET /tarefas?projetoId= filtra', r.status === 200 && r.json.length === 1 && r.json[0].id === tid, `(veio ${r.status})`);
  r = await req('GET', '/tarefas?projetoId=abc');
  check('projetoId não numérico → 400', r.status === 400, `(veio ${r.status})`);

  secao('4d) Excluir projeto não apaga as tarefas');
  r = await req('DELETE', `/projetos/${pid}`);
  check('DELETE /projetos/:id → 204', r.status === 204, `(veio ${r.status})`);
  r = await req('GET', `/tarefas/${tid}`);
  check('tarefa continua existindo, agora sem projeto', r.status === 200 && r.json?.projetoId === null, `(veio ${r.status})`);
  await req('DELETE', `/tarefas/${tid}`);
  await req('DELETE', `/tarefas/${tidSolta}`);
  r = await req('DELETE', `/projetos/${pid}`);
  check('excluir de novo → 404', r.status === 404, `(veio ${r.status})`);
  r = await req('GET', `/projetos/${pid}`);
  check('projeto excluído → 404', r.status === 404, `(veio ${r.status})`);

  secao('5) Logout');
  r = await req('POST', '/auth/logout');
  check('POST /auth/logout → 201 {ok:true}', r.status === 201 && r.json?.ok === true, `(veio ${r.status})`);
  const limpa = r.setCookie.find((c) => c.startsWith('access_token='));
  check('servidor limpa o cookie (expira)', !!limpa && /expires=|max-age=0/i.test(limpa));
  // simula o navegador: após o clearCookie o cookie deixa de ser enviado
  r = await req('GET', '/auth/me', null, { enviarCookie: false });
  check('/auth/me sem cookie → 401', r.status === 401, `(veio ${r.status})`);

  console.log(`\n\x1b[1mResultado: ${ok} passaram, ${falhas} falharam\x1b[0m`);
  process.exit(falhas ? 1 : 0);
}

main().catch((e) => {
  console.error('\n\x1b[31mNão consegui falar com a API.\x1b[0m Ela está rodando em', BASE, '?\n', e.cause?.code || e.message);
  process.exit(2);
});
