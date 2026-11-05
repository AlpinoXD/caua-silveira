import { useEffect, useRef } from 'react';
import { WHATSAPP, TELEFONE } from '../contato.js';
import { Link } from '../roteador.jsx';
import TituloFoco from './TituloFoco.jsx';
import './secoes.css';

const Titulo = ({ n, rotulo, children }) => (
  <header className="secao-titulo">
    <p className="rotulo" data-revelar><b>{n}</b> · {rotulo}</p>
    <h2 className="condensada" data-revelar style={{ '--i': 1 }}>{children}</h2>
  </header>
);

// Cada etapa tem uma cena própria que conta o que ela é; acontece no hover, no foco
// e, no toque, quando o card aparece na tela.
const PASSOS = [
  {
    nome: 'Conversa', texto: 'Entendo o seu negócio, o seu cliente e o que o site precisa resolver.',
    cena: <div className="cena cena-conversa"><span className="balao">Oi! Tenho uma padaria…</span><span className="balao balao-eu"><i /><i /><i /></span></div>,
  },
  {
    nome: 'Direção', texto: 'Defino a identidade visual e a estrutura das páginas antes de qualquer código.',
    cena: <div className="cena cena-direcao">{['#73030D', '#D11A2A', '#F2F2F2', '#8C8C8C'].map((c, i) => <span key={c} style={{ '--c': c, '--i': i }} />)}</div>,
  },
  {
    nome: 'Construção', texto: 'Desenvolvo o site rápido, bonito no celular e fácil de atualizar.',
    cena: <div className="cena cena-codigo"><b>&lt;/&gt;</b>{[70, 45, 85, 55].map((w, i) => <span key={i} style={{ '--w': `${w}%`, '--i': i }} />)}</div>,
  },
  {
    nome: 'No ar', texto: 'Publico, testo no celular e no computador e entrego tudo funcionando.',
    cena: <div className="cena cena-noar"><span className="barra"><i /></span><span className="status"><i />no ar</span></div>,
  },
];

export function Processo() {
  return (
    <section id="processo" className="secao">
      <Titulo n="02" rotulo="Processo">Do rascunho ao site no ar</Titulo>
      <ol className="passos">
        {PASSOS.map((p, i) => (
          <li key={p.nome} className="passo" tabIndex={0} data-revelar style={{ '--i': i }}>
            <span className="passo-numero">{String(i + 1).padStart(2, '0')}</span>
            {p.cena}
            <h3 className="condensada">{p.nome}</h3>
            <p>{p.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

// As palavras acendem conforme a frase atravessa a tela.
const SOBRE = 'Cuido de cada etapa do site, da identidade visual ao código, e trabalho direto com quem toca o negócio, sem intermediários. O resultado é um site com a cara de quem ele representa, e não de um modelo pronto.';

export function Sobre() {
  const frase = useRef(null);
  useEffect(() => {
    const palavras = [...frase.current.children];
    let pedido = 0, acesas = -1;
    const atualizar = () => {
      pedido = 0;
      const r = frase.current.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35)));
      const n = Math.round(p * palavras.length);
      if (n === acesas) return;
      palavras.forEach((w, i) => w.toggleAttribute('data-acesa', i < n));
      acesas = n;
    };
    const pedir = () => { if (!pedido) pedido = requestAnimationFrame(atualizar); };
    atualizar();
    addEventListener('scroll', pedir, { passive: true });
    return () => { removeEventListener('scroll', pedir); cancelAnimationFrame(pedido); };
  }, []);

  return (
    <section id="sobre" className="secao">
      <Titulo n="03" rotulo="Sobre">Quem faz o seu site</Titulo>
      <p ref={frase} className="sobre-frase">
        {SOBRE.split(' ').map((w, i) => <span key={i}>{w} </span>)}
      </p>
      <ul className="sobre-etapas" data-revelar>
        {['Identidade visual', 'Textos', 'Layout', 'Código', 'Publicação'].map(t => <li key={t}>{t}</li>)}
      </ul>
    </section>
  );
}

export function Contato() {
  return (
    <section id="contato" className="secao contato">
      <div className="contato-luz" aria-hidden="true" />
      <p className="rotulo" data-revelar><b>04</b> · Contato</p>
      <TituloFoco />
      <div className="contato-rodape">
        <p className="contato-texto" data-revelar>Me chama no WhatsApp e conta sobre o seu negócio.</p>
        <div className="contato-acoes" data-revelar style={{ '--i': 1 }}>
          <a className="botao botao-grande" href={WHATSAPP} target="_blank" rel="noopener">Chamar no WhatsApp</a>
          <span className="contato-numero">{TELEFONE}</span>
        </div>
      </div>
    </section>
  );
}

export function Rodape() {
  return (
    <footer className="rodape">
      <img src="/marca/monograma.svg" alt="" width="40" height="40" />
      <p>© 2026 Cauã Silveira · Criação de sites</p>
      <Link href="/#inicio">Voltar ao topo ↑</Link>
    </footer>
  );
}
