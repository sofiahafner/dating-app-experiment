import elo_ratings from '../data/elo_ratings.json';
import { getBaselineRecommendation } from './RecommendationAlgorithms.js';
import likesPastRounds from '../data/likesPastRounds.json'

// export function getEloRecommendation(player) {
//     console.log('in getEloRecommendation function');

//     const ownProfileID = player.game.get('chosenProfile');
//     const finalElo = elo_ratings.profile[ownProfileID];
//     const roundsPlayed = player.game.get("roundsPlayed") || 0;

//     const initialElo = 1500;
//     const roundsTotal = 50;
//     const currentElo = initialElo + ((finalElo - initialElo) * roundsPlayed) / roundsTotal;

//     // Calculate the number of profiles to include in the range
//     const initialProfiles = 100;
//     const finalProfiles = 2;
//     let currentProfileCount;

//     if (roundsPlayed <= 1) {
//         currentProfileCount = initialProfiles;
//     } else {
//         currentProfileCount = initialProfiles - ((initialProfiles - finalProfiles) * (roundsPlayed - 1)) / (roundsTotal - 1);
//     }
    
//     let recommendations = getBaselineRecommendation(player);
//     // If the number of profiles returned by the baseline recommendation is less than the number to consider, use all that are returned
//     if (recommendations.length < currentProfileCount) {
//         currentProfileCount = recommendations.length;
//     }

//     console.log('Initial recommendations:', recommendations);
//     console.log('currentProfileCount:', currentProfileCount);

//     // Sort profiles by their proximity to the current elo
//     recommendations.sort((a, b) => {
//         const ratingA = elo_ratings.profile[a] || 1500;
//         const ratingB = elo_ratings.profile[b] || 1500;
//         return Math.abs(ratingA - currentElo) - Math.abs(ratingB - currentElo);
//     });

//     // Select the top profiles based on the currentProfileCount
//     let effectiveRecommendations = recommendations.slice(0, currentProfileCount);

//     // Log the elos of all profiles in the effective recommendations
//     console.log('Elos of effective recommended profiles:', effectiveRecommendations.map(id => elo_ratings.profile[id] || 1500));

//     // Ensure there are at least two recommendations
//     if (effectiveRecommendations.length < 2) {
//         console.log('Not enough recommendations within the current range. Expanding range temporarily.');
//         effectiveRecommendations = getBaselineRecommendation(player).slice(0, 2);
//     }

//     // Randomly select two profiles from the effective recommendations
//     const topRecommendations = [];
//     while (topRecommendations.length < 2 && effectiveRecommendations.length > 0) {
//         const randomIndex = Math.floor(Math.random() * effectiveRecommendations.length);
//         topRecommendations.push(effectiveRecommendations.splice(randomIndex, 1)[0]);
//     }

//     console.log('Top recommendations:', topRecommendations);
//     console.log('Elo rec 1:', elo_ratings.profile[topRecommendations[0]]);
//     console.log('Elo rec 2:', elo_ratings.profile[topRecommendations[1]]);

//     return topRecommendations;
// }

function hasSeenCurrentProfile(target) {
    const result = [];
  
    likesPastRounds.forEach(round => {
      if (round.likedProfile === target || round.dislikedProfile === target) {
        result.push(round.chosenProfileID);
      }
    });
  
    // Ensure the result list is unique
    return [...new Set(result)];
  }
  
  function hasLikedCurrentProfile(selectedOtherProfile, ownProfileID) {
    for (let round of likesPastRounds) {
        if (round.chosenProfileID === selectedOtherProfile) {
            if (round.dislikedProfile === ownProfileID) {
                return 0;
            } else if (round.likedProfile === ownProfileID) {
                return 1;
            }
        }
    }
    // If no matching profile is found, you can decide on a default return value or an error
    return null; // or throw an error, e.g., throw new Error('Profile not found');
}

function updateElo(profileElo, otherProfileElo, outcome, k = 32) {
    let updatedProfileElo = profileElo;

    if (outcome === 1) {
        // Profile was liked
        const E1 = 1 / (1 + 10 ** ((otherProfileElo - profileElo) / 400));
        updatedProfileElo = profileElo + k * (1 - E1);
    } else if (outcome === 0) {
        // Profile was disliked
        const E2 = 1 / (1 + 10 ** ((profileElo - otherProfileElo) / 400));
        updatedProfileElo = profileElo + k * (0 - E2);
    }

    return updatedProfileElo;
}


export function getEloRecommendation(player) {
    console.log('in getEloRecommendation function');

    const ownProfileID = player.game.get('chosenProfile');
    const roundsPlayed = player.game.get("roundsPlayed") || 0;

    // get all profile ids of profiles that have seen my profile before:
    const profilesWithData = hasSeenCurrentProfile(ownProfileID)

    // will need in order to select which to pick for updating:
    const ratings = profilesWithData.map(id => ({
        profileID: id,
        elo: elo_ratings.profile[id.toString()]
    }));

    if (roundsPlayed === 15){
        player.stage.set('currentElo', 1500)
        player.set('currentElo', 1500)
    }
    // otherwise get current elo
    let currentElo = player.get('currentElo')
    console.log(currentElo)

    // select other profile which has seen me (for now: random)
    const randomIndex = Math.floor(Math.random() * profilesWithData.length);
    const selectedOtherProfile = profilesWithData[randomIndex]

    // other profile elo:
    const otherProfileElo = elo_ratings.profile[selectedOtherProfile]
    console.log(otherProfileElo)


    // did other profile like or dislike?
    const profileWasLiked = hasLikedCurrentProfile(selectedOtherProfile, ownProfileID)
    console.log(profileWasLiked)

    // update current elo depending on outcome:
    currentElo = updateElo(currentElo, otherProfileElo, profileWasLiked)
    console.log(currentElo)

    player.stage.set('currentElo', currentElo)
    player.set('currentElo', currentElo)


    let recommendations = getBaselineRecommendation(player);
    recommendations.sort((a, b) => {
        const ratingA = elo_ratings.profile[a] || 1500;
        const ratingB = elo_ratings.profile[b] || 1500;
        return Math.abs(ratingA - currentElo) - Math.abs(ratingB - currentElo);
    });


    return  recommendations.slice(0, 2);
}
