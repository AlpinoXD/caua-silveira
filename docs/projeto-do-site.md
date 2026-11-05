# Projeto do site · Cauã Silveira

## Intenção

Um portfólio escuro e cinematográfico que **prova** a qualidade do trabalho: quem entra vê sites bem feitos, sente o cuidado nos detalhes e chama no WhatsApp. A marca está em `../identidade-visual/manual-de-marca.md` e os textos em `../identidade-visual/textos.md`.

## Peça central

**A vitrine de projetos em curva.** As telas de cada site viram cards inclinados presos numa roda que gira com a rolagem (referência: vídeo Noteform). O card em foco cresce e acende, e ao lado aparecem o nome, o tipo e o link do projeto. É onde vai o maior esforço, e o protótipo dela vem antes do resto.

## Metas

- Abertura com o logo animado (SILVEIRA sobe do desfoque, "Cauã" é escrita à mão) que voa até o lugar dele no topo, uma vez por sessão.
- Cabeçalho fixo com o botão de WhatsApp sempre visível.
- Página inicial em página única: topo, projetos, processo, sobre, contato.
- Uma página por projeto, com todas as telas, celular e computador, e o link do site no ar.
- Adicionar um projeto = acrescentar um item em `src/dados/projetos.js` e uma pasta de imagens. Nada de mexer no layout.
- Topo sem foto: elementos visuais animados e interativos (luz vinho que segue o cursor, com rastro).
- Funciona igual no computador e no celular, sem rolagem horizontal, com toque de 44 px e `prefers-reduced-motion`.

## Fica fora (por enquanto)

- Blog, formulário de contato (o contato é o WhatsApp), versão em inglês e modo claro.

## Anti-metas (o site fracassa mesmo funcionando se…)

- parecer um template de portfólio genérico, com cards retos em grade e "Hello, I'm";
- a animação atrasar o acesso aos projetos (abertura longa, rolagem presa, sem como pular);
- o vermelho virar alarme: a cor entra como luz, não como blocos;
- os projetos conceito parecerem trabalhos reais de clientes;
- o botão de WhatsApp sumir em algum momento da rolagem.

## Decisões do usuário

- Base escura; o branco-gelo só para ressaltar.
- Fontes: Archivo (condensada nos títulos, normal no texto) e JetBrains Mono nos rótulos; Monsieur La Doulaise só no logo.
- Logo: SILVEIRA vazado + assinatura "Cauã" com recorte, animado.
- Sem foto do autor.
- Projetos conceito (sites fictícios) como imagens estáticas simples, marcados como CONCEITO, até chegarem projetos reais.
- WhatsApp: (48) 99908-7111.

## Stack

Vite + React 18, `gsap` e `motion` para animação, roteador simples com `pushState`. Fontes e logo servidos do próprio site.
