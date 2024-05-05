import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {
  const treatment = game.get("treatment");
  const { numSwipes } = treatment; // Destructuring numRounds from treatment

  // for (const player of players){
  //   const ownProfileID = 1;
  //   player.round.set("ownProfileID", ownProfileID)
  // }
  for (let index = 0; index < numSwipes; index++) {
    const round = game.addRound({
      name: `Round ${index + 1}`,
      // name: `Round`,
    });

    round.addStage({name: "swipeProfile", duration: 10});
    round.addStage({name: "Results", duration: 1});
  }
  
});





Empirica.onRoundStart(({ round }) => {
  const players = round.currentGame.players
  let profile_id = 1
  for (const player of players){
    player.round.set('ownProfileID', profile_id)
    profile_id = profile_id + 1
  }
  // const players = stage.currentGame.players
  // const allProfileIDs = [1,2,3,4]
  
  // for (let index = 0; index < players.length; index++) {
  //   const player = players[index]
  //   const ownProfileID = allProfileIDs[index]
  //   player.round.set("ownProfileID", ownProfileID)
  //   console.log("callbacks ownProfileID")
  //   console.log(ownProfileID)
  // }
  console.log("in onRoundStart")
});

Empirica.onStageStart(({ stage }) => {
  console.log("in onStageStart")

});

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

