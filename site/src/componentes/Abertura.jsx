import { useLayoutEffect, useRef } from 'react';
import logoSvg from '../marca/logo.svg?raw';
import { calmo } from '../roteador.jsx';
import './abertura.css';

// O logo é separado em duas camadas (SILVEIRA vazado e assinatura) para animar cada uma.
const viewBox = logoSvg.match(/viewBox="([^"]+)"/)[1];
const [pathNome, pathAssinatura] = [...logoSvg.matchAll(/<path ([^>]*)\/>/g)].map(m => m[1]);
const camada = path => ({ __html: `<svg viewBox="${viewBox}" aria-hidden="true"><path ${path}/></svg>` });
// a assinatura ganha um traço por cima, um caminho por contorno: o tracejado do SVG recomeça em cada
// contorno, então só separados eles se desenham um depois do outro, na ordem das letras (C, a, u, ã)
const contornos = pathAssinatura.match(/d="([^"]+)"/)[1].split(/(?=M)/);
const camadaAssinatura = { __html: `<svg viewBox="${viewBox}" aria-hidden="true"><path class="abertura-final" ${pathAssinatura}/><g class="abertura-tracos">${
  contornos.map(d => `<path class="abertura-traco" pathLength="1" d="${d}"/>`).join('')}</g></svg>` };
const ESCRITA = { inicio: 450, duracao: 1200 };
const FIM_ESCRITA = ESCRITA.inicio + ESCRITA.duracao;
const [, , vbL, vbA] = viewBox.split(' ').map(Number);

const CHAVE = 'intro-visto';
const EASE_IO = 'cubic-bezier(.77, 0, .175, 1)';
const EASE_OUT = 'cubic-bezier(.23, 1, .32, 1)';

export const introJaVista = () => {
  try { return sessionStorage.getItem(CHAVE) === '1' || calmo(); } catch { return calmo(); }
};

export default function Abertura({ aoTerminar }) {
  const raiz = useRef(null), fundo = useRef(null), quadro = useRef(null);
  const logo = useRef(null), nome = useRef(null), assinatura = useRef(null);
  const fim = useRef(false);

  useLayoutEffect(() => {
    const html = document.documentElement;
    html.style.overflow = 'hidden';
    html.setAttribute('data-intro', ''); // o logo do topo espera escondido o voo terminar
    const anims = [];
    const anima = (el, quadros, opcoes) => { const a = el.animate(quadros, { fill: 'both', ...opcoes }); anims.push(a); return a; };

    const terminar = () => {
      if (fim.current) return;
      fim.current = true;
      try { sessionStorage.setItem(CHAVE, '1'); } catch { /* navegação privada */ }
      html.style.overflow = '';
      html.removeAttribute('data-intro');
      aoTerminar();
    };

    // 1. um quadro de navegador se desenha, o nome sobe do desfoque e a assinatura é escrita à mão
    anima(quadro.current.querySelector('rect'), [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 600, easing: EASE_IO });
    anima(quadro.current.querySelector('.abertura-pontos'), [{ opacity: 0 }, { opacity: 1 }], { duration: 200, delay: 450 });
    anima(nome.current, [
      { opacity: 0, transform: 'translateY(10%)', filter: 'blur(10px)' },
      { opacity: 1, transform: 'none', filter: 'blur(0)' },
    ], { duration: 700, delay: 150, easing: EASE_OUT });
    // a caneta anda em velocidade constante: cada contorno leva o tempo proporcional ao seu comprimento
    const tracos = [...assinatura.current.querySelectorAll('.abertura-traco')];
    const comprimentos = tracos.map(t => t.getTotalLength());
    const total = comprimentos.reduce((a, b) => a + b, 0);
    let feito = 0;
    tracos.forEach((t, i) => {
      anima(t, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
        duration: (ESCRITA.duracao * comprimentos[i]) / total, delay: ESCRITA.inicio + (ESCRITA.duracao * feito) / total, easing: 'linear',
      });
      feito += comprimentos[i];
    });
    anima(assinatura.current.querySelector('.abertura-tracos'), [{ opacity: 1 }, { opacity: 0 }], { duration: 300, delay: FIM_ESCRITA - 50, easing: EASE_OUT });
    const escrita = anima(assinatura.current.querySelector('.abertura-final'), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: FIM_ESCRITA - 150, easing: EASE_OUT });

    // 2. o logo voa até o lugar dele no topo, na frente do PORTFÓLIO, enquanto a cortina sobe
    escrita.finished.then(() => {
      if (fim.current) return;
      const alvo = document.querySelector('.ta-logo').getBoundingClientRect();
      const origem = logo.current.getBoundingClientRect();
      const s = alvo.width / origem.width;
      anima(quadro.current, [{ opacity: 1 }, { opacity: 0, transform: 'scale(.96)' }], { duration: 250, easing: EASE_OUT });
      anima(logo.current, [
        { transform: 'none' },
        { transform: `translate(${alvo.left - origem.left}px, ${alvo.top - origem.top}px) scale(${s})` },
      ], { duration: 750, delay: 60, easing: EASE_IO });
      anima(fundo.current, [{ clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(0 0 100% 0)' }], { duration: 750, delay: 60, easing: EASE_IO })
        .finished.then(terminar);
    }).catch(() => {});

    raiz.current.pular = () => {
      anims.forEach(a => a.cancel());
      raiz.current.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, easing: EASE_OUT, fill: 'forwards' }).finished.then(terminar);
    };
    return () => { anims.forEach(a => a.cancel()); html.style.overflow = ''; html.removeAttribute('data-intro'); };
  }, [aoTerminar]);

  return (
    <div ref={raiz} className="abertura" role="presentation">
      <div ref={fundo} className="abertura-fundo" />
      <svg ref={quadro} className="abertura-quadro" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
        <rect x="1" y="1" width="998" height="618" rx="14" pathLength="1" />
        <g className="abertura-pontos"><circle cx="26" cy="24" r="5" /><circle cx="44" cy="24" r="5" /><circle cx="62" cy="24" r="5" /></g>
      </svg>
      <div ref={logo} className="abertura-logo" style={{ aspectRatio: `${vbL} / ${vbA}` }}>
        <div ref={nome} className="abertura-camada" dangerouslySetInnerHTML={camada(pathNome)} />
        <div ref={assinatura} className="abertura-camada" dangerouslySetInnerHTML={camadaAssinatura} />
      </div>
      <button type="button" className="abertura-pular" onClick={() => raiz.current.pular()}>Pular</button>
    </div>
  );
}
