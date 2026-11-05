import { useEffect, useRef } from 'react';
import { Link, calmo } from '../roteador.jsx';
import { WHATSAPP } from '../contato.js';
import './topo.css';

// Luz que segue o cursor (ou o dedo) com uma fumaça vinho que deixa rastro.
// `acesa` recebe as coordenadas da luz em --x/--y.
function usarLuz(secao, tela, acesa) {
  useEffect(() => {
    if (calmo()) return;
    const el = secao.current, cv = tela.current, ctx = cv.getContext('2d');
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    let w = 0, h = 0, visivel = true, quadro = 0, ultimoToque = -1e9, tique = 0;
    const alvo = { x: 0, y: 0 }, luz = { x: 0, y: 0 }, anterior = { x: 0, y: 0 };
    const fumaca = [];

    const medir = () => {
      w = el.clientWidth; h = el.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    medir();
    alvo.x = luz.x = anterior.x = w * 0.62; alvo.y = luz.y = anterior.y = h * 0.45;

    const mover = (x, y) => { const r = el.getBoundingClientRect(); alvo.x = x - r.left; alvo.y = y - r.top; ultimoToque = performance.now(); };
    const aoMover = e => mover(e.clientX, e.clientY);
    const aoTocar = e => { const t = e.touches[0]; if (t) mover(t.clientX, t.clientY); };

    const passo = t => {
      quadro = 0;
      if (!visivel) return;
      // sem interação há 2,5 s, a luz passeia sozinha numa curva lenta
      if (t - ultimoToque > 2500) {
        const k = t / 1000;
        alvo.x = w * (0.5 + 0.32 * Math.sin(k * 0.35));
        alvo.y = h * (0.42 + 0.16 * Math.sin(k * 0.53 + 1));
      }
      luz.x += (alvo.x - luz.x) * 0.16;
      luz.y += (alvo.y - luz.y) * 0.16;
      if (acesa?.current) {
        acesa.current.style.setProperty('--x', `${luz.x}px`);
        acesa.current.style.setProperty('--y', `${luz.y}px`);
      }

      tique++;
      // solta fumaça proporcional ao deslocamento; parada, só um fio a cada poucos quadros (senão vira um ponto quente)
      const dist = Math.hypot(luz.x - anterior.x, luz.y - anterior.y);
      const n = dist < 1.5 ? (tique % 4 === 0 ? 1 : 0) : Math.min(4, 1 + Math.floor(dist / 14));
      for (let i = 0; i < n && fumaca.length < 140; i++) {
        const f = (i + 1) / n;
        fumaca.push({
          x: anterior.x + (luz.x - anterior.x) * f + (Math.random() - 0.5) * 16,
          y: anterior.y + (luz.y - anterior.y) * f + (Math.random() - 0.5) * 16,
          r: 50 + Math.random() * 40, vida: 1, vx: (Math.random() - 0.5) * 0.4, vy: -0.3 - Math.random() * 0.4,
        });
      }
      anterior.x = luz.x; anterior.y = luz.y;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (let i = fumaca.length - 1; i >= 0; i--) {
        const p = fumaca[i];
        p.x += p.vx; p.y += p.vy; p.r += 1.1; p.vida -= 0.008;
        if (p.vida <= 0) { fumaca.splice(i, 1); continue; }
        const a = p.vida * p.vida * 0.045;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, `rgba(209, 26, 42, ${a * 0.6})`);
        g.addColorStop(0.45, `rgba(115, 3, 13, ${a * 0.7})`);
        g.addColorStop(1, 'rgba(115, 3, 13, 0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      quadro = requestAnimationFrame(passo);
    };

    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      if (visivel && !quadro) quadro = requestAnimationFrame(passo);
    });
    io.observe(el);
    el.addEventListener('pointermove', aoMover);
    el.addEventListener('touchmove', aoTocar, { passive: true });
    addEventListener('resize', medir);
    quadro = requestAnimationFrame(passo);
    return () => {
      io.disconnect(); cancelAnimationFrame(quadro);
      el.removeEventListener('pointermove', aoMover);
      el.removeEventListener('touchmove', aoTocar);
      removeEventListener('resize', medir);
    };
  }, []);
}

const Palavra = ({ acesa, className = '' }) => (
  <div className={`topo-palavra ${className}`} aria-hidden="true">
    <span className="condensada">Portfólio</span>
    <span ref={acesa} className="condensada topo-acesa">Portfólio</span>
  </div>
);

const Acoes = ({ i = 3 }) => (
  <div className="topo-acoes" data-revelar style={{ '--i': i }}>
    <Link className="botao botao-claro" href="/#projetos">Ver projetos</Link>
    <a className="botao" href={WHATSAPP} target="_blank" rel="noopener">Chamar no WhatsApp</a>
  </div>
);

const APRESENTACAO = 'Eu sou o Cauã Silveira. Crio sites estéticos, rápidos e feitos para quem visita virar cliente.';
const SERVICOS = ['Sites institucionais', 'Guias digitais', 'Páginas de venda', 'Identidade visual'];

// A · Pôster: PORTFÓLIO ocupa a largura toda e acende cheio de vermelho onde a luz passa;
// o logo grande cruza a palavra, como o nome sobre o cartaz da referência.
export function TopoPoster({ id }) {
  const secao = useRef(null), tela = useRef(null), acesa = useRef(null), logo = useRef(null);
  usarLuz(secao, tela, acesa);

  // enquanto o logo grande aparece, o do cabeçalho some (os dois juntos repetiriam o nome)
  useEffect(() => {
    const html = document.documentElement;
    const io = new IntersectionObserver(([e]) => html.toggleAttribute('data-logo-no-topo', e.isIntersecting), { rootMargin: '-84px 0px 0px 0px' });
    io.observe(logo.current);
    return () => { io.disconnect(); html.removeAttribute('data-logo-no-topo'); };
  }, []);

  return (
    <section ref={secao} id={id} className="topo topo-a">
      <canvas ref={tela} className="topo-fumaca" aria-hidden="true" />
      <Palavra acesa={acesa} className="ta-palavra" />
      <img ref={logo} className="ta-logo" src="/marca/logo.svg" alt="Cauã Silveira" width="720" height="258" />
      <div className="ta-base">
        <div className="topo-conteudo">
          <p className="rotulo" data-revelar>Criação de sites para pequenos negócios</p>
          <h1 className="condensada" data-revelar style={{ '--i': 1 }}>Seu negócio, <span>apresentado como merece.</span></h1>
          <p className="topo-texto" data-revelar style={{ '--i': 2 }}>{APRESENTACAO}</p>
          <Acoes />
        </div>
        <ol className="ta-lista" data-revelar style={{ '--i': 2 }}>
          {SERVICOS.map((s, i) => <li key={s}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>)}
        </ol>
      </div>
    </section>
  );
}

export default function Topo() {
  return <TopoPoster id="inicio" />;
}
