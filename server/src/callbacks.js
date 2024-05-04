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
      // name: `Round ${index + 1}`,
      name: `Round`,
    });

    round.addStage({name: "swipeProfile", duration: 1000});
    // round.addStage({name: "result", duration: 1000});
  }
});



Empirica.onRoundStart(({ round }) => {});

Empirica.onStageStart(({ stage }) => {});

Empirica.onStageEnded(({ stage }) => {
});

Empirica.onRoundEnded(({ round }) => {});

Empirica.onGameEnded(({ game }) => {});

