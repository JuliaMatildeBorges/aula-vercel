import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black: #0D0D0D;
    --white: #FAFAFA;
    --gray-dark: #1A1A1A;
    --gray-mid: #2E2E2E;
    --gray-light: #888888;
    --ac1: #FF3CAC;
    --ac2: #FF8C00;
    --ac3: #784BA0;
    --grad: linear-gradient(135deg, #FF3CAC, #784BA0, #FF8C00);
    --gtext: linear-gradient(90deg, #FF3CAC, #FF8C00);
    --ff: 'Space Grotesk', sans-serif;
    --fm: 'Space Mono', monospace;
    --tr: 0.3s cubic-bezier(0.4,0,0.2,1);
  }

  html { scroll-behavior: smooth; }
  body { background: var(--black); color: var(--white); font-family: var(--ff); overflow-x: hidden; }
  a { color: inherit; text-decoration: none; }

  .gt {
    background: var(--gtext);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .slbl {
    font-family: var(--fm); font-size: 0.7rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--gray-light);
    display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;
  }
  .slbl::before { content: ''; width: 2rem; height: 1px; background: var(--gtext); }

  .ctr { max-width: 1080px; margin: 0 auto; padding: 0 2rem; }
  section { padding: 5.5rem 0; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 1.1rem 2rem; display: flex; justify-content: space-between; align-items: center;
    background: rgba(13,13,13,0.88); backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .nav-logo { font-family: var(--fm); font-size: 0.95rem; font-weight: 700; }
  .nav-logo span { background: var(--gtext); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .nav-links { display: flex; gap: 1.75rem; list-style: none; }
  .nav-links a { font-size: 0.8rem; color: var(--gray-light); transition: color var(--tr); font-family: var(--fm); letter-spacing: 0.05em; }
  .nav-links a:hover { color: var(--white); }
  .nav-cta { padding: 0.45rem 1.1rem; border: 1px solid rgba(255,60,172,0.5); border-radius: 4px; color: var(--ac1) !important; transition: all var(--tr) !important; }
  .nav-cta:hover { background: rgba(255,60,172,0.1) !important; color: var(--white) !important; }
  @media(max-width:680px){.nav-links{display:none}}

  /* HERO */
  .hero { min-height: 100vh; display: flex; align-items: center; position: relative; overflow: hidden; padding-top: 5rem; }
  .hero-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
  .hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);
    background-size: 60px 60px;
  }
  .orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.13; }
  .orb1 { width: 500px; height: 500px; background: var(--ac1); top: -120px; right: -100px; animation: float 8s ease-in-out infinite; }
  .orb2 { width: 350px; height: 350px; background: var(--ac2); bottom: -60px; left: -60px; animation: float 10s ease-in-out infinite reverse; }
  .hero-content { position: relative; z-index: 1; }
  .hero-ey { font-family: var(--fm); font-size: 0.8rem; color: var(--gray-light); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; }
  .ey-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--ac1); animation: pulse 2s ease-in-out infinite; }
  .hero-h1 { font-size: clamp(2.4rem,6.5vw,5rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.03em; }
  .hero-role { display: block; color: var(--gray-light); font-weight: 300; font-size: clamp(1.3rem,3.5vw,2.5rem); margin-top: 0.4rem; }
  .cur { display: inline-block; width: 2px; height: 0.9em; background: var(--ac1); margin-left: 2px; vertical-align: text-bottom; animation: blink 1s step-end infinite; }
  .term {
    margin: 2rem 0; background: var(--gray-dark); border: 1px solid var(--gray-mid);
    border-radius: 8px; padding: 1rem 1.5rem; font-family: var(--fm); font-size: 0.85rem; max-width: 460px;
  }
  .term::before { content: '● ● ●'; display: block; color: var(--gray-mid); font-size: 0.65rem; letter-spacing: 0.5em; margin-bottom: 0.65rem; }
  .tl { color: var(--gray-light); }
  .tl span { color: var(--ac1); }
  .hero-btns { display: flex; gap: 0.85rem; margin-top: 2.2rem; flex-wrap: wrap; }
  .btn-p { padding: 0.8rem 1.85rem; background: var(--grad); color: var(--white); border: none; border-radius: 4px; font-family: var(--fm); font-size: 0.8rem; cursor: pointer; transition: opacity var(--tr), transform var(--tr); letter-spacing: 0.05em; }
  .btn-p:hover { opacity: 0.83; transform: translateY(-2px); }
  .btn-s { padding: 0.8rem 1.85rem; background: transparent; color: var(--white); border: 1px solid var(--gray-mid); border-radius: 4px; font-family: var(--fm); font-size: 0.8rem; cursor: pointer; transition: all var(--tr); letter-spacing: 0.05em; }
  .btn-s:hover { border-color: var(--ac1); color: var(--ac1); transform: translateY(-2px); }
  .scroll-hint { position: absolute; bottom: 1.75rem; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 0.4rem; color: var(--gray-light); font-family: var(--fm); font-size: 0.65rem; letter-spacing: 0.1em; animation: bounce 2s ease-in-out infinite; }
  .scroll-ln { width: 1px; height: 36px; background: linear-gradient(to bottom, var(--ac1), transparent); }

  /* ABOUT */
  .about { border-top: 1px solid rgba(255,255,255,0.05); }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4.5rem; align-items: center; }
  .about-h2 { font-size: clamp(1.7rem,3.5vw,2.6rem); font-weight: 700; line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 1.25rem; }
  .about-p { color: var(--gray-light); font-size: 1rem; line-height: 1.8; margin-bottom: 0.85rem; }
  .about-p strong { color: var(--white); font-weight: 600; }
  .about-stats { display: grid; grid-template-columns: repeat(2,1fr); gap: 0.85rem; margin-top: 2rem; }
  .stat { padding: 1.1rem; background: var(--gray-dark); border: 1px solid var(--gray-mid); border-radius: 8px; transition: border-color var(--tr); }
  .stat:hover { border-color: rgba(255,60,172,0.4); }
  .stat-n { font-family: var(--fm); font-size: 1.6rem; font-weight: 700; background: var(--gtext); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .stat-l { font-size: 0.75rem; color: var(--gray-light); margin-top: 0.2rem; }
  .photo-wrap { position: relative; }
  .photo-frame { width: 100%; aspect-ratio: 3/4; background: var(--gray-dark); border: 1px solid var(--gray-mid); border-radius: 12px; overflow: hidden; position: relative; display: flex; align-items: center; justify-content: center; }
  .photo-icon { font-size: 5.5rem; opacity: 0.12; }
  .photo-ov { position: absolute; inset: 0; background: linear-gradient(to top, var(--black) 0%, transparent 50%); }
  .photo-tag { position: absolute; bottom: 1.25rem; left: 1.25rem; right: 1.25rem; background: rgba(13,13,13,0.92); border: 1px solid var(--gray-mid); border-radius: 8px; padding: 0.875rem; backdrop-filter: blur(8px); }
  .photo-name { font-weight: 600; font-size: 0.9rem; }
  .photo-role { font-family: var(--fm); font-size: 0.7rem; color: var(--ac1); margin-top: 0.2rem; }
  .accent-bar { position: absolute; top: 1.5rem; right: -0.9rem; width: 4px; height: 72px; background: var(--grad); border-radius: 2px; }
  @media(max-width:700px){ .about-grid{grid-template-columns:1fr;gap:2.5rem} .photo-wrap{max-width:300px;margin:0 auto} }

  /* SKILLS */
  .skills { border-top: 1px solid rgba(255,255,255,0.05); background: var(--gray-dark); }
  .skills-h2 { font-size: clamp(1.7rem,3.5vw,2.6rem); font-weight: 700; letter-spacing: -0.02em; margin-bottom: 3rem; }
  .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(155px,1fr)); gap: 0.85rem; }
  .sk { background: var(--black); border: 1px solid var(--gray-mid); border-radius: 10px; padding: 1.35rem 1.1rem; display: flex; flex-direction: column; gap: 0.65rem; cursor: default; transition: all var(--tr); position: relative; overflow: hidden; }
  .sk:hover { transform: translateY(-4px); border-color: rgba(255,60,172,0.5); box-shadow: 0 8px 28px rgba(255,60,172,0.1); }
  .sk-ic { font-size: 1.6rem; }
  .sk-nm { font-weight: 600; font-size: 0.9rem; }
  .sk-lv { font-family: var(--fm); font-size: 0.68rem; color: var(--gray-light); }
  .learning-row { margin-top: 3rem; padding-top: 2.5rem; border-top: 1px solid rgba(255,255,255,0.05); }
  .learning-ttl { font-family: var(--fm); font-size: 0.7rem; letter-spacing: 0.15em; color: var(--gray-light); text-transform: uppercase; margin-bottom: 0.85rem; }
  .tags { display: flex; flex-wrap: wrap; gap: 0.45rem; }
  .tag { padding: 0.3rem 0.8rem; border: 1px dashed var(--gray-mid); border-radius: 100px; font-size: 0.75rem; color: var(--gray-light); font-family: var(--fm); transition: all var(--tr); }
  .tag:hover { border-color: var(--ac1); color: var(--white); }
  @media(max-width:560px){ .skills-grid{grid-template-columns:repeat(2,1fr)} }

  /* PROJECTS */
  .projects { border-top: 1px solid rgba(255,255,255,0.05); }
  .proj-hd { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2.75rem; flex-wrap: wrap; gap: 1rem; }
  .proj-h2 { font-size: clamp(1.7rem,3.5vw,2.6rem); font-weight: 700; letter-spacing: -0.02em; }
  .wip-badge { font-family: var(--fm); font-size: 0.7rem; color: var(--gray-light); padding: 0.35rem 0.9rem; border: 1px solid var(--gray-mid); border-radius: 100px; }
  .proj-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px,1fr)); gap: 1.35rem; }
  .pcard { background: var(--gray-dark); border: 1px solid var(--gray-mid); border-radius: 12px; overflow: hidden; transition: all var(--tr); display: flex; flex-direction: column; }
  .pcard:hover { transform: translateY(-6px); border-color: rgba(255,60,172,0.38); box-shadow: 0 16px 44px rgba(0,0,0,0.4); }
  .pthumb { width: 100%; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; font-size: 3.2rem; position: relative; }
  .pthumb-glow { position: absolute; inset: 0; opacity: 0.35; }
  .pthumb-ic { position: relative; z-index: 1; }
  .pstatus { position: absolute; top: 0.65rem; right: 0.65rem; padding: 0.2rem 0.65rem; border-radius: 100px; font-family: var(--fm); font-size: 0.6rem; letter-spacing: 0.08em; font-weight: 700; text-transform: uppercase; z-index: 2; background: rgba(255,140,0,0.15); border: 1px solid rgba(255,140,0,0.5); color: #FF8C00; }
  .pbody { padding: 1.35rem; flex: 1; display: flex; flex-direction: column; }
  .ptitle { font-size: 1rem; font-weight: 600; margin-bottom: 0.45rem; }
  .pdesc { font-size: 0.83rem; color: var(--gray-light); line-height: 1.65; flex: 1; margin-bottom: 1.1rem; }
  .ptags { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1.1rem; }
  .ptag { padding: 0.18rem 0.55rem; background: rgba(255,255,255,0.05); border-radius: 4px; font-family: var(--fm); font-size: 0.67rem; color: var(--gray-light); }
  .plink { display: inline-flex; align-items: center; gap: 0.35rem; font-family: var(--fm); font-size: 0.72rem; color: var(--gray-light); padding: 0.35rem 0.8rem; border: 1px solid var(--gray-mid); border-radius: 4px; transition: all var(--tr); }
  .plink:hover { color: var(--ac1); border-color: var(--ac1); }
  @media(max-width:580px){ .proj-grid{grid-template-columns:1fr} }

  /* CONTACT */
  .contact { border-top: 1px solid rgba(255,255,255,0.05); background: var(--gray-dark); }
  .contact-in { display: grid; grid-template-columns: 1fr 1fr; gap: 4.5rem; align-items: start; }
  .contact-h2 { font-size: clamp(1.7rem,3.5vw,2.6rem); font-weight: 700; letter-spacing: -0.02em; margin-bottom: 0.85rem; line-height: 1.1; }
  .contact-sub { color: var(--gray-light); line-height: 1.7; margin-bottom: 2.2rem; font-size: 0.95rem; }
  .clinks { display: flex; flex-direction: column; gap: 0.85rem; }
  .clink { display: flex; align-items: center; gap: 0.9rem; padding: 0.9rem 1.1rem; background: var(--black); border: 1px solid var(--gray-mid); border-radius: 8px; transition: all var(--tr); cursor: pointer; }
  .clink:hover { border-color: rgba(255,60,172,0.5); transform: translateX(4px); }
  .clink-ic { width: 2.25rem; height: 2.25rem; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
  .clink-ttl { font-weight: 600; font-size: 0.87rem; }
  .clink-val { font-family: var(--fm); font-size: 0.7rem; color: var(--gray-light); margin-top: 0.12rem; }
  .clink-arr { color: var(--gray-light); margin-left: auto; transition: color var(--tr); }
  .clink:hover .clink-arr { color: var(--ac1); }
  .form-col { display: flex; flex-direction: column; gap: 0.85rem; }
  .fld { display: flex; flex-direction: column; gap: 0.35rem; }
  .flbl { font-family: var(--fm); font-size: 0.7rem; color: var(--gray-light); letter-spacing: 0.08em; text-transform: uppercase; }
  .finp, .ftxt { background: var(--black); border: 1px solid var(--gray-mid); border-radius: 6px; padding: 0.8rem 0.9rem; color: var(--white); font-family: var(--ff); font-size: 0.87rem; transition: border-color var(--tr); resize: none; outline: none; }
  .finp::placeholder, .ftxt::placeholder { color: rgba(136,136,136,0.45); }
  .finp:focus, .ftxt:focus { border-color: rgba(255,60,172,0.6); }
  .ftxt { min-height: 120px; }
  .fsub { width: 100%; padding: 0.9rem; background: var(--grad); color: var(--white); border: none; border-radius: 6px; font-family: var(--fm); font-size: 0.82rem; font-weight: 700; letter-spacing: 0.05em; cursor: pointer; transition: opacity var(--tr), transform var(--tr); margin-top: 0.35rem; }
  .fsub:hover { opacity: 0.84; transform: translateY(-2px); }
  .footer { margin-top: 4.5rem; padding-top: 2.25rem; border-top: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.85rem; }
  .footer-cp { font-family: var(--fm); font-size: 0.7rem; color: var(--gray-light); }
  .footer-cp span { background: var(--gtext); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .footer-md { font-family: var(--fm); font-size: 0.65rem; color: var(--gray-mid); }
  @media(max-width:700px){ .contact-in{grid-template-columns:1fr;gap:2.5rem} }

  @keyframes blink { 50%{opacity:0} }
  @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:0.7} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-28px)} }
  @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(7px)} }
