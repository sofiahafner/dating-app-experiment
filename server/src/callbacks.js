import { ClassicListenersCollector } from "@empirica/core/admin/classic";
import { getRandomRecommendation, getFinalEloRating, getEloRecommendation, getNextRecommendation} from './RecommendationAlgorithms.js';
// import { getEloRecommendation} from './RecommendationAlgorithms.js';
import fs from 'fs';

export const Empirica = new ClassicListenersCollector();

// let swipeData = [];

Empirica.onGameStart(({ game }) => {
  const treatment = game.get("treatment");
  const { numSwipes, recAlgorithm } = treatment;
  const players = game.players;
  for (const player of players) {
    player.set("recAlgorithm", recAlgorithm);
  }

  const pre_rounds = game.addRound({
    name : 'preRounds'
  });
  pre_rounds.addStage({name: "explanation", duration: 3000});
  pre_rounds.addStage({name: "pickCharacterTraits", duration: 3000});
  pre_rounds.addStage({name: "chooseCharacter", duration: 3000});

  const swipe_round = game.addRound({
    name: "swipeRound"
  });

  for (let index = 0; index < numSwipes; index++) {
    swipe_round.addStage({name: `swipeProfile_${index + 1}`, duration: 3000});
  }

  const after_rounds = game.addRound({
    name: 'afterRounds'
  });
  after_rounds.addStage({name: "endSurveyRecommendationSystem", duration: 3000});
  after_rounds.addStage({name: "endSurveyDatingAppUsage", duration: 3000});
});

Empirica.onRoundStart(({ round }) => {
  
});

Empirica.onStageStart(({ stage }) => {
  const stageName = stage.get("name");

  if (stageName.startsWith("swipeProfile")) {
    const players = stage.currentGame.players;

    for (const player of players) {
      const recommendations = getNextRecommendation(player);
      player.set('nextRecommendations', recommendations);

      const roundsPlayed = player.get("roundsPlayed") || 0;
      player.set("roundsPlayed", roundsPlayed + 1);
    }
  }
});

Empirica.onStageEnded(({ stage }) => {
  const stageName = stage.get("name");

  if (stageName.startsWith("swipeProfile")) {
    const players = stage.currentGame.players;

    for (const player of players) {
      const likedProfile = player.stage.get("likedProfile");
      const dislikedProfile = player.stage.get("dislikedProfile");
      const recommendations = player.get("nextRecommendations");

      const currentLikedProfiles = player.get("likedProfiles") || [];
      const currentDislikedProfiles = player.get("dislikedProfiles") || [];

      player.set("likedProfiles", [...currentLikedProfiles, likedProfile]);
      player.set("dislikedProfiles", [...currentDislikedProfiles, dislikedProfile]);

      // swipeData.push({
      //   participantID: player.id,
      //   ownProfileID: player.get('chosenProfile'),
      //   recommendedProfiles: recommendations,
      //   likedProfile: likedProfile,
      //   dislikedProfile: dislikedProfile
      // });
    }
  }

  if (stageName === "chooseCharacter") {
    const players = stage.currentGame.players;

    for (const player of players) {
      const chosenProfile = player.get("chosenProfile");
      player.set("chosenProfile", chosenProfile);
      player.set("finalElo", getFinalEloRating(chosenProfile))
    }
  }
});

Empirica.onRoundEnded(({ round }) => {
  // if (round.get("name") === "swipeRound") {
  //   const players = round.currentGame.players;
  //   players.forEach(player => {
  //     const roundsPlayed = player.get("roundsPlayed") || 0;
  //     player.set("roundsPlayed", roundsPlayed + 1);
  //   });
  // }
  
});

Empirica.onGameEnded(({ game }) => {
  // Write swipe data to JSON file
  // fs.writeFileSync('swipeData.json', JSON.stringify(swipeData, null, 2));
});
