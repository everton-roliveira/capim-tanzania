# Dev Summit

## Capim-Tanzania

1. **Brainstorming**

Sessão rápida de brainstorming: Iniciamos com ideias + elaboradas e aterrisamos em algo mais simples para iniciar e incrementar depois.

2. **Decisão**

Um jogo baseado no River Raid do atari onde o objetivo é chegar na lua, desviando dos meteoros e abastecer o foguete durante o trajeto.

3. **Narrativa do Jogo — Missão Capim-Tanzania**

Ano 2049. A Terra esgotou seu recurso mais precioso — o **Capim**. E a última reserva conhecida está na Lua.

Dezenas de missões já tentaram chegar lá. Nenhuma voltou. Os destroços dessas tentativas agora flutuam pelo caminho, misturados a um cinturão de meteoros que separa a Terra da sua última esperança verde.

Você pilota o **Capim-X**, o último foguete que a humanidade conseguiu construir. Equipado com um canhão de pulso e um tanque de combustível limitado, cada tiro e cada manobra gastam energia. As células de combustível abandonadas pelas missões anteriores podem ser a diferença entre chegar ou virar mais um destroço no caminho de quem vier depois.

O espaço não perdoa: a gravidade puxa e o foguete desliza, mas o comando de freio ajuda a conter o impulso. A Lua cresce lentamente no horizonte.

A missão é simples de explicar e difícil de cumprir: **atire, desvie, abasteça, chegue.**

4. **Evolução para 3D**

O jogo nasceu em 2D. Já tínhamos feito os efeitos sonoros quando surgiu o primeiro evento aleatório do jogo — e a partir dele decidimos transformar o jogo em 3D.

5. **Stack**

- **Engine**: [Phaser 3](https://phaser.io/) (v3.70.0, via CDN) — física arcade, colisões, grupos e câmera.
- **Frontend**: HTML/CSS/JS puro, sem framework e sem build step — arquivo único.
- **Sprites**: gerados via `Graphics API` do próprio Phaser, sem nenhum asset de imagem externo.
- **Áudio**: Web Audio API, com música e efeitos sonoros sintetizados proceduralmente (sem arquivos de áudio).
- **Versionamento**: Git/GitHub.
- **Deploy**: nenhum — é um HTML estático, roda direto no navegador.

6. **Como utilizamos a IA**

O projeto foi "vibe-coded" do início ao fim com a Claude (Opus 4.8, 1M de contexto), da primeira versão jogável até a trilha sonora e os efeitos sonoros procedurais.

- A IA implementou a lógica do jogo (física de movimento, colisões, curva de dificuldade progressiva por distância) a partir de descrições do conceito e ajustes de gameplay.
- Os sprites e o áudio foram gerados por código (Graphics API e Web Audio API), sem nenhum asset externo, com a IA escrevendo as texturas e os sintetizadores de som.
- Decisões de design (ex.: balanceamento de thrust/drag, dificuldades, narrativa) foram guiadas em conversa, com a IA propondo e iterando a implementação.
- A co-autoria da IA é registrada diretamente nos commits (`Co-Authored-By: Claude Opus 4.8`).
