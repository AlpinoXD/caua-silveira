import { projetos, imagem } from '../dados/projetos.js';
import { Link, usarRevelar } from '../roteador.jsx';
import { Contato } from '../componentes/Secoes.jsx';
import './projeto.css';

export default function Projeto({ slug }) {
  const i = projetos.findIndex(p => p.slug === slug);
  usarRevelar(slug);
  if (i < 0) {
    return (
      <section className="projeto projeto-vazio">
        <h1 className="condensada">Projeto não encontrado</h1>
        <Link className="botao botao-claro" href="/#projetos">Ver todos os projetos</Link>
      </section>
    );
  }
  const p = projetos[i];
  const proximo = projetos[(i + 1) % projetos.length];
  const galeria = p.galeria ?? p.telas;

  return (
    <>
      <article className="projeto">
        <Link className="projeto-voltar" href="/#projetos">← Todos os projetos</Link>
        <header className="projeto-cabeca">
          <p className="rotulo" data-revelar>
            <b>{String(i + 1).padStart(2, '0')}</b> / {String(projetos.length).padStart(2, '0')}
            {p.conceito && <em className="vitrine-tag">Conceito</em>}
          </p>
          <h1 className="condensada" data-revelar style={{ '--i': 1 }}>{p.nome}</h1>
          <p className="projeto-tipo" data-revelar style={{ '--i': 2 }}>{p.tipo} · {p.local}</p>
          <p className="projeto-descricao" data-revelar style={{ '--i': 3 }}>{p.descricao ?? p.resumo}</p>
          {p.conceito && (
            <p className="projeto-aviso" data-revelar style={{ '--i': 4 }}>
              Projeto conceito, criado para mostrar estilo e possibilidades. Não é o site de um cliente real.
            </p>
          )}
          {p.link && (
            <a className="botao" href={p.link} target="_blank" rel="noopener" data-revelar style={{ '--i': 4 }}>
              Ver o site no ar ↗
            </a>
          )}
        </header>

        <div className="projeto-galeria">
          {galeria.map((tela, k) => (
            <figure key={tela} className="projeto-tela" data-revelar>
              <span className="vitrine-chrome" aria-hidden="true"><i /><i /><i /><span className="vitrine-endereco">{p.endereco}</span></span>
              <img src={imagem(p, tela)} alt={`${p.nome}, tela ${k + 1}`} width="1600" height="1000" loading={k < 2 ? 'eager' : 'lazy'} decoding="async" />
            </figure>
          ))}
        </div>

        {p.celular && (
          <section className="projeto-celular" aria-label="No celular">
            <p className="rotulo" data-revelar>No celular</p>
            <div className="projeto-celulares">
              {p.celular.map((tela, k) => (
                <figure key={tela} className="celular" data-revelar style={{ '--i': k }}>
                  <img src={imagem(p, tela)} alt={`${p.nome} no celular, tela ${k + 1}`} width="600" height="1299" loading="lazy" decoding="async" />
                </figure>
              ))}
            </div>
          </section>
        )}

        <Link className="projeto-proximo" href={`/projetos/${proximo.slug}`}>
          <span className="rotulo">Próximo projeto</span>
          <span className="condensada">{proximo.nome} →</span>
        </Link>
      </article>
      <Contato />
    </>
  );
}
