import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {
  const treatment = game.get("treatment");
  const { numSwipes } = treatment; // Destructuring numRounds from treatment

  console.log("in onGameStart");
  console.log(treatment); // Using destructured numRounds

  // const numRounds = 10

  for (let index = 0; index < numSwipes; index++) {
    const round = game.addRound({
      name: `Round ${index + 1}`,
      // name: `Round`,
    });

    round.addStage({name: "swipeProfile", duration: 10});
    round.addStage({name: "Results", duration: 1});
  }
});



Empirica.onRoundStart(({ round }) => {});

Empirica.onStageStart(({ stage }) => {});

Empirica.onStageEnded(({ stage }) => {
  if (stage.get("name") == "Results"){
    const players = stage.currentGame.players
    for (const player of players){
      const opponent = players.filter((p) => p.id !== player.id)[0]
      const player_decision = player.round.get("decision")
      const opponent_decision = opponent.round.get("decision")
      let match
      if (player_decision === "accepted" && opponent_decision === "accepted"){
        match = 1
      } else{
        match = 0
      }
      player.round.set("match", match)
      const currentMatches = player.get("score")||0
      player.set("score", match + currentMatches)
     
    }

  }
});

Empirica.onRoundEnded(({ round }) => {});

Empirica.onGameEnded(({ game }) => {});

