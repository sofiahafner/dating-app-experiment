import { ClassicListenersCollector } from "@empirica/core/admin/classic";
import { getRandomRecommendation, getBaselineRecommendation } from './RecommendationAlgorithms.js';

export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {
  const treatment = game.get("treatment");
  const { numSwipes } = treatment; // Destructuring numRounds from treatment
  console.log(numSwipes)

  const pre_rounds = game.addRound({
    name : 'preRounds'
  })
  pre_rounds.addStage({name:"explanation", duration:3000})
  pre_rounds.addStage({name:"pickCharacterTraits", duration:3000})
  pre_rounds.addStage({name:"chooseCharacter", duration:3000})

  for (let index = 0; index < numSwipes; index++) {
    const round = game.addRound({
      name: `Round ${index + 1}`,
      duration:3000
    });

    round.addStage({name: "swipeProfile", duration:3000});
  }
  const after_rounds = game.addRound({
    name : 'afterRounds'
  })
  after_rounds.addStage({name: "endSurveyRecommendationSystem", duration:3000});
  after_rounds.addStage({name: "endSurveyDatingAppUsage", duration:3000});
  
});


Empirica.onRoundStart(({ round }) => {
  if (round.get("name") !== "preRounds") {
    if (round.get("name") !== "afterRounds") {
      const players = round.currentGame.players
      let profile_id = 1
      for (const player of players){
        player.round.set('ownProfileID', profile_id)
        profile_id = profile_id + 1
      }
    }
  }
});

Empirica.onStageStart(({ stage }) => {

});



Empirica.onStageEnded(({ stage }) => {
  if (stage.get("name") === "swipeProfile") {
    const players = stage.currentGame.players;

    for (const player of players) {
      const likedProfile = player.round.get("likedProfile");
      const dislikedProfile = player.round.get("dislikedProfile");

      const currentLikedProfiles = player.get("likedProfiles") || [];
      const currentDislikedProfiles = player.get("dislikedProfiles") || [];

      player.set("likedProfiles", [...currentLikedProfiles, likedProfile]);
      player.set("dislikedProfiles", [...currentDislikedProfiles, dislikedProfile]);
      player.set('nextRecommendations', getRandomRecommendation(player))
    }
  }

  if (stage.get("name") === "chooseCharacter") {
    const players = stage.currentGame.players;

    for (const player of players) {
      const chosenProfile = player.round.get("chosenProfile");
      player.set("chosenProfile", chosenProfile);
    }
  }
});




Empirica.onRoundEnded(({ round }) => {
  // const { numSwipes } = treatment; 
  // console.log(round.get("name"))
  const players = round.currentGame.players
  for (let index = 0; index < 100; index++) {
    const round_name =  `Round ${index + 1}`
    if (round.get("name") === round_name){
      // console.log("round name matches")
      for (const player of players) {
        // console.log("rin players on round ended")
        player.set("roundsPlayed", index + 1);
      }
    }
    };


});

Empirica.onGameEnded(({ game }) => {});

