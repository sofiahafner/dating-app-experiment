import profiles from '../data/peep_profiles.json';
import character_traits_simplified from '../data/character_traits_simplified.json';
import character_preferences from '../data/character_preferences.json';
import { getBaselineRecommendation } from './RecommendationAlgorithms.js';

// export function buildPreferenceDictionary(player) {
//     const likedProfiles = player.game.get('likedProfiles') || [];
//     const dislikedProfiles = player.game.get('dislikedProfiles') || [];

//     const features = [
//         'young', 'hair_short', 'skin_dark', 'has_facial_hair', 'has_accessories', 'job_type_higher_ed', 
//         'face_positive', "main_hobby_Arts", "main_hobby_Music", "main_hobby_Sport", "main_hobby_Travel"
//     ];

//     let preferences = {};

//     features.forEach(feature => {
//         preferences[feature] = 0;
//     });

//     likedProfiles.forEach((likedProfile, index) => {
//         if (index < dislikedProfiles.length) {
//             const likedFeatures = character_traits_simplified[likedProfile];
//             const dislikedFeatures = character_traits_simplified[dislikedProfiles[index]];

//             features.forEach(feature => {
//                 if (likedFeatures[feature] && !dislikedFeatures[feature]) {
//                     preferences[feature] += 1;
//                 } else if (!likedFeatures[feature] && dislikedFeatures[feature]) {
//                     preferences[feature] -= 1;
//                 }
//             });
//         }
//     });

//     return preferences;
// }


export function buildPreferenceDictionary(player) {
    const likedProfiles = player.game.get('likedProfiles') || [];
    const dislikedProfiles = player.game.get('dislikedProfiles') || [];

    const features = [
        'young', 'hair_short', 'skin_dark', 'has_facial_hair', 'has_accessories', 'job_type_higher_ed', 
        'face_positive', "main_hobby_Arts", "main_hobby_Music", "main_hobby_Sport", "main_hobby_Travel"
    ];

    let preferences = {};
    let comparisons = {};
    let sumSquares = {};
    let totalObservations = 0;

    features.forEach(feature => {
        preferences[feature] = 0;
        comparisons[feature] = 0;
        sumSquares[feature] = 0;
    });

    likedProfiles.forEach((likedProfile, index) => {
        if (index < dislikedProfiles.length) {
            const likedFeatures = character_traits_simplified[likedProfile];
            const dislikedFeatures = character_traits_simplified[dislikedProfiles[index]];

            features.forEach(feature => {
                if (likedFeatures[feature] && !dislikedFeatures[feature]) {
                    preferences[feature] += 1;
                    sumSquares[feature] += 1 ** 2;
                    comparisons[feature] += 1;
                } else if (!likedFeatures[feature] && dislikedFeatures[feature]) {
                    preferences[feature] -= 1;
                    sumSquares[feature] += (-1) ** 2;
                    comparisons[feature] += 1;
                }
                if (likedFeatures[feature] || dislikedFeatures[feature]) {
                    totalObservations += 1;
                }
            });
        }
    });

    let normalizedPreferences = {};
    features.forEach(feature => {
        if (comparisons[feature] !== 0) {
            const mean = preferences[feature] / comparisons[feature];
            const variance = (sumSquares[feature] / comparisons[feature]) - (mean ** 2);
            normalizedPreferences[feature] = {
                mean: mean * 100,
                variance: variance * 100,
                n: comparisons[feature],
            };
        } else {
            normalizedPreferences[feature] = {
                mean: 0,
                variance: 0,
                n: 0,
            };
        }
    });

    return normalizedPreferences;
}

// function euclideanDistance(vector1, vector2) {
//     console.log(vector1)
//     console.log(vector2)
//     return Math.sqrt(Object.keys(vector1).reduce((sum, key) => {
//         const diff = (vector1[key] || 0) - (vector2[key] || 0);
//         return sum + (diff * diff);
//     }, 0));
// }

function euclideanDistance(vector1, vector2) {
    console.log('Vector 1:', vector1);
    console.log('Vector 2:', vector2);

    return Math.sqrt(Object.keys(vector1).reduce((sum, key) => {
        const value1 = vector1[key]['mean'] || 0;
        const value2 = (typeof vector2[key] === 'boolean') ? (vector2[key] ? 100 : -100) : (vector2[key] || 0);
        const diff = value1 - value2;
        return sum + (diff * diff);
    }, 0));
}

function calculateReciprocalCompatibility(preferences1, traits1, preferences2, traits2) {
    // console.log(preferences1)
    // console.log(preferences2)
    // console.log(traits1)
    // console.log(traits2)
    const distance1 = euclideanDistance(preferences1, traits2);
    // console.log(distance1)
    if (Object.values(preferences2).every(pref => pref.n === 0)) {
        return distance1;
    }
    const distance2 = euclideanDistance(preferences2, traits1);
    // console.log(distance2)
    return (distance1 + distance2)/2;
}

export function getEuclideanRecommendation(player) {
    const roundsPlayed = player.game.get('roundsPlayed') || 0;
    const ownProfileID = player.game.get('chosenProfile');
    let recommendations = getBaselineRecommendation(player);

    const own_preferences = buildPreferenceDictionary(player);
    const own_traits = character_traits_simplified[ownProfileID];

    const compatibilityScores = {};
    recommendations.forEach(profileID => {
        const profile_preferences = character_preferences[profileID];
        const profile_traits = character_traits_simplified[profileID];
        compatibilityScores[profileID] = calculateReciprocalCompatibility(
            own_preferences, 
            own_traits, 
            profile_preferences, 
            profile_traits
        );
    });
    // console.log(compatibilityScores)

    recommendations.sort((a, b) => compatibilityScores[a] - compatibilityScores[b]);
    const maxRecommendations = 100 - (roundsPlayed * 2);
    recommendations = recommendations.slice(0, maxRecommendations);
    // console.log(recommendations)
    const finalRecommendations = recommendations.slice(-2);

    if (finalRecommendations.length >= 2) {
        const matchProbability_p1 = compatibilityScores[finalRecommendations[0]];
        const matchProbability_p2 = compatibilityScores[finalRecommendations[1]];

        player.stage.set("matchProbability_p1", matchProbability_p1);
        player.stage.set("matchProbability_p2", matchProbability_p2);

        // console.log('matchProbability_p1');
        // console.log(matchProbability_p1);
        // console.log('matchProbability_p2');
        // console.log(matchProbability_p2);
    }

    return finalRecommendations;
}
