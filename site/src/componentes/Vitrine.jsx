import { useLayoutEffect, useRef, useState } from 'react';
import { projetos, imagem } from '../dados/projetos.js';
import { Link } from '../roteador.jsx';
import './vitrine.css';

// Cada tela de cada projeto vira um card preso a uma roda que gira com a rolagem.
const cards = projetos.flatMap((p, pi) => p.telas.map((tela, ti) => ({ p, pi, tela, ti })));
const N = cards.length;
const ROLAGEM_POR_CARD = 55; // vh de rolagem para avançar um card
const primeiroCard = projetos.map((_, pi) => cards.findIndex(c => c.pi === pi));
const calmo = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Vitrine() {
  const secao = useRef(null);
  const els = useRef([]);
  const veus = useRef([]);
  const barra = useRef(null);
  const focoRef = useRef(-1);
  const [foco, setFoco] = useState(0);

  useLayoutEffect(() => {
    let pedido = 0;
    let cw = 0, ch = 0;
    const medir = () => { const c = els.current[0]; cw = c.offsetWidth; ch = c.offsetHeight; };

    const atualizar = () => {
      pedido = 0;
      const el = secao.current;
      const vw = innerWidth, vh = innerHeight;
      const total = el.offsetHeight - vh;
      const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total));
      const pos = p * (N - 1);
      const estreito = vw < 820;
      // no computador a roda gira em pé, com o centro fora da tela à esquerda;
      // no celular vira um leque deitado, com o centro abaixo da tela
      const R = estreito ? vh * 1.1 : vh * 1.25;
      const passo = estreito ? 0.3 : 0.33;
      const fx = estreito ? vw / 2 : vw * 0.36;
      const fy = estreito ? vh * 0.4 : vh * 0.52;

      for (let i = 0; i < N; i++) {
        const d = i - pos, ad = Math.abs(d), a = d * passo;
        const x = estreito ? fx + R * Math.sin(a) : fx - R * (1 - Math.cos(a));
        const y = estreito ? fy + R * (1 - Math.cos(a)) : fy + R * Math.sin(a);
        const s = 1 - Math.min(ad, 3) * 0.1;
        const c = els.current[i];
        c.style.transform = `translate3d(${x - cw / 2}px, ${y - ch / 2}px, 0) rotate(${a}rad) scale(${s})`;
        c.style.opacity = ad > 3.5 ? 0 : 1;
        c.style.zIndex = String(100 - Math.round(ad * 10));
        veus.current[i].style.opacity = String(Math.min(ad, 1.6) * 0.45);
        const emFoco = ad < 0.5;
        if (c.hasAttribute('data-foco') !== emFoco) c.toggleAttribute('data-foco', emFoco);
      }
      barra.current.style.transform = `scaleY(${p})`;
      const f = Math.round(pos);
      if (f !== focoRef.current) { focoRef.current = f; setFoco(f); }
    };

    const pedir = () => { if (!pedido) pedido = requestAnimationFrame(atualizar); };
    const redimensionar = () => { medir(); pedir(); };
    medir(); atualizar();
    addEventListener('scroll', pedir, { passive: true });
    addEventListener('resize', redimensionar);
    return () => {
      removeEventListener('scroll', pedir);
      removeEventListener('resize', redimensionar);
      cancelAnimationFrame(pedido);
    };
  }, []);

  const irPara = i => {
    const el = secao.current;
    const total = el.offsetHeight - innerHeight;
    const topo = el.getBoundingClientRect().top + scrollY;
    scrollTo({ top: topo + (i / (N - 1)) * total, behavior: calmo() ? 'auto' : 'smooth' });
  };

  const atual = cards[foco];
  const proj = atual.p;

  return (
    <section ref={secao} className="vitrine" style={{ height: `calc(${(N - 1) * ROLAGEM_POR_CARD}vh + 100svh)` }} aria-label="Projetos">
      <div className="vitrine-palco">
        <div className="vitrine-luz" aria-hidden="true" />

        {cards.map((c, i) => {
          const focado = i === foco;
          return (
            <Link
              key={`${c.p.slug}-${c.tela}`}
              ref={el => (els.current[i] = el)}
              className="vitrine-card"
              href={`/projetos/${c.p.slug}`}
              onClick={e => { if (!focado) { e.preventDefault(); irPara(i); } }}
              aria-label={`${c.p.nome}, tela ${c.ti + 1} de ${c.p.telas.length}${focado ? ', abrir o projeto' : ''}`}
            >
              <span className="vitrine-chrome" aria-hidden="true">
                <i /><i /><i />
                <span className="vitrine-endereco">{c.p.endereco}</span>
                {c.p.conceito && <span className="vitrine-tag">Conceito</span>}
              </span>
              <span className="vitrine-tela">
                <img src={imagem(c.p, c.tela)} alt="" width="1600" height="1000" decoding="async" />
              </span>
              <span ref={el => (veus.current[i] = el)} className="vitrine-veu" aria-hidden="true" />
            </Link>
          );
        })}

        <div className="vitrine-progresso" aria-hidden="true"><span ref={barra} /></div>

        <aside className="vitrine-info" aria-live="polite">
          <div key={proj.slug} className="vitrine-info-conteudo">
            <span className="rotulo">
              <b>{String(atual.pi + 1).padStart(2, '0')}</b> / {String(projetos.length).padStart(2, '0')}
              {proj.conceito && <em className="vitrine-tag">Conceito</em>}
            </span>
            <h2 className="condensada">{proj.nome}</h2>
            <p className="vitrine-tipo">{proj.tipo} · {proj.local}</p>
            <p className="vitrine-resumo">{proj.resumo}</p>
            <div className="vitrine-acoes">
              <Link className="vitrine-abrir" href={`/projetos/${proj.slug}`}>
                Ver projeto <span aria-hidden="true">→</span>
              </Link>
              {proj.link && <a className="vitrine-externo" href={proj.link} target="_blank" rel="noopener">Site no ar ↗</a>}
            </div>
          </div>
          <p className="vitrine-contador">tela {atual.ti + 1} de {proj.telas.length}</p>
          <nav className="vitrine-lista" aria-label="Ir para projeto">
            {projetos.map((p, pi) => (
              <button key={p.slug} type="button" aria-current={pi === atual.pi} onClick={() => irPara(primeiroCard[pi])}>
                <span>{String(pi + 1).padStart(2, '0')}</span>{p.nome}
              </button>
            ))}
          </nav>
        </aside>
      </div>
    </section>
  );
}
