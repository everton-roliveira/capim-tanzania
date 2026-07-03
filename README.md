# capim-tanzania

Jogo de nave em HTML/JS, feito com [Phaser 3](https://phaser.io/), em um único arquivo — sem build, sem dependências instaladas, sem assets externos (todos os sprites são desenhados via código).

## Capim-X — Rocket to the Moon

> Ano 2049. A Terra esgotou seu recurso mais precioso. A última reserva conhecida está na Lua. Dezenas de missões já tentaram chegar — nenhuma voltou.

Pilote a Capim-X através do cinturão de meteoros e drones de defesa automatizados, atirando para abrir caminho (o que consome combustível) e coletando células de energia para chegar à Lua.

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
| `↓`       | Reduz empuxo                  |
| `Espaço`  | Atira (gasta combustível)     |
| `1` `2` `3` | Escolhe dificuldade (Fácil/Médio/Difícil) |

## Dificuldades

- **Fácil** — corredor mais largo, sem gravidade lateral, distância até a Lua menor.
- **Médio** — gravidade lateral moderada, spawns mais frequentes.
- **Difícil** — corredor estreito, gravidade lateral forte, distância maior até a Lua.

## Tecnologia

- [Phaser 3](https://phaser.io/) (via CDN, `3.70.0`)
- HTML/CSS/JS puro, arquivo único
