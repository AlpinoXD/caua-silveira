// Para adicionar um projeto: acrescente um item aqui e as telas em public/projetos/<slug>/.
// A ordem da lista é a ordem da vitrine. Projetos conceito vão por último e levam conceito: true.
export const projetos = [
  {
    slug: 'villa-serrana',
    nome: 'Estalagem Villa Serrana',
    tipo: 'Guia digital do hóspede',
    local: 'Vacas Gordas, Urubici (SC)',
    resumo: 'O guia que o hóspede abre no celular e encontra tudo para a estadia.',
    link: 'https://villa-serrana-guia.netlify.app',
    endereco: 'villa-serrana-guia.netlify.app',
    descricao: 'Um guia digital para os hóspedes da Estalagem Villa Serrana. Reúne o chalé, os horários, a lenha, os mirantes e onde comer bem por perto. Tem um mapa interativo da serra e uma maquete 3D do chalé, que dá para girar e ver à noite, com a lareira acesa.',
    telas: ['desktop-01-inicio', 'desktop-03-chale', 'desktop-04-maquete', 'desktop-05-andar'],
    galeria: ['desktop-01-inicio', 'desktop-02-rapidas', 'desktop-03-chale', 'desktop-04-maquete', 'desktop-05-andar', 'desktop-06-cuidados', 'desktop-07-perguntas', 'desktop-08-contato'],
    celular: ['mobile-01-inicio', 'mobile-02-rapidas', 'mobile-03-chale', 'mobile-04-maquete'],
  },
  {
    slug: 'fermento-e-forno',
    nome: 'Fermento & Forno',
    tipo: 'Site de padaria artesanal',
    local: 'Projeto conceito',
    resumo: 'Cardápio do dia, encomendas e o forno a lenha como protagonista.',
    endereco: 'fermentoeforno.com.br',
    conceito: true,
    pasta: 'conceitos',
    telas: ['padaria-1', 'padaria-2'],
  },
  {
    slug: 'navalha',
    nome: 'Navalha Barbearia',
    tipo: 'Site com agenda',
    local: 'Projeto conceito',
    resumo: 'Serviços, preços e horários livres a um toque de distância.',
    endereco: 'navalhabarbearia.com.br',
    conceito: true,
    pasta: 'conceitos',
    telas: ['barbearia-1', 'barbearia-2'],
  },
  {
    slug: 'raiz-fisioterapia',
    nome: 'Raiz Fisioterapia',
    tipo: 'Site de clínica',
    local: 'Projeto conceito',
    resumo: 'Tratamentos explicados com calma e a avaliação marcada em dois cliques.',
    endereco: 'raizfisioterapia.com.br',
    conceito: true,
    pasta: 'conceitos',
    telas: ['clinica-1', 'clinica-2'],
  },
];

// projetos conceito usam o resumo como descrição; a página avisa que é um conceito
export const imagem = (p, tela) => `/projetos/${p.pasta ?? p.slug}/${tela}.webp`;
