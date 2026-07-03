# capim-tanzania

Jogo em que você pilota um foguete até a Lua, feito em HTML/JS com [Phaser 3](https://phaser.io/), em um único arquivo — sem build, sem dependências instaladas, sem assets externos (todos os sprites são desenhados via código).

## Como o jogo nasceu

**Brainstorming**

Sessão rápida de brainstorming: iniciamos com ideias mais elaboradas e aterrisamos em algo mais simples para iniciar e incrementar depois.

**Decisão**

Um jogo baseado no River Raid do Atari onde o objetivo é chegar na Lua, desviando dos meteoros e abastecendo o foguete durante o trajeto.

## Capim-X — Rocket to the Moon

Ano 2049. A Terra esgotou seu recurso mais precioso — o **Capim**. E a última reserva conhecida está na Lua.

Dezenas de missões já tentaram chegar lá. Nenhuma voltou. Os destroços dessas tentativas agora flutuam pelo caminho, misturados a um cinturão de meteoros que separa a Terra da sua última esperança verde.

Você pilota o **Capim-X**, o último foguete que a humanidade conseguiu construir. Equipado com um canhão de pulso e um tanque de combustível limitado, cada tiro e cada manobra gastam energia. As células de combustível abandonadas pelas missões anteriores podem ser a diferença entre chegar ou virar mais um destroço no caminho de quem vier depois.

O espaço não perdoa: a gravidade puxa e o foguete desliza, mas o comando de freio ajuda a conter o impulso. A Lua cresce lentamente no horizonte.

A missão é simples de explicar e difícil de cumprir: **atire, desvie, abasteça, chegue.**

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

Trilha sonora e efeitos sonoros 100% gerados via Web Audio API — sem nenhum arquivo de áudio externo. Inclui música de menu e de jogo em loop, além de SFX de disparo, explosão, pickup, game over e vitória. Pode ser mutado a qualquer momento com `M`.

## Stack

- **Engine**: [Phaser 3](https://phaser.io/) (v3.70.0, via CDN) — física arcade, colisões, grupos e câmera.
- **Frontend**: HTML/CSS/JS puro, sem framework e sem build step — arquivo único.
- **Sprites**: gerados via Graphics API do próprio Phaser, sem nenhum asset de imagem externo.
- **Áudio**: Web Audio API, com música e efeitos sonoros sintetizados proceduralmente.
- **Versionamento**: Git/GitHub.
- **Deploy**: nenhum — é um HTML estático, roda direto no navegador.

## Como utilizamos a IA

O projeto foi "vibe-coded" do início ao fim com a Claude (Opus 4.8, 1M de contexto), da primeira versão jogável até a trilha sonora e os efeitos sonoros procedurais.

- A IA implementou a lógica do jogo (física de movimento, colisões, curva de dificuldade progressiva por distância) a partir de descrições do conceito e ajustes de gameplay.
- Os sprites e o áudio foram gerados por código (Graphics API e Web Audio API), sem nenhum asset externo, com a IA escrevendo as texturas e os sintetizadores de som.
- Decisões de design (ex.: balanceamento de thrust/drag, dificuldades, narrativa) foram guiadas em conversa, com a IA propondo e iterando a implementação.
- A co-autoria da IA é registrada diretamente nos commits (`Co-Authored-By: Claude Opus 4.8`).
