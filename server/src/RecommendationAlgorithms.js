import profiles from '../data/peep_profiles.json';
import likesPastRounds from '../data/likesPastRounds.json';
import {getEloRecommendation} from './EloRecommendation.js'
import {getSiameseBanditRecommendation} from './SiameseBanditRecommendation.js'
import {getEuclideanRecommendation} from './EuclideanRecommendation.js'

const calculateUserPreferences_Gender = (likedProfiles, dislikedProfiles) => {
    let preferences = { beard: 0, noBeard: 0, shortHair: 0, longHair: 0 };
    let comparisons = { beard: 0, hair: 0 };

    likedProfiles.forEach((likedID, index) => {
        const dislikedID = dislikedProfiles[index];
        const likedProfile = profiles.find(p => parseInt(p.profile_ID) === parseInt(likedID));
        const dislikedProfile = profiles.find(p => parseInt(p.profile_ID) === parseInt(dislikedID));

        if (likedProfile && dislikedProfile) {
            if (likedProfile.has_facial_hair && !dislikedProfile.has_facial_hair) {
                preferences.beard++;
                comparisons.beard++;
            } else if (!likedProfile.has_facial_hair && dislikedProfile.has_facial_hair) {
                preferences.noBeard++;
                comparisons.beard++;
            }

            if (likedProfile.hair_short && !dislikedProfile.hair_short) {
                preferences.shortHair++;
                comparisons.hair++;
            } else if (!likedProfile.hair_short && dislikedProfile.hair_short) {
                preferences.longHair++;
                comparisons.hair++;
            }
        }
    });

    return {
        beard: comparisons.beard ? preferences.beard / comparisons.beard : 0,
        noBeard: comparisons.beard ? preferences.noBeard / comparisons.beard : 0,
        shortHair: comparisons.hair ? preferences.shortHair / comparisons.hair : 0,
        longHair: comparisons.hair ? preferences.longHair / comparisons.hair : 0,
    };
};


export function getBaselineRecommendation(player) {
    const ownProfileID = player.game.get('chosenProfile');
    const likedProfiles = player.game.get('likedProfiles') || [];
    const dislikedProfiles = player.game.get('dislikedProfiles') || [];
    

    const pastOpponentIDs = [...likedProfiles, ...dislikedProfiles].map(id => parseInt(id));
    const userPreferences = calculateUserPreferences_Gender(likedProfiles, dislikedProfiles);
    

    let otherProfiles = profiles.filter(p => !pastOpponentIDs.includes(parseInt(p.profile_ID)) && parseInt(p.profile_ID) !== parseInt(ownProfileID));

    if (likedProfiles.length < 15) {
        return otherProfiles.map(p => p.profile_ID);
    }
    

    const preferences = [
        { key: 'beard', value: userPreferences.beard, filter: p => p.has_facial_hair },
        { key: 'noBeard', value: userPreferences.noBeard, filter: p => !p.has_facial_hair },
        { key: 'shortHair', value: userPreferences.shortHair, filter: p => p.hair_short },
        { key: 'longHair', value: userPreferences.longHair, filter: p => !p.hair_short },
    ];

    player.stage.set("genderPreferences", preferences);

    const strongPreferences = preferences.filter(p => p.value > 0.70);
    if (strongPreferences.length > 0) {
        player.stage.set("strongPreferenceDetected", "True");
        const detectedPreferences = strongPreferences.map(p => p.key);
        player.stage.set("strongPreferences", detectedPreferences);
        strongPreferences.forEach((pref, index) => {
            const tempProfiles = otherProfiles.filter(pref.filter);
            if (index === 0 || tempProfiles.length >= 100 - pastOpponentIDs.length + 10) {
                otherProfiles = tempProfiles;
            }
        });
    } else {
        player.stage.set("strongPreferenceDetected", "False");
        player.stage.set("strongPreferences", []);
    }
    return otherProfiles.map(p => p.profile_ID);
}




export function getRandomRecommendation(player) {
    const recommendations = getBaselineRecommendation(player);

    if (recommendations.length <= 2) {
        return recommendations.length > 0 ? recommendations : [1, 2];
    }

    const randomProfile1 = recommendations[Math.floor(Math.random() * recommendations.length)];
    const remainingProfiles = recommendations.filter(id => id !== randomProfile1);
    const randomProfile2 = remainingProfiles[Math.floor(Math.random() * remainingProfiles.length)];

    return [randomProfile1, randomProfile2];
}



export function getNextRecommendation(player) {
    try {
        const likedProfiles = player.game.get('likedProfiles') || [];
        if (likedProfiles.length < 15) {
            return validateRecommendation(getRandomRecommendation(player));
        }

        const recAlgorithm = player.game.get("recAlgorithm");
        if (recAlgorithm === 'random') {
            return validateRecommendation(getRandomRecommendation(player));
        }
        if (recAlgorithm === 'elo') {
            // console.log('getting elo recommendation')
            return validateRecommendation(getEloRecommendation(player));
        }
        if (recAlgorithm === 'siameseBandit') {
            return validateRecommendation(getSiameseBanditRecommendation(player));
        }

        if (recAlgorithm === 'euclidean') {
            return validateRecommendation(getEuclideanRecommendation(player));
        }

        player.stage.set('error', 'Undefined recommendation algorithm');
        return [getRandomInt(1, 255), getRandomInt(1, 255)];

    } catch (error) {
        player.stage.set('error', `Error occurred: ${error.message}`);
        return [getRandomInt(1, 255), getRandomInt(1, 255)];
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function validateRecommendation(recommendation) {
    if (Array.isArray(recommendation) &&
        recommendation.length === 2 &&
        Number.isInteger(recommendation[0]) &&
        Number.isInteger(recommendation[1])) {
        return recommendation;
    } else {
        return [getRandomInt(1, 255), getRandomInt(1, 255)];
    }
}
