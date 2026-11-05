import { useEffect, useRef, useState } from 'react';
import { Link } from '../roteador.jsx';
import { WHATSAPP } from '../contato.js';

const LINKS = [['/#projetos', 'Projetos'], ['/#processo', 'Processo'], ['/#sobre', 'Sobre']];

export default function Cabecalho() {
  const [aberto, setAberto] = useState(false);
  const menu = useRef(null);

  useEffect(() => {
    if (!aberto) return;
    const fechar = e => {
      if (e.key === 'Escape' || (e.type === 'pointerdown' && !menu.current.contains(e.target))) setAberto(false);
    };
    addEventListener('keydown', fechar);
    addEventListener('pointerdown', fechar);
    return () => { removeEventListener('keydown', fechar); removeEventListener('pointerdown', fechar); };
  }, [aberto]);

  const fecha = () => setAberto(false);

  return (
    <header className="cabecalho">
      <Link className="logo" href="/" aria-label="Cauã Silveira, início" onClick={fecha}>
        <img className="logo-completo" src="/marca/logo.svg" alt="" width="200" height="72" />
        <img className="logo-mono" src="/marca/monograma.svg" alt="" width="44" height="44" />
      </Link>
      <div className="cab-direita" ref={menu}>
        <nav className="cab-links" data-aberto={aberto || undefined} aria-label="Seções">
          {LINKS.map(([href, nome], i) => (
            <Link key={href} href={href} onClick={fecha} style={{ '--i': i }}>{nome}</Link>
          ))}
        </nav>
        <button type="button" className="cab-menu" aria-expanded={aberto} aria-label={aberto ? 'Fechar menu' : 'Abrir menu'} onClick={() => setAberto(a => !a)}>
          <span /><span />
        </button>
        <a className="btn-whats" href={WHATSAPP} target="_blank" rel="noopener">
          <span className="ponto" aria-hidden="true" />WhatsApp
        </a>
      </div>
    </header>
  );
}
