---
schema: marca/1
cliente: Cauã Silveira
slug: caua-silveira
setor: Criação de sites para pequenos negócios
origem: existente
versao: "1.1"
data: 2026-11-04
objetivo_site: Mostrar com elegância os melhores sites já feitos e levar o visitante a chamar no WhatsApp.

cores:
  - papel: fundo
    nome: Preto-carvão
    hex: "#0D0D0D"
    uso: Fundo geral do site. A marca é predominantemente escura.
  - papel: texto
    nome: Branco-gelo
    hex: "#F2F2F2"
    uso: Texto principal sobre o escuro e fundo das poucas seções claras que servem para ressaltar algo.
  - papel: primaria
    nome: Vinho profundo
    hex: "#73030D"
    uso: Luz da marca. Degradês radiais sobre o preto, superfícies de destaque e botões com texto branco-gelo. Nunca como texto sobre o preto.
  - papel: secundaria
    nome: Vinho rosado
    hex: "#732F3B"
    uso: Superfícies secundárias, estados de hover e bordas ativas. Nunca como texto sobre o preto.
  - papel: acento
    nome: Vermelho aceso
    hex: "#D11A2A"
    uso: Títulos grandes, números, ícones e o botão de WhatsApp. Sobre o preto, só em texto grande (a partir de 24 px, ou 19 px em negrito).
  - papel: apoio
    nome: Cinza-concreto
    hex: "#8C8C8C"
    uso: Texto secundário, legendas e linhas divisórias sobre o escuro. Não usar como texto sobre o branco-gelo.

pares:
  - {texto: texto, fundo: fundo}
  - {texto: apoio, fundo: fundo}
  - {texto: acento, fundo: fundo}
  - {texto: texto, fundo: acento}
  - {texto: texto, fundo: primaria}
  - {texto: texto, fundo: secundaria}
  - {texto: fundo, fundo: texto}
  - {texto: primaria, fundo: texto}

tipografia:
  - papel: titulo
    familia: Archivo ExtraCondensed
    classe: sans
    pesos: [800, 900]
    fonte: Google Fonts, família Archivo (licença OFL, uso comercial liberado)
    uso: Títulos e números grandes, sempre em caixa alta. No site, carregar a Archivo variável do Google Fonts e usar font-stretch 62.5% (eixo wdth 62).
    arquivo: assets/fonts/ArchivoExtraCondensed.ttf
  - papel: corpo
    familia: Archivo
    classe: sans
    pesos: [400, 500, 600]
    fonte: Google Fonts (licença OFL, uso comercial liberado)
    uso: Texto corrido, menus e botões, na largura normal.
    arquivo: assets/fonts/Archivo.ttf
  - papel: rotulo
    familia: JetBrains Mono
    classe: mono
    pesos: [400, 500]
    fonte: Google Fonts (licença OFL, uso comercial liberado)
    uso: Rótulos pequenos em caixa alta com espaçamento largo, numeração 01/02/03, tags de tecnologia e dados.
    arquivo: assets/fonts/JetBrainsMono.ttf
  - papel: logo
    familia: Monsieur La Doulaise
    classe: script
    pesos: [400]
    fonte: Google Fonts (licença OFL, uso comercial liberado)
    uso: Somente na assinatura "Cauã" do logotipo e no C do monograma. Nunca em textos do site.
    arquivo: assets/fonts/MonsieurLaDoulaise.ttf

texto_exemplo: Sites que trabalham pelo seu negócio.

logo:
  arquivos:
    - {nome: Logotipo, arquivo: assets/logo.svg, sobre: fundo}
    - {nome: Logotipo sobre claro, arquivo: assets/logo-claro.svg, sobre: texto}
    - {nome: Monograma (avatar e ícone a partir de 48 px), arquivo: assets/monograma.svg, sobre: fundo}
    - {nome: Favicon (abaixo de 48 px), arquivo: assets/favicon.svg, sobre: fundo}
  area_protecao: Espaço livre ao redor igual a meia altura do SILVEIRA, medido a partir das pontas dos floreios.
  tamanho_minimo: Logotipo com 200 px de largura na tela (abaixo disso os floreios viram textura); monograma com 48 px; abaixo de 48 px, use o favicon.

