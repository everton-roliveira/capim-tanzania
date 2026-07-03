# capim-tanzania

Jogo em que você pilota um foguete até a Lua, feito em HTML/JS com [Phaser 3](https://phaser.io/), em um único arquivo — sem build, sem dependências instaladas, sem assets externos (todos os sprites são desenhados via código).

## Como o jogo nasceu

**Brainstorming**

Sessão rápida de brainstorming: iniciamos com ideias mais elaboradas e aterrisamos em algo mais simples para iniciar e incrementar depois.

**Decisão**

Um jogo baseado no River Raid do Atari onde o objetivo é chegar na Lua, desviando dos meteoros e abastecendo o foguete durante o trajeto.

## Capim-X — Rocket to the Moon

Ano 2049. A Terra perdeu a **esmaltita**, o mineral bruto do esmalte dos dentes,
e com ela perdeu, literalmente, o sorriso. A última reserva conhecida está na
Lua.

Dezenas de missões já tentaram chegar lá. Nenhuma voltou. Os destroços dessas tentativas agora flutuam pelo caminho, misturados a um cinturão de meteoros que separa a Terra da sua última esperança verde.

Você pilota o **Capim-X**, o foguete que a Capim construiu para financiar a
fonte do sorriso. Equipado com um canhão de mineração adaptado e um tanque de
combustível limitado, cada tiro e cada manobra gastam energia. As células de
combustível abandonadas pelas missões anteriores podem ser a diferença entre
chegar ou virar mais um destroço no caminho de quem vier depois.

O espaço não perdoa: a gravidade puxa e o foguete desliza, mas o comando de freio ajuda a conter o impulso. A Lua cresce lentamente no horizonte.

A missão é simples de explicar e difícil de cumprir: **atire, desvie, abasteça, chegue.**

## Eventos Aleatórios

1. **Evolução para 3D** — o jogo nasceu em 2D (`rocket_to_the_moon.html`). Já tínhamos feito os efeitos sonoros quando surgiu o primeiro evento aleatório do jogo — e a partir dele decidimos transformar o jogo em 3D, dando origem ao protótipo `capim_x_3d_prototype.html`.

2. **"Legal o jogo, mas como ele ganha dinheiro?"** — desafio sorteado sobre monetização. Os ingredientes de uma economia fictícia pro jogo:
   - **Uma moeda** — o jogador ganha "créditos" (ou combustível, estrelas, minérios...) ao jogar. Ex.: chegou na Lua = +100 créditos; chegou perto = +30.
   - **Uma loja / upgrades** — com esses créditos ele compra melhorias: motor mais forte, tanque maior, escudo contra detritos, um foguete diferente.
   - **Progressão que fica salva** — o que ele comprou continua lá na próxima vez. O jogo "lembra" do jogador.
   - **(Opcional) Um item premium** — algo que, num jogo real, você pagaria para ter. No desafio é fictício, só para mostrar o conceito de monetização.

   No protótipo 3D, isso virou o **Hangar Capim-X**: Créditos Capim são ganhos ao
   fim de cada missão, salvos no navegador e usados para comprar upgrades
   persistentes de tanque, motor, blindagem, canhão e propulsor lateral.

## Como rodar

Não precisa instalar nada — é um único arquivo HTML que carrega o Phaser via CDN.

- Dê duplo clique em `rocket_to_the_moon.html`, ou
- Abra o arquivo diretamente no navegador

> Requer conexão com a internet na primeira vez (para carregar o Phaser do CDN).

## Controles

| Tecla     | Ação                          |
|-----------|-------------------------------|
| `←` `→`   | Desliza lateralmente          |
| `↑`       | Acelera                       |
| `↓`       | Freia / reduz empuxo          |
| `Espaço`  | Atira (gasta combustível)     |
| `1` `2` `3` | Escolhe dificuldade (Fácil/Médio/Difícil) |
| `M`       | Muta/desmuta o áudio           |

## Dificuldades

- **Fácil** — corredor mais largo, sem gravidade lateral, distância até a Lua menor.
- **Médio** — gravidade lateral moderada, spawns mais frequentes.
- **Difícil** — corredor estreito, gravidade lateral forte, distância maior até a Lua.

## Áudio

Trilha sonora e efeitos sonoros gerados via Web Audio API — música de menu e de jogo em loop, além de SFX de disparo, explosão, pickup, game over e vitória. No 3D, essa base procedural é combinada com trechos reais sobrepostos durante a partida: o chatter de rádio da Apollo 11 e uma contagem regressiva de lançamento real (Space Shuttle Launch Countdown). Tudo pode ser mutado a qualquer momento com `M`.

## Stack

- **Engines**: [Phaser 3](https://phaser.io/) (v3.70.0, via CDN) no jogo 2D original (`rocket_to_the_moon.html`); [Three.js](https://threejs.org/) (r128, via CDN) no protótipo 3D (`capim_x_3d_prototype.html`) — cena, câmera, física simplificada, luzes e geometria proceduralizadas em ambos os motores.
- **Frontend**: HTML/CSS/JS puro, sem framework e sem build step — cada jogo é um arquivo único.
- **Sprites/Modelos**: gerados via código (Graphics API do Phaser no 2D; primitivas e materiais do Three.js no 3D) — sem assets de imagem externos, com exceção do logo da Capim (`capim-logo.png`) usado na bandeira plantada na Lua.
- **Áudio**: síntese via Web Audio API, combinada com dois clipes de áudio real (Apollo 11 e Space Shuttle Launch Countdown) sobrepostos durante o jogo 3D.
- **Versionamento**: Git/GitHub, com o time trabalhando em paralelo por branches e pull requests.
- **Deploy**: nenhum — são HTMLs estáticos, rodam direto no navegador.

## Como utilizamos a IA

O projeto inteiro foi "vibe-coded" por um time trabalhando em paralelo, cada um na sua branch, com modelos da Claude como par de programação do início ao fim — da primeira versão jogável em 2D até os recursos mais recentes do protótipo 3D:

- **Claude Opus 4.8 (1M de contexto)** — trilha sonora e efeitos procedurais, tema de abertura e de vitória, terreno 3D da Lua (crateras, mares, ejecta) com cutscene de pouso e modo debug, overlay de áudio real da Apollo 11, cutscene cinematográfica de lançamento e o redesenho da intro/menu do 3D.
- **Claude Fable 5** — renomeação da nave para Capim-X com o crawl estilo Star Wars no menu, e a nave multi-estágio com separação de componentes (boosters, 1º e 2º estágios), incluindo otimizações de performance.
- **Claude Sonnet 5** — expansão do README e da documentação do processo, o redesenho iterativo do pickup de combustível (do cilindro neon ao tanque pressurizado) e a bandeira com o logo da Capim plantada na Lua.

Em todos os casos, a IA implementou a lógica de jogo, gerou geometrias/texturas por código e escreveu os sintetizadores de áudio a partir de descrições do conceito — com decisões de design (balanceamento, cores de marca, narrativa) guiadas em conversa. A co-autoria fica registrada diretamente nos commits (`Co-Authored-By`).
