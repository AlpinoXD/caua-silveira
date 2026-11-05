import Topo from '../componentes/Topo.jsx';
import Vitrine from '../componentes/Vitrine.jsx';
import { Processo, Sobre, Contato } from '../componentes/Secoes.jsx';
import { usarRevelar } from '../roteador.jsx';

export default function Inicio() {
  usarRevelar('inicio');
  return (
    <>
      <Topo />
      <section id="projetos" className="projetos-abertura">
        <p className="rotulo" data-revelar><b>01</b> · Projetos</p>
        <h2 className="condensada" data-revelar style={{ '--i': 1 }}>Trabalho selecionado</h2>
        <p className="projetos-dica" data-revelar style={{ '--i': 2 }}>Role para girar a roda. Clique num card para ver o projeto inteiro.</p>
      </section>
      <Vitrine />
      <Processo />
      <Sobre />
      <Contato />
    </>
  );
}
