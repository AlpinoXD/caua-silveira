import { useLayoutEffect, useRef, useState } from 'react';

// Inspirado no TrueFocus do React Bits, mas legível sem interação: a moldura de cantos vermelhos
// fica no SEU; passar o mouse (ou tocar) leva a moldura a outra palavra e esmaece o resto.
const SEU = 1;
const FOLGA = 10; // px entre a palavra e os cantos da moldura

export default function TituloFoco() {
  const moldura = useRef(null), els = useRef([]);
  const [mao, setMao] = useState(null); // palavra sob o cursor ou o dedo
  const foco = mao ?? SEU;

  useLayoutEffect(() => {
    const posicionar = () => {
      const el = els.current[foco], m = moldura.current;
      m.style.transform = `translate(${el.offsetLeft - FOLGA}px, ${el.offsetTop - FOLGA}px)`;
      m.style.width = `${el.offsetWidth + FOLGA * 2}px`;
      m.style.height = `${el.offsetHeight + FOLGA * 2}px`;
    };
    posicionar();
    document.fonts?.ready.then(posicionar); // a fonte muda o tamanho das palavras depois de carregar
    addEventListener('resize', posicionar);
    return () => removeEventListener('resize', posicionar);
  }, [foco]);

  const palavra = (i, texto, classe) => (
    <span
      ref={el => (els.current[i] = el)}
      className={`${classe} condensada`}
      data-palavra
      data-foco={i === foco || undefined}
      aria-hidden="true"
      onPointerEnter={() => setMao(i)}
    >
      {texto}
    </span>
  );

  return (
    <h2 className="contato-titulo foco" data-mao={mao !== null || undefined} aria-label="Vamos fazer o seu site?" onPointerLeave={() => setMao(null)}>
      {palavra(0, 'Vamos fazer o', 'contato-pre')}
      <span className="contato-linha">
        {palavra(SEU, 'SEU', 'contato-seu')}
        {palavra(2, 'site?', 'contato-pos')}
      </span>
      <span ref={moldura} className="foco-moldura" aria-hidden="true"><i /><i /><i /><i /></span>
    </h2>
  );
}
