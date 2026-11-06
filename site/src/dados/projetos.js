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
    slug: 'mundo-dos-aromas',
    nome: 'Mundo dos Aromas',
    tipo: 'Catálogo de atacado',
    local: 'Santa Catarina',
    resumo: 'O lojista cadastra o CNPJ e vê os preços de atacado em todo o catálogo.',
    link: 'https://mundo-dos-aromas.netlify.app',
    endereco: 'mundo-dos-aromas.netlify.app',
    descricao: 'Um catálogo de atacado de incensos, velas, óleos essenciais, sabonetes e incensários para lojas e revendedores. As categorias giram numa roda que dá para arrastar, as marcas têm uma lista própria e o catálogo tem filtros por categoria e por marca. Os preços aparecem para quem cadastra o CNPJ da loja, e o pedido sai pelo site ou pelo WhatsApp.',
    telas: ['desktop-01-inicio', 'desktop-02-categorias', 'desktop-03-marcas', 'desktop-05-produtos'],
    galeria: ['desktop-01-inicio', 'desktop-02-categorias', 'desktop-03-marcas', 'desktop-04-marcas-lista', 'desktop-05-produtos'],
    celular: ['mobile-01-inicio', 'mobile-02-categorias', 'mobile-03-marcas', 'mobile-04-produtos'],
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
