import { useState, useEffect } from 'react';
import './App.css';

const CHAVE_BIBLIOTECA_LOCAL = 'bookverse-biblioteca';
const CHAVE_CONTAS_LOCAL = 'bookverse-contas';
const CHAVE_SESSAO_LOCAL = 'bookverse-sessao';
const LIVROS_DEMO = [
  {
    id: 'demo-1',
    titulo: 'O Hobbit',
    autor: 'J.R.R. Tolkien',
    genero: 'Fantasia',
    avaliacao: 5,
    status: 'Lido',
    comentario: 'Uma aventura acolhedora e cheia de imaginação. Foi impossível não torcer pelo Bilbo.',
    reviewAuthor: 'Marina Costa',
    reviewDate: 'há 2 horas',
  },
  {
    id: 'demo-2',
    titulo: 'A hipótese do amor',
    autor: 'Ali Hazelwood',
    genero: 'Romance',
    avaliacao: 4,
    status: 'Lido',
    comentario: 'Leve, divertido e perfeito para sair de uma ressaca literária.',
    reviewAuthor: 'Julia Martins',
    reviewDate: 'há 5 horas',
  },
  {
    id: 'demo-3',
    titulo: '1984',
    autor: 'George Orwell',
    genero: 'Ficção científica',
    avaliacao: 5,
    status: 'Lido',
    comentario: 'Uma leitura impactante que continua rendendo conversa mesmo depois da última página.',
    reviewAuthor: 'Rafael Lima',
    reviewDate: 'ontem',
  },
  {
    id: 'demo-4',
    titulo: 'A biblioteca da meia-noite',
    autor: 'Matt Haig',
    genero: 'Ficção',
    avaliacao: 4,
    status: 'Lendo',
    comentario: 'Cada possibilidade da Nora me deixa pensando nas escolhas que fazemos.',
    reviewAuthor: 'Camila Rocha',
    reviewDate: 'há 1 dia',
  },
  {
    id: 'demo-5',
    titulo: 'Duna',
    autor: 'Frank Herbert',
    genero: 'Ficção científica',
    avaliacao: 5,
    status: 'Lendo',
    comentario: 'O universo é enorme, mas a história prende desde o começo.',
    reviewAuthor: 'Pedro Alves',
    reviewDate: 'há 2 dias',
  },
  {
    id: 'demo-6',
    titulo: 'O pequeno príncipe',
    autor: 'Antoine de Saint-Exupéry',
    genero: 'Aventura',
    avaliacao: 5,
    status: 'Quero Ler',
    comentario: '',
    reviewAuthor: '',
    reviewDate: '',
  },
];