`;

const phrases = ['back-end developer','estudante de TI no SENAI','curiosa por natureza','apaixonada por código'];

const skills = [
  {icon:'🐍',name:'Python',level:'aprendendo'},
  {icon:'☕',name:'Java',level:'aprendendo'},
  {icon:'🌐',name:'HTML & CSS',level:'intermediário'},
  {icon:'⚡',name:'JavaScript',level:'básico'},
  {icon:'⚛️',name:'React',level:'básico'},
  {icon:'🗄️',name:'SQL',level:'básico'},
  {icon:'🔧',name:'Node.js',level:'aprendendo'},
  {icon:'🐙',name:'Git & GitHub',level:'básico'},
];

const projects = [
  {icon:'📋',color:'#FF3CAC',title:'Sistema de Tarefas',desc:'Aplicação CRUD completa para gerenciamento de tarefas, com autenticação de usuários e banco de dados relacional.',tags:['Python','SQLite','Flask']},
  {icon:'🏪',color:'#784BA0',title:'Controle de Estoque',desc:'Sistema back-end para controle de estoque de uma loja, desenvolvido como projeto acadêmico no SENAI.',tags:['Java','MySQL','JDBC']},
  {icon:'🔗',color:'#FF8C00',title:'API de Encurtador de Links',desc:'API REST simples para encurtamento de URLs com redirecionamento e contagem de acessos.',tags:['Node.js','Express','JavaScript']},
];

const contactLinks = [
  {icon:'💼',bg:'rgba(10,102,194,0.15)',title:'LinkedIn',value:'linkedin.com/in/juliamatilde',href:'https://linkedin.com'},
  {icon:'🐙',bg:'rgba(255,255,255,0.05)',title:'GitHub',value:'github.com/juliamatilde',href:'https://github.com'},
  {icon:'✉️',bg:'rgba(255,60,172,0.1)',title:'E-mail',value:'julia@email.com',href:'mailto:julia@email.com'},
];

function Hero() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = phrases[phraseIdx];
    let t;
    if (typing) {
      if (displayed.length < target.length) t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
      else t = setTimeout(() => setTyping(false), 2000);
    } else {
      if (displayed.length > 0) t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      else { setPhraseIdx((phraseIdx + 1) % phrases.length); setTyping(true); }
    }
    return () => clearTimeout(t);
  }, [displayed, typing, phraseIdx]);

  return (
    <section className="hero" id="inicio">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="orb orb1" />
        <div className="orb orb2" />
      </div>
      <div className="ctr hero-content">
        <p className="hero-ey"><span className="ey-dot" />disponível para estágio &amp; CLT</p>
        <h1 className="hero-h1">
          <span className="gt">Julia Matilde</span>
          <br />Borges
          <span className="hero-role">{displayed}<span className="cur" /></span>
        </h1>
        <div className="term">
          <p className="tl"><span>~/julia</span> $ whoami</p>
          <p className="tl">Desenvolvedora · 19 anos · Santa Catarina</p>
          <p className="tl"><span>~/julia</span> $ cat paixao.txt</p>
          <p className="tl">Transformar lógica em soluções reais.</p>
        </div>
        <div className="hero-btns">
          <a href="#projetos"><button className="btn-p">ver projetos</button></a>
          <a href="#contato"><button className="btn-s">falar comigo</button></a>
        </div>
      </div>
      <div className="scroll-hint"><div className="scroll-ln" />scroll</div>
    </section>
  );
}

function About() {
  return (
    <section className="about" id="sobre">
      <div className="ctr">
        <div className="about-grid">
          <div>
            <p className="slbl">sobre mim</p>
            <h2 className="about-h2">Construindo o <span className="gt">back-end</span> do futuro</h2>
            <p className="about-p">Tenho <strong>19 anos</strong> e curso <strong>Desenvolvimento de Sistemas no SENAI</strong>, onde mergulhei de cabeça no mundo da programação. Sou movida pela curiosidade — adoro entender como as coisas funcionam por baixo dos panos.</p>
            <p className="about-p">Me interesso especialmente por <strong>back-end</strong>: lógica de servidor, bancos de dados, APIs e arquitetura de sistemas. Para mim, a beleza está no que o usuário <em>não</em> vê.</p>
            <p className="about-p">Estou em busca do meu primeiro emprego como desenvolvedora, onde possa aprender, contribuir e crescer junto com uma equipe incrível.</p>
            <div className="about-stats">
              {[['19','anos de idade'],['SENAI','formação técnica'],['4+','tecnologias'],['∞','curiosidade']].map(([n,l]) => (
                <div className="stat" key={l}><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="photo-wrap">
            <div className="accent-bar" />
            <div className="photo-frame">
              <span className="photo-icon">{'</>'}</span>
              <div className="photo-ov" />
              <div className="photo-tag">
                <div className="photo-name">Julia Matilde Borges</div>
                <div className="photo-role">back-end developer · em formação</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="ctr">
        <p className="slbl">habilidades</p>
        <h2 className="skills-h2">Minhas <span className="gt">ferramentas</span></h2>
        <div className="skills-grid">
          {skills.map(s => (
            <div className="sk" key={s.name}>
              <span className="sk-ic">{s.icon}</span>
              <span className="sk-nm">{s.name}</span>
              <span className="sk-lv">{s.level}</span>
            </div>
          ))}
        </div>
        <div className="learning-row">
          <p className="learning-ttl">próximos na fila</p>
          <div className="tags">
            {['APIs REST','Docker','Spring Boot','PostgreSQL','Linux'].map(t => <span className="tag" key={t}>{t}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="projects" id="projetos">
      <div className="ctr">
        <div className="proj-hd">
          <div>
            <p className="slbl">projetos</p>
            <h2 className="proj-h2">O que estou <span className="gt">construindo</span></h2>
          </div>
          <span className="wip-badge">em andamento</span>
        </div>
        <div className="proj-grid">
          {projects.map(p => (
            <div className="pcard" key={p.title}>
              <div className="pthumb" style={{background:`${p.color}22`}}>
                <div className="pthumb-glow" style={{background:`radial-gradient(circle,${p.color}44,transparent 70%)`}} />
                <span className="pthumb-ic">{p.icon}</span>
                <span className="pstatus">em andamento</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const handle = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); };
  return (
    <section className="contact" id="contato">
      <div className="ctr">
        <div className="contact-in">
          <div>
            <p className="slbl">contato</p>
            <h2 className="contact-h2">Vamos <span className="gt">conversar?</span></h2>
            <p className="contact-sub">Estou em busca da minha primeira oportunidade como desenvolvedora. Se sua empresa procura alguém curiosa, dedicada e ansiosa para aprender — me manda uma mensagem!</p>
            <div className="clinks">
              {contactLinks.map(l => (
                <a href={l.href} className="clink" key={l.title} target="_blank" rel="noreferrer">
                  <div className="clink-ic" style={{background:l.bg}}>{l.icon}</div>
                  <div><div className="clink-ttl">{l.title}</div><div className="clink-val">{l.value}</div></div>
                  <span className="clink-arr">→</span>
                </a>
              ))}
            </div>
          </div>
          <form className="form-col" onSubmit={handle}>
            {[['nome','text','Seu nome'],['e-mail','email','seu@email.com']].map(([lbl,type,ph]) => (
              <div className="fld" key={lbl}>
                <label className="flbl">{lbl}</label>
                <input className="finp" type={type} placeholder={ph} required />
              </div>
            ))}
            <div className="fld">
              <label className="flbl">mensagem</label>
              <textarea className="ftxt" placeholder="Olá Julia, quero conversar sobre..." required />
            </div>
            <button className="fsub" type="submit">{sent ? '✓ mensagem enviada!' : 'enviar mensagem →'}</button>
          </form>
        </div>
        <div className="footer">
          <p className="footer-cp">© 2024 · <span>Julia Matilde Borges</span></p>
          <p className="footer-md">feito com ♥ e muito café</p>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <style>{styles}</style>
      <nav className="nav">
        <div className="nav-logo"><span>julia</span>.dev</div>
        <ul className="nav-links">
          <li><a href="#sobre">sobre</a></li>
          <li><a href="#skills">skills</a></li>
          <li><a href="#projetos">projetos</a></li>
          <li><a href="#contato" className="nav-cta">contato</a></li>
        </ul>
      </nav>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}
