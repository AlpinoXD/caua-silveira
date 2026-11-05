import { forwardRef, useEffect, useState } from 'react';

// Roteador mínimo com pushState e uma cortina entre páginas.
export const calmo = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const EASE = 'cubic-bezier(.77, 0, .175, 1)';
const EASE_OUT = 'cubic-bezier(.23, 1, .32, 1)';
const ouvintes = new Set();
let cortina = null;
export const registrarCortina = el => { cortina = el; };

export function usarRota() {
  const [rota, setRota] = useState(location.pathname);
  useEffect(() => {
    const atualizar = () => setRota(location.pathname);
    ouvintes.add(atualizar);
    addEventListener('popstate', atualizar);
    return () => { ouvintes.delete(atualizar); removeEventListener('popstate', atualizar); };
  }, []);
  return rota;
}

const doisQuadros = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
const rolarPara = (id, suave) => {
  const el = id && document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: suave && !calmo() ? 'smooth' : 'auto' });
  else scrollTo(0, 0);
};

let navegando = false;
export async function navegar(url) {
  const [caminho, ancora] = url.split('#');
  const destino = caminho || location.pathname;
  if (destino === location.pathname) { // mesma página: só rola
    history.replaceState(null, '', ancora ? `#${ancora}` : destino);
    rolarPara(ancora, true);
    return;
  }
  if (navegando) return;
  navegando = true;
  const anima = cortina && !calmo();
  // o CS se desenha enquanto a cortina cobre e se apaga (o traço segue em frente) enquanto ela sobe
  const tracos = anima ? [...cortina.querySelectorAll('path')] : [];
  const letraC = anima && cortina.querySelector('.c');
  const anim = (el, quadros, opcoes) => el.animate(quadros, { fill: 'forwards', ...opcoes });
  if (anima) {
    await Promise.all([
      anim(cortina, [{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }], { duration: 380, easing: EASE }),
      ...tracos.map((p, i) => anim(p, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 420, delay: 160 + i * 60, easing: EASE_OUT })),
      anim(letraC, [{ fillOpacity: 0 }, { fillOpacity: 1 }], { duration: 160, delay: 500, easing: EASE_OUT }),
    ].map(a => a.finished));
  }
  history.pushState(null, '', url);
  ouvintes.forEach(f => f());
  await doisQuadros();
  rolarPara(ancora, false);
  if (anima) {
    tracos.forEach(p => anim(p, [{ strokeDashoffset: 0 }, { strokeDashoffset: -1 }], { duration: 300, easing: EASE }));
    anim(letraC, [{ fillOpacity: 1 }, { fillOpacity: 0 }], { duration: 140, easing: EASE_OUT });
    await anim(cortina, [{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }], { duration: 520, delay: 180, easing: EASE }).finished;
    cortina.getAnimations({ subtree: true }).forEach(a => a.cancel()); // volta ao estado inicial, fora da tela
  }
  navegando = false;
}

export const Link = forwardRef(function Link({ href, children, onClick, ...resto }, ref) {
  return (
    <a
      ref={ref}
      href={href}
      onClick={e => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
        e.preventDefault();
        navegar(href);
      }}
      {...resto}
    >
      {children}
    </a>
  );
});

// Revela na rolagem os elementos com data-revelar, uma vez só.
export function usarRevelar(dep) {
  useEffect(() => {
    const io = new IntersectionObserver(entradas => entradas.forEach(e => {
      if (e.isIntersecting) { e.target.setAttribute('data-visivel', ''); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('[data-revelar]:not([data-visivel])').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}
