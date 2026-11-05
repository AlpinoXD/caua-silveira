import { useCallback, useEffect, useState } from 'react';
import Cabecalho from './componentes/Cabecalho.jsx';
import Abertura, { introJaVista } from './componentes/Abertura.jsx';
import { Rodape } from './componentes/Secoes.jsx';
import Inicio from './paginas/Inicio.jsx';
import Projeto from './paginas/Projeto.jsx';
import { usarRota, registrarCortina } from './roteador.jsx';
import letrasCS from './marca/monograma-letras.svg?raw';

export default function App() {
  const rota = usarRota();
  const [intro, setIntro] = useState(() => !introJaVista() && rota === '/');
  const fimIntro = useCallback(() => setIntro(false), []);

  // chegou por um link com âncora (/#processo): rola até a seção depois de montar
  useEffect(() => {
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
  }, []);

  const slug = rota.match(/^\/projetos\/([^/]+)\/?$/)?.[1];

  return (
    <>
      <Cabecalho />
      <main>{slug ? <Projeto key={slug} slug={slug} /> : <Inicio />}</main>
      <Rodape />
      <div ref={registrarCortina} className="cortina" aria-hidden="true" dangerouslySetInnerHTML={{ __html: letrasCS }} />
      {intro && <Abertura aoTerminar={fimIntro} />}
    </>
  );
}
