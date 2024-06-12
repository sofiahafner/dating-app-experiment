import { ClassicListenersCollector } from "@empirica/core/admin/classic";
import { getRandomRecommendation } from './RecommendationAlgorithms.js';

export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {
  const treatment = game.get("treatment");
  const { numSwipes } = treatment;

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
  if (round.get("name") === "swipeRound") {
    const players = round.currentGame.players;
    let profile_id = 1;
    for (const player of players) {
      player.round.set('ownProfileID', profile_id);
      profile_id = profile_id + 1;
    }
  }
});

Empirica.onStageStart(({ stage }) => {
  const stageName = stage.get("name");

  if (stageName.startsWith("swipeProfile")) {
    const players = stage.currentGame.players;

    for (const player of players) {
      player.set('nextRecommendations', getRandomRecommendation(player));

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
      const likedProfile = player.round.get("likedProfile");
      const dislikedProfile = player.round.get("dislikedProfile");

      const currentLikedProfiles = player.get("likedProfiles") || [];
      const currentDislikedProfiles = player.get("dislikedProfiles") || [];

      player.set("likedProfiles", [...currentLikedProfiles, likedProfile]);
      player.set("dislikedProfiles", [...currentDislikedProfiles, dislikedProfile]);
    }
  }

  if (stageName === "chooseCharacter") {
    const players = stage.currentGame.players;

    for (const player of players) {
      const chosenProfile = player.round.get("chosenProfile");
      player.set("chosenProfile", chosenProfile);
    }
  }
});

Empirica.onRoundEnded(({ round }) => {
  if (round.get("name") === "swipeRound") {
    const players = round.currentGame.players;
    players.forEach(player => {
      const roundsPlayed = player.get("roundsPlayed") || 0;
      player.set("roundsPlayed", roundsPlayed + 1);
    });
  }
});

Empirica.onGameEnded(({ game }) => {
  // No changes needed here
});
