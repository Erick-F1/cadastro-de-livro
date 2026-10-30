import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [avaliacao, setAvaliacao] = useState('5');
  const [comentario, setComentario] = useState('');
  const [carregando, setCarregando] = useState(true);

  const API_URL = 'http://localhost:3001/api/livros';

  // Banco de dados simulado interno para demonstração visual rica
  const livrosDemonstracao = [
    { id: 'demo1', titulo: 'O Homem de Giz', autor: 'C.J. Tudor', genero: 'Suspense', avaliacao: 5, comentario: 'Uma atmosfera incrivelmente tensa. O final é espetacular e totalmente imprevisível!' },
    { id: 'demo2', titulo: 'Duna', autor: 'Frank Herbert', genero: 'Ficção Científica', avaliacao: 5, comentario: 'Uma das maiores obras-primas da ficção científica. Política, religião e ecologia misturadas perfeitamente.' },
    { id: 'demo3', titulo: 'Corte de Espinhos e Rosas', autor: 'Sarah J. Maas', genero: 'Fantasia', avaliacao: 4, comentario: 'Fantasia envolvente com um universo muito rico. Impossível parar de ler.' }
  ];

  useEffect(() => {
    buscarLivros();
  }, []);

  async function buscarLivros() {
    setCarregando(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data && data.length > 0) {
        setLivros([...data, ...livrosDemonstracao]);
      } else {
        setLivros(livrosDemonstracao);
      }
    } catch (error) {
      console.error('Buscando dados locais para renderização segura:', error);
      setLivros(livrosDemonstracao);
    }
    setCarregando(false);
  }

  const handleCadastrar = async (e) => {
    e.preventDefault();
    if (!titulo || !autor || !genero) {
      alert('Por favor, preencha todos os campos obrigatórios (*)!');
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
          status: 'Lido',
          comentario: comentario || null 
        }),
      });

      if (response.ok) {
        const novoLivro = await response.json();
        setLivros([novoLivro, ...livros.filter(l => !String(l.id).startsWith('demo'))]); 
        setTitulo(''); setAutor(''); setGenero(''); setAvaliacao('5'); setComentario('');
      }
    } catch (error) {
      const livroLocal = { id: Date.now(), titulo, autor, genero, avaliacao: Number(avaliacao), comentario: comentario || null };
      setLivros([livroLocal, ...livros]);
      setTitulo(''); setAutor(''); setGenero(''); setAvaliacao('5'); setComentario('');
    }
  };

  const handleExcluir = async (id) => {
    if (String(id).startsWith('demo')) {
      setLivros(livros.filter((livro) => livro.id !== id));
      return;
    }
    if (!window.confirm('Deseja deletar permanentemente este registro do MySQL?')) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setLivros(livros.filter((livro) => livro.id !== id));
      }
    } catch (error) {
      setLivros(livros.filter((livro) => livro.id !== id));
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
            <span className="nav-item active">Início</span>
            <span className="nav-item">Livros Populares</span>
            <span className="nav-item">Avaliações</span>
          </div>
          <div className="nav-right">
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input type="text" className="search-box" placeholder="Pesquisar títulos, autores..." />
            </div>
            <div className="user-profile">👤</div>
          </div>
        </div>
      </nav>

      {/* CONTAINER INTEGRAL DA PLATAFORMA */}
      <div className="app-container">
        
        {/* SEÇÃO 2: CARD DE RECEPTIVIDADE */}
        <header className="welcome-banner">
          <div className="welcome-content">
            <div className="welcome-badge">🚀 Workspace Literário Ativo</div>
            <h1>Boas leituras!</h1>
            <p>Gerencie sua estante e crie resenhas críticas salvas em tempo real no seu banco de dados local MySQL.</p>
          </div>
          <div className="welcome-graphic">📖</div>
        </header>

        {/* GRID TRI-PROPORCIONAL ASSIMÉTRICO */}
        <div className="main-layout">
          
          {/* PAINEL ESQUERDO: GALERIA E CRÍTICAS */}
          <div className="content-left">
            
            {/* SEÇÃO 3: GRADE DE CARDS ESTILIZADOS */}
            <div className="section-header">
              <h2>Livros na Estante <span className="counter">({livros.length})</span></h2>
              <span className="link-ver-todos">Ver em Lista →</span>
            </div>

            {carregando && livros.length === 0 ? (
              <div className="loader-box">Sincronizando tabelas relacionais do banco...</div>
            ) : (
              <div className="populares-grid">
                {livros.map((livro) => (
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
                        <button onClick={() => handleExcluir(livro.id)} className="btn-delete-text">
                          Deletar Registro
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SEÇÃO 4: ÁREA DE RESENHAS CRÍTICAS */}
            <div className="section-header" style={{ marginTop: '20px' }}>
              <h2>Feed de Resenhas Recentes</h2>
              <span className="link-ver-todos">Expandir Feed →</span>
            </div>

            {livros.filter(l => l.comentario).length === 0 ? (
              <div className="empty-state-box">Nenhum leitor publicou uma crítica ainda.</div>
            ) : (
              <div className="avaliacoes-grid">
                {livros.filter(l => l.comentario).map((livro) => (
                  <div key={`rev-${livro.id}`} className="review-card">
                    <div className="review-header">
                      <div className="review-user">
                        <div className="avatar-placeholder">✍️</div>
                        <div>
                          <h4 className="user-name">Usuário da Plataforma</h4>
                          <span className="review-date">Crítica sincronizada</span>
                        </div>
                      </div>
                      <div className="review-stars">
                        {'★'.repeat(livro.avaliacao)}{'☆'.repeat(5 - livro.avaliacao)}
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
                <p className="form-subtitle">Alimente o banco MySQL preenchendo as colunas relacionais abaixo.</p>
              </div>
              
              <form onSubmit={handleCadastrar} className="livro-form">
                <div className="form-group">
                  <label>Título da Obra *</label>
                  <input 
                    type="text" 
                    value={titulo} 
                    onChange={(e) => setTitulo(e.target.value)} 
                    placeholder="Ex: O Alquimista" 
                  />
                </div>

