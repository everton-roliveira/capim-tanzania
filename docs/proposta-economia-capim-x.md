# CAPIM-X — Proposta de Economia e Progressão

> **Base:** imagem 5 dos docs, com o enunciado "Legal o jogo, mas como ele ganha
> dinheiro?"
>
> **Status:** proposta para implementação incremental. A ideia é mostrar uma
> economia coerente com a narrativa da esmaltita sem obrigar o jogo a virar uma
> loja completa se não houver tempo.

---

## Enunciado

O jogo precisa demonstrar como poderia existir uma economia em volta da missão
Capim-X:

- Uma moeda que o jogador ganha ao jogar.
- Uma loja de upgrades comprados com essa moeda.
- Progressão salva entre partidas.
- Opcionalmente, um item premium fictício para representar o conceito de
  monetização.

Dentro da história nova, a economia deve reforçar o tema central: a Terra perdeu
o sorriso depois do colapso da esmaltita, e a Capim-X atravessa o cemitério das
missões fracassadas para buscar esse mineral na Lua.

---

## Proposta

Criar uma camada simples de progressão em cima do jogo atual. Ao final de cada
missão, o jogador recebe **Créditos Capim** e/ou **fragmentos de esmaltita** de
acordo com o desempenho. Esses recursos podem ser usados para comprar melhorias
persistentes para a Capim-X.

A fantasia é: cada tentativa recupera dados, peças e rastros de esmaltita no
caminho. Mesmo quando a nave falha, ela contribui para a próxima missão.

---

## Moeda

### Nome recomendado

**Créditos Capim**

Funciona melhor para loja, upgrades e leitura rápida no HUD. É direto, tem cara
de produto e conversa com a ideia de financiamento.

### Recurso narrativo complementar

**Esmaltita**

Pode aparecer como recurso de vitória ou recompensa especial. Exemplo:

- chegar perto da Lua: poucos fragmentos de esmaltita;
- pousar na Lua: grande carregamento de esmaltita;
- destruir drones de mineração: chance de recuperar amostras.

Se precisarmos simplificar, usamos apenas **Créditos Capim** como moeda única.

---

## Recompensas por missão

No final de cada partida, calcular uma recompensa baseada em:

- **Distância alcançada:** quanto mais perto da Lua, maior a recompensa.
- **Pouso na Lua:** bônus alto por completar a missão.
- **Drones destruídos:** bônus por neutralizar tecnologia hostil abandonada.
- **Meteoros destruídos:** bônus menor por abrir caminho.
- **Combustível coletado:** bônus por recuperar tanques das missões fracassadas.
- **Combustível restante:** bônus de eficiência.
- **Dificuldade:** multiplicador maior no médio e no difícil.

Exemplo de leitura para o jogador:

```text
Relatório da missão
Distância: 78%
Drones neutralizados: +30 créditos
Tanques recuperados: +20 créditos
Bônus dificuldade: x1.2
Total: 96 Créditos Capim
```

---

## Loja de upgrades

Os upgrades devem parecer parte da engenharia da Capim-X, não itens genéricos.

### Upgrades principais

- **Tanque Família:** aumenta o combustível inicial.
- **Motor Eficiente:** reduz o consumo de combustível ao acelerar.
- **Cobertura Antimpacto:** adiciona uma vida inicial ou melhora a resistência.
- **Canhão Econômico:** reduz o custo de combustível por disparo.
- **Propulsor Lateral:** melhora controle e resposta horizontal.

### Regras simples

- Cada upgrade tem 3 níveis.
- O custo sobe a cada nível.
- Os upgrades ficam salvos para as próximas partidas.
- O jogador pode continuar jogando sem comprar nada, mas sente progresso quando
  compra.

---

## Progressão salva

Salvar localmente com `localStorage`:

- Créditos Capim acumulados.
- Upgrades comprados.
- Melhor distância.
- Melhor score.
- Vitórias por dificuldade.

Essa parte é importante porque transforma cada tentativa em avanço. Mesmo uma
derrota vira história: "sua carcaça agora ajuda quem vier depois".

---

## Item premium fictício

Como a proposta da imagem menciona um item premium opcional, o ideal é tratar
isso de forma demonstrativa e bem-humorada, sem transformar o jogo em pay-to-win.

Sugestão:

**Capim Prime Lunar**

Um pacote cosmético fictício que muda a pintura da nave, adiciona um brilho
dourado e altera a mensagem de vitória. Não precisa dar vantagem real.

Texto possível:

```text
CAPIM PRIME LUNAR
Pintura executiva, brilho de lançamento e prioridade emocional no retorno do
sorriso. Item fictício para demonstrar monetização.
```

---

## Escopo mínimo se houver pouco tempo

Implementar apenas:

1. Créditos ganhos no fim da partida.
2. Créditos salvos em `localStorage`.
3. Uma loja simples acessível pelo menu.
4. Três upgrades: Tanque Família, Motor Eficiente e Cobertura Antimpacto.

Isso já demonstra a economia completa: jogar, ganhar moeda, comprar melhoria e
voltar mais forte na próxima tentativa.

---

## Nice-to-have

Estas ideias são boas, mas podem ficar para depois se o tempo estiver curto:

- **Metas diárias:** contratos como "destrua 5 drones", "chegue a 50% sem perder
  vida" ou "colete 3 tanques".
- **Skins da nave:** cosméticos comprados com Créditos Capim.
- **Esmaltita como segunda moeda:** recurso especial de fim de jogo.
- **Tela de relatório mais detalhada:** breakdown visual de recompensas.
- **Conquistas:** primeira chegada na Lua, vitória no difícil, missão sem tiros.
- **Contratos de resgate:** recuperar peças específicas no cemitério espacial.

---

## Tom recomendado

Manter o mesmo tom da nova história: esperto, levemente absurdo e conectado à
Capim.

Exemplos:

- "A Capim financiou o sorriso. Agora financia o foguete."
- "Mesmo quando você explode, alguém aprende com a sua carcaça."
- "Tanque recuperado. O dono anterior não vai precisar."
- "Esmaltita encontrada. A Terra ensaia um sorriso."

