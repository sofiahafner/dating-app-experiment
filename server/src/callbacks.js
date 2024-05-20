import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {
  const treatment = game.get("treatment");
  const { numSwipes } = treatment; // Destructuring numRounds from treatment

  const pre_rounds = game.addRound({
    name : 'preRounds'
  })
  pre_rounds.addStage({name:"pickCharacterTraits", duration: 30})
  pre_rounds.addStage({name:"chooseCharacter", duration: 30})

  for (let index = 0; index < numSwipes; index++) {
    const round = game.addRound({
      name: `Round ${index + 1}`,
    });

    round.addStage({name: "swipeProfile", duration: 10});
    // round.addStage({name: "Results", duration: 1});
  }
  
});


Empirica.onRoundStart(({ round }) => {
  if (round.get("name") !== "preRounds") {
    const players = round.currentGame.players
    let profile_id = 1
    for (const player of players){
      player.round.set('ownProfileID', profile_id)
      profile_id = profile_id + 1
    }
  }

});

Empirica.onStageStart(({ stage }) => {

});



Empirica.onStageEnded(({ stage}) => {
  if (stage.get("name") === "swipeProfile") {
    const players = stage.currentGame.players

    for (const player of players) {
      const player_opponentID = player.round.get("opponentId");
      const currentOpponentIds = player.get("opponentIDs") || [];
      player.set("opponentIDs", [...currentOpponentIds, player_opponentID]);
    }
  }

    if (stage.get("name") === "chooseCharacter") {
      const players = stage.currentGame.players
  
      for (const player of players) {
        const playerchosenProfile = player.round.get("chosenProfile");
        // const currentOpponentIds = player.get("opponentIDs") || [];
        player.set("chosenProfile", playerchosenProfile);
      }

    // chooseCharacter
  }
});



Empirica.onRoundEnded(({ round }) => {

});

Empirica.onGameEnded(({ game }) => {});

