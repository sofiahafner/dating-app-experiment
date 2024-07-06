import elo_ratings from '../data/elo_ratings.json';
import elo_history from '../data/elo_history.json';
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

// function hasSeenCurrentProfile(target) {
//     const result = [];
  
//     likesPastRounds.forEach(round => {
//       if (round.likedProfile === target || round.dislikedProfile === target) {
//         result.push(round.chosenProfileID);
//       }
//     });
  
//     return [...new Set(result)];
//   }
  
//   function hasLikedCurrentProfile(selectedOtherProfile, ownProfileID) {
//     for (let round of likesPastRounds) {
//         if (round.chosenProfileID === selectedOtherProfile) {
//             if (round.dislikedProfile === ownProfileID) {
//                 return 0;
//             } else if (round.likedProfile === ownProfileID) {
//                 return 1;
//             }
//         }
//     }
//     return null; 
// }

// function updateElo(profileElo, otherProfileElo, outcome, k = 32) {
//     let updatedProfileElo = profileElo;

//     if (outcome === 1) {
//         const E1 = 1 / (1 + 10 ** ((otherProfileElo - profileElo) / 400));
//         updatedProfileElo = profileElo + k * (1 - E1);
//     } else if (outcome === 0) {
//         const E2 = 1 / (1 + 10 ** ((profileElo - otherProfileElo) / 400));
//         updatedProfileElo = profileElo + k * (0 - E2);
//     }

//     return updatedProfileElo;
// }


// export function getEloRecommendation(player) {
//     console.log('in getEloRecommendation function');

//     const ownProfileID = player.game.get('chosenProfile');
//     const roundsPlayed = player.game.get("roundsPlayed") || 0;

//     // get all profile ids of profiles that have seen my profile before:
//     const profilesWithData = hasSeenCurrentProfile(ownProfileID);

//     // will need in order to select which to pick for updating:
//     const ratings = profilesWithData.map(id => ({
//         profileID: id,
//         elo: elo_ratings.profile[id.toString()]
//     }));

//     if (roundsPlayed === 15) {
//         player.stage.set('currentElo', 1500);
//         player.set('currentElo', 1500);
//     }
//     // otherwise get current elo
//     let currentElo = player.get('currentElo');

//     // Retrieve the profiles already used for Elo calculation
//     let profilesUsedForEloCalculation = player.get('profilesUsedForEloCalculation') || [];

//     // Filter profiles that have not been used yet
//     let availableProfiles = profilesWithData.filter(id => !profilesUsedForEloCalculation.includes(id));

//     // If no available profiles, skip the Elo update
//     if (availableProfiles.length > 0) {
//         // Calculate the mean Elo of the available profiles
//         const meanElo = availableProfiles.reduce((sum, id) => sum + elo_ratings.profile[id], 0) / availableProfiles.length;

//         // Find the profile with the Elo furthest from the mean
//         const selectedOtherProfile = availableProfiles.reduce((furthestProfile, id) => {
//             const elo = elo_ratings.profile[id];
//             const currentFurthestElo = elo_ratings.profile[furthestProfile];
//             return (Math.abs(elo - meanElo) > Math.abs(currentFurthestElo - meanElo)) ? id : furthestProfile;
//         }, availableProfiles[0]);

//         // Update the list of profiles used for Elo calculation
//         profilesUsedForEloCalculation.push(selectedOtherProfile);
//         player.set('profilesUsedForEloCalculation', profilesUsedForEloCalculation);

//         // Other profile Elo:
//         const otherProfileElo = elo_ratings.profile[selectedOtherProfile];
//         console.log('selectedOtherProfile', selectedOtherProfile);
//         console.log('otherProfileElo', otherProfileElo);

//         // Did other profile like or dislike?
//         // const profileWasLiked = hasLikedCurrentProfile(selectedOtherProfile, ownProfileID);
//         const profileWasLiked = 0;
//         console.log('profileWasLiked', profileWasLiked);

//         // Update current Elo depending on outcome:
//         currentElo = updateElo(currentElo, otherProfileElo, profileWasLiked);
//         console.log(currentElo);
//     } else {
//         console.log('No more available profiles for Elo calculation. Elo remains the same.');
//     }

//     let recommendations = getBaselineRecommendation(player);
//     recommendations.sort((a, b) => {
//         const ratingA = elo_ratings.profile[a] || 1500;
//         const ratingB = elo_ratings.profile[b] || 1500;
//         return Math.abs(ratingA - currentElo) - Math.abs(ratingB - currentElo);
//     });

//     player.stage.set('currentElo', currentElo);
//     player.set('currentElo', currentElo);
//     console.log('my current elo', currentElo);
//     return recommendations.slice(0, 2);
// }

function getOptimalRecommendations(elo_history_slice, profiles) {
    // Sort profiles by ELO rating
    profiles.sort((a, b) => (elo_ratings.profile[a] || 1500) - (elo_ratings.profile[b] || 1500));

    const maxRecommendations = Math.min(elo_history_slice.length, Math.floor(profiles.length / 2));
    let recommendations = [];

    function calculateResiduals(elo, profile1, profile2, index) {
        const elo1 = elo_ratings.profile[profile1] || 1500;
        const elo2 = elo_ratings.profile[profile2] || 1500;
        return Math.abs(elo - elo1) + Math.abs(elo - elo2);
    }

    for (let i = maxRecommendations - 1; i >= 0; i--) {
        let bestPair = null;
        let minResiduals = Infinity;

        for (let j = 0; j < profiles.length; j++) {
            for (let k = j + 1; k < profiles.length; k++) {
                const residuals = calculateResiduals(elo_history_slice[i], profiles[j], profiles[k], i);
                if (residuals < minResiduals) {
                    minResiduals = residuals;
                    bestPair = [profiles[j], profiles[k]];
                }
            }
        }

        if (bestPair) {
            recommendations.push(bestPair);
            // console.log(`Allocating profiles ${bestPair[0]} and ${bestPair[1]} to ELO ${elo_history_slice[i]}`);
            profiles = profiles.filter(profile => !bestPair.includes(profile));
        }
    }
    return recommendations.reverse();  // Reverse to maintain chronological order in the result
}


export function getEloRecommendation(player) {
    console.log('in getEloRecommendation function');

    const ownProfileID = player.game.get('chosenProfile');
    const roundsPlayed = player.game.get('roundsPlayed') || 0;
    const eloHistoryIndex = Math.max(0, Math.min(roundsPlayed - 15, 34));

    const currentElo = elo_history.profile[ownProfileID][eloHistoryIndex];
    let recommendations = getBaselineRecommendation(player);
    
    let ordered_recommendations = getOptimalRecommendations(
        elo_history.profile[ownProfileID].slice(eloHistoryIndex),
        recommendations
    );

    console.log(ordered_recommendations);

    player.stage.set('currentElo', currentElo);

    return ordered_recommendations[0];
}