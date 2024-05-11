import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {
  const treatment = game.get("treatment");
  const { numSwipes } = treatment; // Destructuring numRounds from treatment
  // console.log(numSwipes)
  // console.log(treatment)
  // const numSwipes = 5

  // for (const player of players){
  //   const ownProfileID = 1;
  //   player.round.set("ownProfileID", ownProfileID)
  // }
  const pre_rounds = game.addRound({
    name : 'preRounds'
  })
  pre_rounds.addStage({name:"pickCharacterTraits", duration: 30})

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
  if (round.get("name") !== "preRounds") {
    const players = round.currentGame.players
    let profile_id = 1
    for (const player of players){
      player.round.set('ownProfileID', profile_id)
      profile_id = profile_id + 1
    }
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
});

Empirica.onStageStart(({ stage }) => {

});

// Empirica.onStageEnded(({ stage }) => {
//   if (stage.get("name") == "Results"){
//     const players = stage.currentGame.players
//     for (const player of players){
//       player_opponentID = player.round.get("opponentId")
//       const currentOpponentIds = player.get("opponentIDs")||[]
//       player.set("opponentIDs", currentOpponentIds.push(player_opponentID))
     
//     }

//   }
// });

// Empirica.onStageEnded(({ stage }) => {
//   if (stage.get("name") === "Results") {
//     const players = stage.game.players; // Ensure you access players from the correct property
//     for (const player of players) {
//       const player_opponentID = player.round.get("opponentId"); // Declare this variable properly
//       const currentOpponentIds = player.get("opponentIDs") || []; // Get existing opponent IDs or default to an empty array
      
//       // Push the new opponent ID to the array
//       currentOpponentIds.push(player_opponentID);
      
//       // Save the updated array back to the player's state
//       player.set("opponentIDs", currentOpponentIds);
//     }
//   }
// });

Empirica.onStageEnded(({ stage}) => {
  if (stage.get("name") === "Results") {
    const players = stage.currentGame.players

    for (const player of players) {
      const player_opponentID = player.round.get("opponentId");
      const currentOpponentIds = player.get("opponentIDs") || [];
      player.set("opponentIDs", [...currentOpponentIds, player_opponentID]);
    }
  }
});



Empirica.onRoundEnded(({ round }) => {});

Empirica.onGameEnded(({ game }) => {});