tom_de_voz: [Profissional, Confiante, Seguro, Criativo, Jovem]

paginas: [Início (página única), Uma página por projeto]
---

## Essência

Cauã Silveira cria sites para pequenos negócios. A marca é o próprio nome, e o portfólio é a prova: cada projeto mostrado precisa parecer feito com cuidado e intenção. Deve transmitir alguém jovem que leva o trabalho a sério, que constrói com precisão e tem olho para o detalhe.

## Público

Donos de pequenos negócios, como pousadas, estalagens, cafés e lojas locais, que precisam de um site bonito e funcional e querem conversar direto com quem vai fazê-lo, sem intermediários.

## Tom de voz

Fala com segurança e sem rodeios: frases curtas, verbos de ação e nenhum jargão técnico para o cliente. É jovem no ritmo e na escolha das palavras, mas nunca informal a ponto de perder a seriedade.

## Faça e não faça

### Faça

- Trate o vinho como luz: degradês difusos sobre o preto, como uma iluminação de cinema.
- Use o vermelho aceso com parcimônia, só em títulos grandes, números e no botão de WhatsApp.
- Use rótulos em JetBrains Mono, pequenos, em caixa alta e com espaçamento largo, para dar ritmo técnico.
- Deixe o branco-gelo aparecer em poucos lugares, para ressaltar o que importa.
- Mostre cada projeto com várias telas reais, não com um único print.

### Não faça

- Não use os vinhos nem o vermelho aceso como texto pequeno sobre o preto.
- Não use o cinza-concreto como texto sobre o branco-gelo.
- Não use gírias, emojis nem exclamações em excesso.
- Não use a Monsieur La Doulaise fora do logo, nem acrescente outras famílias além da Archivo e da JetBrains Mono.
- Não use fotos de banco de imagem genéricas para preencher espaço.

## Direção para o site

Site escuro e cinematográfico, com a cor entrando como luz vinho difusa e não como blocos chapados. Sem foto do autor: o topo é tipográfico, com o nome enorme em Archivo ExtraCondensed, e os espaços vazios são preenchidos por elementos visuais animados e interativos que reagem ao cursor e à rolagem, nos tons de vinho. Os projetos aparecem como cards inclinados numa curva que desliza com a rolagem, alternando telas escuras, claras e coloridas do mesmo site, e o card em foco cresce. As transições usam fade para o escuro e curvas suaves de entrada e saída (ease-in-out). A página inicial tem, nesta ordem, topo, projetos, processo, sobre e contato. Seções numeradas (01, 02, 03), linhas finas como divisórias e um cabeçalho fixo que acompanha a rolagem com o botão de WhatsApp em vermelho aceso o tempo todo, repetido no fechamento da página: (48) 99908-7111, link wa.me/5548999087111. O logotipo é o SILVEIRA vazado com a assinatura "Cauã" atravessando o nome e um recorte (um traço da cor do fundo atrás da assinatura) onde ela cruza as letras. Ele é animado na abertura: o SILVEIRA sobe do desfoque em 1 s (ease-out) e, a partir de 0,55 s, a assinatura se escreve da esquerda para a direita em 1,6 s (ease-in-out). Com movimento reduzido, aparece pronto. O primeiro projeto é o guia do hóspede da Estalagem Villa Serrana (villa-serrana-guia.netlify.app), com telas de computador e celular já capturadas em assets/projetos/villa-serrana. Enquanto não houver outros, a vitrine usa imagens estáticas simples de sites fictícios, marcadas como conceito. A estrutura de projetos deve permitir adicionar um site novo sem mexer no layout. Os textos de cada seção estão em textos.md. Referências: imagem do portfólio Rayhan (tipografia, luz, organização), vídeo Noteform (cards em curva) e os shots do Dribbble "Portfolio Animation", "Cinematic Filmmaker Portfolio" e "Joann AI Artist Portfolio".

## Pendências

- Criar as imagens dos sites fictícios na sessão do site e trocá-las conforme surgirem projetos reais.
- Cauã revisar os textos de textos.md (rascunho escrito a partir deste briefing).
