import {
  usePlayer,
  usePlayers,
  useRound,
  useStage,
} from "@empirica/core/player/classic/react";
import { Loading } from "@empirica/core/player/react";
import React from "react";

import { SwipeProfile } from "./stages/SwipeProfile.jsx";
import { Results } from "./stages/Results.jsx";
import { PickCharacterTraits } from "./stages/PickCharacterTraits.jsx";
import { ChooseCharacter } from "./stages/ChooseCharacter.jsx";
import {Explanation} from "./stages/Explanation.jsx"
import {EndSurveyDatingAppUsage} from "./stages/EndSurveyDatingAppUsage.jsx"
import {EndSurveyRecommendationSystem} from "./stages/EndSurveyRecommendationSystem.jsx"


export function Stage() {
  const player = usePlayer();
  const players = usePlayers();
  const round = useRound();
  const stage = useStage();

  if (player.stage.get("submit")) {
    if (players.length === 1) {
      return <Loading />;
    }

    return (
      <div className="text-center text-gray-400 pointer-events-none">
        Please wait for other player(s).
      </div>
    );
  }

  switch (stage.get("name")){
    case "explanation":
        return <Explanation/>
    case "pickCharacterTraits":
      return <PickCharacterTraits/>
    case "swipeProfile":
      return <SwipeProfile/>
    case "chooseCharacter":
      return <ChooseCharacter/>
    case "endSurveyDatingAppUsage":
      return <EndSurveyDatingAppUsage/>
    case "endSurveyRecommendationSystem":
      return <EndSurveyRecommendationSystem/>
    // case "Results":
    //     return <Results/>
    default:
      console.log("AAA")
      console.log(stage.get("name"))
      return <p>Loading...</p>
  }

}
