import profiles from '../data/peep_profiles.json';
import character_traits_simplified from '../data/character_traits_simplified.json';
import character_preferences from '../data/character_preferences.json';
import { getBaselineRecommendation } from './RecommendationAlgorithms.js';


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



function upperConfidenceInterval(mean, variance, sampleSize) {
    if (sampleSize === 0) return mean;
    const z = 1.96;
    const standardDeviation = Math.sqrt(variance);
    const standardError = standardDeviation / Math.sqrt(sampleSize);
    const marginOfError = z * standardError;
    return mean + marginOfError;
}

function traitsFitPreference(preferences, traits) {
    let sumUCI = 0;
    let count = 0;
    for (let trait in traits) {
        if (preferences[trait]) {
            let mean = preferences[trait].mean;
            let variance = preferences[trait].variance;
            let n = preferences[trait].n;
            let UCI = upperConfidenceInterval(mean, variance, n);
            sumUCI += UCI;
            count++;
        }
    }
    if (count === 0) return 0; // Handle empty traits
    return sumUCI / count;
}


function calculateConfidence(preferences1, traits1, preferences2, traits2) {
    let p1_likes_p2 = traitsFitPreference(preferences1, traits2);
    if (Object.values(preferences2).every(pref => pref.n === 0)) {
        return p1_likes_p2;
    }
    let p2_likes_p1 = traitsFitPreference(preferences2, traits1);
    return (p1_likes_p2 + p2_likes_p1) / 2;
}


export function getSiameseBanditRecommendation(player) {
    const roundsPlayed = player.game.get('roundsPlayed') || 0;
    const ownProfileID = player.game.get('chosenProfile');
    let recommendations = getBaselineRecommendation(player);

    const own_preferences = buildPreferenceDictionary(player);
    const own_traits = character_traits_simplified[ownProfileID];

    const confidenceScores = {};
    recommendations.forEach(profileID => {
        confidenceScores[profileID] = calculateConfidence(
            own_preferences, 
            own_traits, 
            character_preferences[profileID], 
            character_traits_simplified[profileID]
        );
    });

    recommendations.sort((a, b) => confidenceScores[b] - confidenceScores[a]);
    const maxRecommendations = 100 - (roundsPlayed *2);
    recommendations = recommendations.slice(0, maxRecommendations);

    // console.log('Confidence scores of top recommendations:');
    // recommendations.forEach(profileID => {
    //     console.log(`Profile ID: ${profileID}, Confidence Score: ${confidenceScores[profileID]}`);
    // });

    const finalRecommendations = recommendations.slice(-2);
    // console.log(finalRecommendations);

    // console.log('own_preferences')
    // console.log(own_preferences)

    if (finalRecommendations.length >= 2) {
        const matchProbability_p1 = confidenceScores[finalRecommendations[0]];
        const matchProbability_p2 = confidenceScores[finalRecommendations[1]];

        player.stage.set("matchProbability_p1", matchProbability_p1);
        player.stage.set("matchProbability_p2", matchProbability_p2);

        // console.log('matchProbability_p1');
        // console.log(matchProbability_p1);
        // console.log('matchProbability_p2');
        // console.log(matchProbability_p2);
    }

    return finalRecommendations;
}