const CATALOGO_LIVROS = [
  { titulo: 'Dom Casmurro', autor: 'Machado de Assis', genero: 'Clássico' },
  { titulo: 'Memórias Póstumas de Brás Cubas', autor: 'Machado de Assis', genero: 'Clássico' },
  { titulo: 'A hora da estrela', autor: 'Clarice Lispector', genero: 'Literatura brasileira' },
  { titulo: 'Perto do coração selvagem', autor: 'Clarice Lispector', genero: 'Literatura brasileira' },
  { titulo: 'Ensaio sobre a cegueira', autor: 'José Saramago', genero: 'Ficção' },
  { titulo: 'O evangelho segundo Jesus Cristo', autor: 'José Saramago', genero: 'Ficção' },
  { titulo: 'Harry Potter e a pedra filosofal', autor: 'J.K. Rowling', genero: 'Fantasia' },
  { titulo: 'Harry Potter e o prisioneiro de Azkaban', autor: 'J.K. Rowling', genero: 'Fantasia' },
  { titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', genero: 'Fantasia' },
  { titulo: 'O Silmarillion', autor: 'J.R.R. Tolkien', genero: 'Fantasia' },
  { titulo: 'A revolução dos bichos', autor: 'George Orwell', genero: 'Ficção' },
  { titulo: 'A morte no Nilo', autor: 'Agatha Christie', genero: 'Mistério' },
  { titulo: 'Assassinato no Expresso do Oriente', autor: 'Agatha Christie', genero: 'Mistério' },
  { titulo: 'O iluminado', autor: 'Stephen King', genero: 'Terror' },
  { titulo: 'It: A coisa', autor: 'Stephen King', genero: 'Terror' },
  { titulo: 'Orgulho e Preconceito', autor: 'Jane Austen', genero: 'Romance' },
  { titulo: 'Emma', autor: 'Jane Austen', genero: 'Romance' },
  { titulo: 'Cem anos de solidão', autor: 'Gabriel García Márquez', genero: 'Realismo mágico' },
  { titulo: 'O amor nos tempos do cólera', autor: 'Gabriel García Márquez', genero: 'Romance' },
  { titulo: 'O Alquimista', autor: 'Paulo Coelho', genero: 'Ficção' },
  { titulo: 'Brida', autor: 'Paulo Coelho', genero: 'Ficção' },
  { titulo: 'Norwegian Wood', autor: 'Haruki Murakami', genero: 'Romance' },
  { titulo: 'Kafka à beira-mar', autor: 'Haruki Murakami', genero: 'Fantasia' },
  { titulo: 'Coraline', autor: 'Neil Gaiman', genero: 'Fantasia' },
  { titulo: 'Deuses americanos', autor: 'Neil Gaiman', genero: 'Fantasia' },
  { titulo: 'Jogos Vorazes', autor: 'Suzanne Collins', genero: 'Distopia' },
  { titulo: 'Em chamas', autor: 'Suzanne Collins', genero: 'Distopia' },
  { titulo: 'O ladrão de raios', autor: 'Rick Riordan', genero: 'Fantasia' },
  { titulo: 'O mar de monstros', autor: 'Rick Riordan', genero: 'Fantasia' },
  { titulo: 'É assim que acaba', autor: 'Colleen Hoover', genero: 'Romance' },
  { titulo: 'Verity', autor: 'Colleen Hoover', genero: 'Suspense' },
  { titulo: 'O morro dos ventos uivantes', autor: 'Emily Brontë', genero: 'Romance' },
  { titulo: 'Crime e castigo', autor: 'Fiódor Dostoiévski', genero: 'Clássico' },
  { titulo: 'Os irmãos Karamázov', autor: 'Fiódor Dostoiévski', genero: 'Clássico' },
  { titulo: 'Os miseráveis', autor: 'Victor Hugo', genero: 'Clássico' },
  { titulo: 'O corcunda de Notre-Dame', autor: 'Victor Hugo', genero: 'Clássico' },
  { titulo: 'Anna Kariênina', autor: 'Liev Tolstói', genero: 'Clássico' },
  { titulo: 'Guerra e paz', autor: 'Liev Tolstói', genero: 'Clássico' },
  { titulo: 'Frankenstein', autor: 'Mary Shelley', genero: 'Terror' },
  { titulo: 'Drácula', autor: 'Bram Stoker', genero: 'Terror' },
  { titulo: 'O retrato de Dorian Gray', autor: 'Oscar Wilde', genero: 'Clássico' },
  { titulo: 'O cão dos Baskerville', autor: 'Arthur Conan Doyle', genero: 'Mistério' },
  { titulo: 'O signo dos quatro', autor: 'Arthur Conan Doyle', genero: 'Mistério' },
  { titulo: 'O código Da Vinci', autor: 'Dan Brown', genero: 'Suspense' },
  { titulo: 'As crônicas de Nárnia', autor: 'C.S. Lewis', genero: 'Fantasia' },
  { titulo: 'Fahrenheit 451', autor: 'Ray Bradbury', genero: 'Ficção científica' },
  { titulo: 'Admirável mundo novo', autor: 'Aldous Huxley', genero: 'Distopia' },
  { titulo: 'Mrs. Dalloway', autor: 'Virginia Woolf', genero: 'Clássico' },
  { titulo: 'A casa dos espíritos', autor: 'Isabel Allende', genero: 'Realismo mágico' },
  { titulo: 'Olhos d’água', autor: 'Conceição Evaristo', genero: 'Contos' },
  { titulo: 'Quarto de despejo', autor: 'Carolina Maria de Jesus', genero: 'Memórias' },
  { titulo: 'As meninas', autor: 'Lygia Fagundes Telles', genero: 'Literatura brasileira' },
  { titulo: 'Terra sonâmbula', autor: 'Mia Couto', genero: 'Literatura africana' },
  { titulo: 'O Auto da Compadecida', autor: 'Ariano Suassuna', genero: 'Literatura brasileira' },
  { titulo: 'O Sítio do Picapau Amarelo', autor: 'Monteiro Lobato', genero: 'Infantil' },
  { titulo: 'Mensagem', autor: 'Fernando Pessoa', genero: 'Poesia' },
  { titulo: 'Macunaíma', autor: 'Mário de Andrade', genero: 'Literatura brasileira' },
  { titulo: 'O diário de Anne Frank', autor: 'Anne Frank', genero: 'Memórias' },
  { titulo: 'O caçador de pipas', autor: 'Khaled Hosseini', genero: 'Ficção' },
  { titulo: 'A biblioteca da meia-noite', autor: 'Matt Haig', genero: 'Ficção' },
  { titulo: 'Duna', autor: 'Frank Herbert', genero: 'Ficção científica' },
  { titulo: 'A hipótese do amor', autor: 'Ali Hazelwood', genero: 'Romance' },
  { titulo: 'O pequeno príncipe', autor: 'Antoine de Saint-Exupéry', genero: 'Aventura' },
];

function normalizarBusca(texto) {
  return String(texto || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[.'’]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

async function gerarHashSenha(senha, salt) {
  if (!globalThis.crypto?.subtle) {
    throw new Error('A autenticação local precisa ser aberta em localhost ou HTTPS.');
  }
  const chave = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(senha),
    'PBKDF2',
    false,
    ['deriveBits'],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: new TextEncoder().encode(salt), iterations: 150000, hash: 'SHA-256' },
    chave,
    256,
  );
  return Array.from(new Uint8Array(bits), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function App() {
  const [livros, setLivros] = useState(LIVROS_DEMO);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [avaliacao, setAvaliacao] = useState('5');
  const [status, setStatus] = useState('Quero Ler');
  const [comentario, setComentario] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authFeedback, setAuthFeedback] = useState('');
  const [authLocalMode, setAuthLocalMode] = useState(false);
  const [usuario, setUsuario] = useState(() => {
    try {
      const sessao = localStorage.getItem(CHAVE_SESSAO_LOCAL);
      return sessao ? JSON.parse(sessao) : null;
    } catch (error) {
      console.error('Não foi possível recuperar a sessão local:', error);
      return null;
    }
  });
  const [busca, setBusca] = useState('');
  const [pesquisaAberta, setPesquisaAberta] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [modoLocal, setModoLocal] = useState(false);
  const [resenhaLivroId, setResenhaLivroId] = useState('');
  const [resenhaTexto, setResenhaTexto] = useState('');
  const [resenhaNota, setResenhaNota] = useState('5');
  const [resenhaFeedback, setResenhaFeedback] = useState('');

  const API_URL = 'http://localhost:3001/api/livros';

  useEffect(() => {
    function carregarBibliotecaLocal() {
      try {
        const salva = localStorage.getItem(CHAVE_BIBLIOTECA_LOCAL);
        if (salva) {
          const livrosSalvos = JSON.parse(salva);
          if (Array.isArray(livrosSalvos)) return livrosSalvos;
        }
      } catch (error) {
        console.error('Não foi possível carregar a biblioteca local:', error);
      }
      return LIVROS_DEMO;
    }

    async function buscarLivros() {
      setCarregando(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Erro HTTP ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setLivros(data);
        } else {
          setModoLocal(true);
          setLivros(carregarBibliotecaLocal());
        }
      } catch (error) {
        console.error('Não foi possível conectar à API:', error);
        setModoLocal(true);
        setLivros(carregarBibliotecaLocal());
      }
      setCarregando(false);
    }

    buscarLivros();
  }, []);

  useEffect(() => {
    if (!modoLocal || carregando) return;
    try {
      localStorage.setItem(CHAVE_BIBLIOTECA_LOCAL, JSON.stringify(livros));
    } catch (error) {
      console.error('Não foi possível salvar a biblioteca neste navegador:', error);
    }
  }, [livros, modoLocal, carregando]);

  const handleCadastrar = async (e) => {
    e.preventDefault();
    if (!titulo || !autor || !genero) {
      alert('Por favor, preencha todos os campos obrigatórios (*)!');
      return;
    }

    const novoLivroLocal = {
      id: `local-${Date.now()}`,
      titulo,
      autor,
      genero,
      avaliacao: Number(avaliacao),
      status,
      comentario: comentario || null,
      reviewAuthor: comentario ? (usuario?.nome || 'Erick') : '',
      reviewDate: comentario ? 'agora' : '',
    };

    if (modoLocal) {
      setLivros((atuais) => [novoLivroLocal, ...atuais]);
      setTitulo(''); setAutor(''); setGenero(''); setAvaliacao('5'); setStatus('Quero Ler'); setComentario('');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          titulo, 
          autor, 
          genero, 
          avaliacao: Number(avaliacao), 
          status,
          comentario: comentario || null 
        }),
      });

      if (response.ok) {
        const novoLivro = await response.json();
        setLivros((atuais) => [{ ...novoLivro, reviewAuthor: novoLivro.comentario ? (usuario?.nome || 'Erick') : '' }, ...atuais]);
        setTitulo(''); setAutor(''); setGenero(''); setAvaliacao('5'); setStatus('Quero Ler'); setComentario('');
      } else {
        const erro = await response.json();
        alert(erro.erro || 'Não foi possível salvar o livro.');
      }
    } catch {
      setModoLocal(true);
      setLivros((atuais) => [novoLivroLocal, ...atuais]);
      setTitulo(''); setAutor(''); setGenero(''); setAvaliacao('5'); setStatus('Quero Ler'); setComentario('');
    }
  };

  const handleExcluir = async (id) => {
    if (!window.confirm('Deseja remover este livro da sua estante?')) return;
    if (modoLocal) {
      setLivros((atuais) => atuais.filter((livro) => livro.id !== id));
      return;
    }
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setLivros((atuais) => atuais.filter((livro) => livro.id !== id));
      } else {
        alert('Não foi possível remover o livro.');
      }
    } catch {
      alert('Não foi possível remover o livro. Verifique a conexão com o servidor.');
    }
  };

  const handleStatus = async (livro, novoStatus) => {
    const atualizarStatusLocal = () => {
      setLivros((atuais) => atuais.map((item) => item.id === livro.id ? { ...item, status: novoStatus } : item));
    };
    if (modoLocal) {
      atualizarStatusLocal();
      return;
    }
    try {
      const response = await fetch(`${API_URL}/${livro.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...livro, status: novoStatus })
      });
      if (response.ok) {
        atualizarStatusLocal();
      } else {
        alert('Não foi possível atualizar o status do livro.');
      }
    } catch {
      setModoLocal(true);
      atualizarStatusLocal();
    }
  };

  const handlePublicarResenha = async (event) => {
    event.preventDefault();
    const texto = resenhaTexto.trim();
    const livro = livros.find((item) => String(item.id) === livroSelecionadoId);
    if (!livro) {
      setResenhaFeedback('Selecione um livro antes de enviar.');
      return;
    }
    if (!texto) {
      setResenhaFeedback('Escreva um comentário antes de enviar.');
      return;
    }

    const livroAtualizado = {
      ...livro,
      comentario: texto,
      avaliacao: Number(resenhaNota),
      reviewAuthor: usuario?.nome || 'Erick',
      reviewDate: 'agora',
      reviewTimestamp: Date.now(),
    };
    const salvarResenha = (feedback = '') => {
      setLivros((atuais) => atuais.map((item) => item.id === livro.id ? livroAtualizado : item));
      setResenhaTexto('');
      setResenhaFeedback(feedback);
    };

    if (modoLocal) {
      salvarResenha();
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${livro.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(livroAtualizado),
      });
      if (!response.ok) {
        setModoLocal(true);
        salvarResenha('A resenha apareceu no feed e foi salva neste navegador; o servidor não confirmou a atualização.');
        return;
      }
      salvarResenha();
    } catch (error) {
      console.error('Não foi possível enviar a resenha à API:', error);
      setModoLocal(true);
      salvarResenha('A resenha apareceu no feed e foi salva neste navegador.');
    }
  };

  const obterCorCapa = (genero) => {
    const g = String(genero).toLowerCase();
    if (g.includes('fantasia')) return 'capa-roxa';
    if (g.includes('suspense') || g.includes('terror')) return 'capa-escura';
    if (g.includes('ficção') || g.includes('sci-fi') || g.includes('científica')) return 'capa-azul';
    if (g.includes('romance')) return 'capa-rosa';
    return 'capa-padrao';
  };

  const termosBusca = normalizarBusca(busca).split(/\s+/).filter(Boolean);
  const chaveLivro = (livro) => `${normalizarBusca(livro.titulo)}|${normalizarBusca(livro.autor)}`;
  const chavesDaEstante = new Set(livros.map(chaveLivro));
  const livrosPesquisaveis = [
    ...livros.map((livro) => ({ ...livro, naEstante: true })),
    ...CATALOGO_LIVROS
      .filter((livro) => !chavesDaEstante.has(chaveLivro(livro)))
      .map((livro) => ({ ...livro, naEstante: false })),
  ];
  const resultadosPesquisa = termosBusca.length
    ? livrosPesquisaveis.filter((livro) => {
      const texto = normalizarBusca(`${livro.titulo} ${livro.autor} ${livro.genero}`);
      return termosBusca.every((termo) => texto.includes(termo));
    })
    : [];
  const resultadosVisiveis = resultadosPesquisa.slice(0, 8);

  const livrosFiltrados = livros.filter((livro) => {
    const texto = normalizarBusca(`${livro.titulo} ${livro.autor} ${livro.genero}`);
    const correspondeBusca = !termosBusca.length || termosBusca.every((termo) => texto.includes(termo));
    const correspondeStatus = filtroStatus === 'Todos' || livro.status === filtroStatus;
    return correspondeBusca && correspondeStatus;
  });
  const selecionarResultadoPesquisa = (livro) => {
    setPesquisaAberta(false);
    if (livro.naEstante) {
      setFiltroStatus('Todos');
      setBusca(livro.titulo);
      window.setTimeout(() => document.querySelector('.populares-grid')?.scrollIntoView({ behavior: 'smooth' }), 0);
      return;
    }

    setBusca('');
    setTitulo(livro.titulo);
    setAutor(livro.autor);
    setGenero(livro.genero);
    setAvaliacao('5');
    setStatus('Quero Ler');
    setComentario('');
    window.setTimeout(() => document.querySelector('.content-right')?.scrollIntoView({ behavior: 'smooth' }), 0);
  };
  const livroSelecionadoId = livros.some((livro) => String(livro.id) === resenhaLivroId)
    ? resenhaLivroId
    : String(livros[0]?.id || '');
  const resenhasPublicadas = livros
    .filter((livro) => livro.comentario)
    .sort((a, b) => (Number(b.reviewTimestamp) || 0) - (Number(a.reviewTimestamp) || 0));

  const handleAuth = async (event) => {
    event.preventDefault();
    const dados = new FormData(event.currentTarget);
    const email = String(dados.get('email') || '').trim().toLowerCase();
    const senha = String(dados.get('password') || '');
    const nome = String(dados.get('name') || '').trim();
    const payload = authMode === 'register'
      ? { nome, email, senha }
      : { email, senha };
    const rota = authMode === 'register' ? 'cadastro' : 'login';

    try {
      const response = await fetch(`http://localhost:3001/api/auth/${rota}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const resultado = await response.json();
      if (!response.ok) {
        setAuthFeedback(resultado.erro || 'Não foi possível concluir a operação.');
        return;
      }

      if (authMode === 'register') {
        setAuthFeedback('Conta criada! Agora faça login.');
        setAuthMode('login');
      } else {
        try {
          localStorage.setItem(CHAVE_SESSAO_LOCAL, JSON.stringify(resultado.usuario));
        } catch (error) {
          console.error('Não foi possível manter a sessão neste navegador:', error);
        }
        setUsuario(resultado.usuario);
        setAuthOpen(false);
      }
    } catch {
      setAuthLocalMode(true);
      try {
        const contasSalvas = JSON.parse(localStorage.getItem(CHAVE_CONTAS_LOCAL) || '[]');
        if (!Array.isArray(contasSalvas)) {
          throw new Error('Os dados de cadastro local estão inválidos.');
        }

        if (authMode === 'register') {
          if (contasSalvas.some((conta) => conta.email === email)) {
            setAuthFeedback('Já existe um cadastro local com este e-mail. Entre na sua conta.');
            return;
          }

          const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) => byte.toString(16).padStart(2, '0')).join('');
          const conta = { nome, email, salt, senhaHash: await gerarHashSenha(senha, salt) };
          localStorage.setItem(CHAVE_CONTAS_LOCAL, JSON.stringify([...contasSalvas, conta]));
          localStorage.setItem(CHAVE_SESSAO_LOCAL, JSON.stringify({ nome, email }));
          setUsuario({ nome, email });
          setAuthOpen(false);
          setAuthFeedback('');
          return;
        }

        const conta = contasSalvas.find((item) => item.email === email);
        if (!conta) {
          setAuthFeedback('Não encontramos uma conta com este e-mail. Crie sua conta para continuar.');
          return;
        }
        const senhaHash = await gerarHashSenha(senha, conta.salt);
        if (senhaHash !== conta.senhaHash) {
          setAuthFeedback('E-mail ou senha incorretos.');
          return;
        }

        const perfil = { nome: conta.nome, email: conta.email };
        localStorage.setItem(CHAVE_SESSAO_LOCAL, JSON.stringify(perfil));
        setUsuario(perfil);
        setAuthOpen(false);
        setAuthFeedback('');
      } catch (error) {
        console.error('Não foi possível concluir a autenticação local:', error);
        setAuthFeedback(error.message || 'Não foi possível concluir o cadastro neste navegador.');
      }
    }
  };

  return (
    <div className="layout-wrapper">
      {/* SEÇÃO 1: NAVBAR SUPERIOR */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="nav-brand">
            <span className="brand-icon">📚</span>
            <span className="brand-text">Book<span className="brand-highlight">Verse</span></span>
          </div>
          <div className="nav-links">
            <button type="button" className="nav-item active" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Início</button>
            <button type="button" className="nav-item" onClick={() => document.querySelector('.populares-grid')?.scrollIntoView({ behavior: 'smooth' })}>Livros</button>
            <button type="button" className="nav-item" onClick={() => document.querySelector('.avaliacoes-grid')?.scrollIntoView({ behavior: 'smooth' })}>Avaliações</button>
          </div>
          <div className="nav-right">
            <div
              className="search-wrapper"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setPesquisaAberta(false);
              }}
            >
              <span className="search-icon">🔍</span>
              <input
                type="search"
                className="search-box"
                placeholder="Pesquisar livros ou autores..."
                aria-label="Pesquisar livros por título ou autor"
                aria-expanded={pesquisaAberta && termosBusca.length > 0}
                aria-controls="search-results"
                value={busca}
                onFocus={() => setPesquisaAberta(true)}
                onChange={(event) => {
                  setBusca(event.target.value);
                  setPesquisaAberta(true);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') setPesquisaAberta(false);
                }}
              />
              {pesquisaAberta && termosBusca.length > 0 && (
                <div id="search-results" className="search-results" role="listbox" aria-label="Resultados da busca">
                  <p className="search-results-count" aria-live="polite">
                    {resultadosPesquisa.length} {resultadosPesquisa.length === 1 ? 'livro encontrado' : 'livros encontrados'}
                  </p>
                  {resultadosVisiveis.length > 0 ? resultadosVisiveis.map((livro) => (
                    <button
                      type="button"
                      role="option"
                      aria-selected="false"
                      className="search-result-item"
                      key={chaveLivro(livro)}
                      onClick={() => selecionarResultadoPesquisa(livro)}
                    >
                      <span className="search-result-copy">
                        <strong>{livro.titulo}</strong>
                        <span>{livro.autor}</span>
                      </span>
                      <span className={livro.naEstante ? 'search-result-status in-shelf' : 'search-result-status'}>
                        {livro.naEstante ? 'Na estante' : 'Adicionar'}
                      </span>
                    </button>
                  )) : (
                    <p className="search-no-results">Nenhum livro encontrado. Tente outro título ou autor.</p>
                  )}
                  {resultadosPesquisa.length > resultadosVisiveis.length && (
                    <p className="search-results-more">
                      Mostrando {resultadosVisiveis.length} de {resultadosPesquisa.length} resultados.
                    </p>
                  )}
                </div>
              )}
            </div>
            <button
              type="button"
              className="btn-login"
              onClick={() => {
                if (usuario) {
                  try {
                    localStorage.removeItem(CHAVE_SESSAO_LOCAL);
                  } catch (error) {
                    console.error('Não foi possível encerrar a sessão neste navegador:', error);
                  }
                  setUsuario(null);
                  return;
                }
                setAuthOpen(true);
                setAuthFeedback('');
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="9" r="3" />
                <path d="M6.5 18.5c1.1-2.4 3-3.5 5.5-3.5s4.4 1.1 5.5 3.5" />
              </svg>
              <span>{usuario ? `Sair (${usuario.nome})` : 'Entrar'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* CONTAINER INTEGRAL DA PLATAFORMA */}
      <div className="app-container">
        
        {/* SEÇÃO 2: CARD DE RECEPTIVIDADE */}
        <header className="welcome-banner">
          <div className="welcome-content">
            <div className="welcome-badge">Retomando sua jornada literária</div>
            <h1>Olá, {usuario ? usuario.nome : 'Erick'}! Bem-vindo de volta.</h1>
            <p>Você já concluiu {livros.filter((livro) => livro.status === 'Lido').length} leituras. Continue explorando sua estante e registre novos progressos.</p>
          </div>
          <div className="welcome-graphic">📖</div>
        </header>

        <section className="stats-grid" aria-label="Resumo da biblioteca">
          <div className="stat-card">
            <span className="stat-icon">📚</span>
            <div><strong>{livros.length}</strong><p>Livros cadastrados</p></div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">✅</span>
            <div><strong>{livros.filter((livro) => livro.status === 'Lido').length}</strong><p>Leituras concluídas</p></div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">⭐</span>
            <div>
              <strong>{livros.length ? (livros.reduce((total, livro) => total + Number(livro.avaliacao || 0), 0) / livros.length).toFixed(1) : '0.0'}</strong>
              <p>Avaliação média</p>
            </div>
          </div>
        </section>

        {modoLocal && (
          <p className="demo-notice">
            Estante de demonstração: os leitores e as resenhas iniciais são fictícios. Seus livros e comentários ficam salvos neste navegador.
          </p>
        )}

        {livros.some((livro) => livro.status === 'Lendo') && (
          <section className="reading-progress" aria-label="Leitura atual">
            <div className="progress-icon">📖</div>
            <div className="progress-copy">
              <span>Leitura em andamento</span>
              <strong>{livros.find((livro) => livro.status === 'Lendo')?.titulo}</strong>
            </div>
            <div className="progress-track" aria-label="64 por cento concluído">
              <div className="progress-track-fill"></div>
            </div>
            <span className="progress-percent">64%</span>
          </section>
        )}

        {/* GRID TRI-PROPORCIONAL ASSIMÉTRICO */}
        <div className="main-layout">
          
          {/* PAINEL ESQUERDO: GALERIA E CRÍTICAS */}
          <div className="content-left">
            
            {/* SEÇÃO 3: GRADE DE CARDS ESTILIZADOS */}
            <div className="section-header">
              <h2>Livros na Estante <span className="counter">({livrosFiltrados.length})</span></h2>
              <select
                className="status-filter"
                value={filtroStatus}
                onChange={(event) => setFiltroStatus(event.target.value)}
                aria-label="Filtrar por status"
              >
                {['Todos', 'Quero Ler', 'Lendo', 'Lido'].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {carregando && livros.length === 0 ? (
              <div className="loader-box">Sincronizando tabelas relacionais do banco...</div>
            ) : (
              livrosFiltrados.length === 0 ? (
                <div className="empty-state-box">Nenhum livro encontrado para os filtros selecionados.</div>
              ) : (
              <div className="populares-grid">
                {livrosFiltrados.map((livro) => (
                  <div key={livro.id} className="book-card">
                    {/* Engine Visual Tridimensional da Capa do Livro */}
                    <div className={`book-cover-css ${obterCorCapa(livro.genero)}`}>
                      <div className="cover-spine"></div>
                      <div className="cover-content">
                        <span className="cover-badge">{livro.genero}</span>
                        <h4 className="cover-title">{livro.titulo}</h4>
                        <p className="cover-author">{livro.autor}</p>
                      </div>
                    </div>

                    <div className="book-card-info">
                      <div>
                        <h3 className="card-title" title={livro.titulo}>{livro.titulo}</h3>
                        <p className="card-author">por {livro.autor}</p>
                      </div>
                      <div>
                        <div className="card-meta">
                          <span className="genre-tag">{livro.genero}</span>
                          <span className="card-rating">★ {livro.avaliacao}.0</span>
                        </div>
                        <select
                          className="card-status"
                          value={livro.status || 'Quero Ler'}
                          onChange={(event) => handleStatus(livro, event.target.value)}
                          aria-label={`Status de ${livro.titulo}`}
                        >
                          <option>Quero Ler</option>
                          <option>Lendo</option>
                          <option>Lido</option>
                        </select>
                        <button onClick={() => handleExcluir(livro.id)} className="btn-delete-text">
                          Deletar Registro
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              )
            )}

            {/* SEÇÃO 4: ÁREA DE RESENHAS CRÍTICAS */}
            <div className="section-header" style={{ marginTop: '20px' }}>
              <h2>Feed de Comentários</h2>
              <span className="link-ver-todos">{resenhasPublicadas.length} publicações</span>
            </div>

            {resenhasPublicadas.length === 0 ? (
              <div className="empty-state-box">Nenhum leitor publicou uma crítica ainda.</div>
            ) : (
              <div className="avaliacoes-grid">
                {resenhasPublicadas.map((livro) => (
                  <div key={`rev-${livro.id}`} className="review-card">
                    <div className="review-header">
                      <div className="review-user">
                        <div className="avatar-placeholder">✍️</div>
                        <div>
                          <h4 className="user-name">{livro.reviewAuthor || 'Leitor BookVerse'}</h4>
                          <span className="review-date">{livro.reviewDate || 'Resenha publicada'}</span>
                        </div>
                      </div>
                      <div className="review-stars">
                        {'★'.repeat(Math.max(0, Math.min(5, Number(livro.avaliacao) || 0)))}{'☆'.repeat(5 - Math.max(0, Math.min(5, Number(livro.avaliacao) || 0)))}
                      </div>
                    </div>
                    <p className="review-text">"{livro.comentario}"</p>
                    <div className="review-footer">
                      <span className="review-book-tag">📘 {livro.titulo}</span>
                      <span className="review-author-tag">por {livro.autor}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PAINEL DIREITO: FORMULÁRIO FLUTUANTE EM VIDRO */}
          <aside className="content-right">
            <div className="form-card">
              <div className="form-card-header">
                <h2><span>⚡</span> Cadastrar Obra</h2>
              </div>
              
              <form onSubmit={handleCadastrar} className="livro-form">
                <div className="form-group">
                  <label>Título da Obra *</label>
                  <input 
                    type="text" 
                    value={titulo} 
                    onChange={(e) => setTitulo(e.target.value)} 
                    placeholder="Digite o título"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Autor *</label>
                  <input
                    type="text"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    placeholder="Digite o autor"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Gênero *</label>
                  <input
                    type="text"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                    placeholder="Ex: Romance, Fantasia, Suspense..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Avaliação</label>
                  <select value={avaliacao} onChange={(e) => setAvaliacao(e.target.value)}>
                    {[1, 2, 3, 4, 5].map((nota) => (
                      <option key={nota} value={nota}>
                        {nota} estrela{nota > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Status da leitura</label>
                  <select value={status} onChange={(event) => setStatus(event.target.value)}>
                    <option>Quero Ler</option>
                    <option>Lendo</option>
                    <option>Lido</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Comentário</label>
                  <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Escreva sua resenha..."
                    rows="4"
                  />
                </div>

                <button type="submit" className="btn-cadastrar-submit">
                  Salvar na Biblioteca
                </button>
              </form>

              <section className="inline-comment-section" aria-labelledby="inline-comment-title">
                <h3 id="inline-comment-title">Comentar no feed</h3>
                <form className="inline-comment-form" onSubmit={handlePublicarResenha}>
                  <label className="form-group">
                    Livro
                    <select
                      value={livroSelecionadoId}
                      onChange={(event) => setResenhaLivroId(event.target.value)}
                      required
                      disabled={livros.length === 0}
                    >
                      {livros.map((livro) => (
                        <option key={livro.id} value={String(livro.id)}>{livro.titulo}</option>
                      ))}
                    </select>
                  </label>
                  <label className="form-group">
                    Sua nota
                    <select value={resenhaNota} onChange={(event) => setResenhaNota(event.target.value)}>
                      {[5, 4, 3, 2, 1].map((nota) => (
                        <option key={nota} value={nota}>{nota} estrela{nota > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </label>
                  <label className="form-group">
                    Comentário
                    <textarea
                      value={resenhaTexto}
                      onChange={(event) => {
                        setResenhaTexto(event.target.value);
                        setResenhaFeedback('');
                      }}
                      placeholder="Escreva seu comentário..."
                      rows="3"
                      required
                    />
                  </label>
                  {resenhaFeedback && <p className="review-feedback" role="status">{resenhaFeedback}</p>}
                  <button type="submit" className="btn-cadastrar-submit" disabled={livros.length === 0}>
                    Comentar
                  </button>
                </form>
              </section>
            </div>
          </aside>
        </div>
      </div>

      {authOpen && (
        <div
          className="auth-overlay"
          onClick={() => setAuthOpen(false)}
        >
          <section
            className="auth-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="auth-close"
              aria-label="Fechar janela"
              onClick={() => setAuthOpen(false)}
            >
              ×
            </button>
            <div className="auth-brand-icon" aria-hidden="true">📚</div>
            <p className="auth-eyebrow">Bem-vindo ao BookVerse</p>
            <h2 id="auth-title">
              {authMode === 'login' ? 'Entre na sua conta' : 'Crie sua conta'}
            </h2>
            <p className="auth-description">
              {authMode === 'login'
                ? 'Acesse sua estante e continue de onde parou.'
                : 'Sua próxima grande leitura começa aqui.'}
            </p>

            <div className="auth-tabs" role="tablist" aria-label="Acesso à conta">
              <button
                type="button"
                role="tab"
                aria-selected={authMode === 'login'}
                className={authMode === 'login' ? 'auth-tab active' : 'auth-tab'}
                onClick={() => {
                  setAuthMode('login');
                  setAuthFeedback('');
                }}
              >
                Entrar
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={authMode === 'register'}
                className={authMode === 'register' ? 'auth-tab active' : 'auth-tab'}
                onClick={() => {
                  setAuthMode('register');
                  setAuthFeedback('');
                }}
              >
                Cadastrar
              </button>
            </div>

            <form
              className="auth-form"
              onSubmit={handleAuth}
            >
              {authMode === 'register' && (
                <label className="auth-field">
                  Nome
                  <input type="text" name="name" autoComplete="name" placeholder="Como podemos te chamar?" required />
                </label>
              )}
              <label className="auth-field">
                E-mail
                <input type="email" name="email" autoComplete="email" placeholder="voce@exemplo.com" required />
              </label>
              <label className="auth-field">
                Senha
                <input
                  type="password"
                  name="password"
                  autoComplete={authMode === 'register' ? 'new-password' : 'current-password'}
                  placeholder="Mínimo de 8 caracteres"
                  minLength="8"
                  required
                />
              </label>
              {authLocalMode && (
                <p className="auth-feedback" role="status">
                  Cadastro local ativo: sua conta fica salva somente neste navegador.
                </p>
              )}
              {authMode === 'login' && (
                <button
                  type="button"
                  className="auth-forgot"
                  onClick={() => setAuthFeedback('Entre em contato com o suporte para recuperar sua senha.')}
                >
                  Esqueceu a senha?
                </button>
              )}
              <button type="submit" className="auth-submit">
                {authMode === 'login' ? 'Entrar' : 'Criar minha conta'}
              </button>
              {authFeedback && <p className="auth-feedback" role="status">{authFeedback}</p>}
            </form>

            <p className="auth-terms">
              Ao continuar, você concorda com nossos termos de uso e política de privacidade.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
