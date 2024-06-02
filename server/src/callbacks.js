import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {
  const treatment = game.get("treatment");
  const { numSwipes } = treatment; // Destructuring numRounds from treatment

  const pre_rounds = game.addRound({
    name : 'preRounds'
  })
  pre_rounds.addStage({name:"explanation", duration: 3000})
  pre_rounds.addStage({name:"pickCharacterTraits", duration: 3000})
  pre_rounds.addStage({name:"chooseCharacter", duration: 3000})

  for (let index = 0; index < numSwipes; index++) {
    const round = game.addRound({
      name: `Round ${index + 1}`,
    });

    round.addStage({name: "swipeProfile", duration: 3000});
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
  // const { numSwipes } = treatment; 
  console.log(round.get("name"))
  const players = round.currentGame.players
  for (let index = 0; index < 100; index++) {
    const round_name =  `Round ${index + 1}`
    if (round.get("name") === round_name){
      console.log("round name matches")
      for (const player of players) {
        console.log("rin players on round ended")
        player.set("roundsPlayed", index + 1);
      }
    }
    };


});

Empirica.onGameEnded(({ game }) => {});

