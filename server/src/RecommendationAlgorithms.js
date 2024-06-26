import profiles from '../data/peep_profiles.json';
import likesPastRounds from '../data/likesPastRounds.json';


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

        strongPreferences.forEach(pref => {
            otherProfiles = otherProfiles.filter(pref.filter);
        });
    } else {
        player.stage.set("strongPreferenceDetected", "False");
        player.stage.set("strongPreferences", []);
    }

    return otherProfiles.map(p => p.profile_ID);
}


export function getRandomRecommendation(player) {
    // const ownProfileID = player.game.get('chosenProfile');
    // const likedProfiles = player.game.get('likedProfiles') || [];
    // const dislikedProfiles = player.game.get('dislikedProfiles') || [];

    const recommendations = getBaselineRecommendation(player);

    if (recommendations.length <= 2) {
        return recommendations.length > 0 ? recommendations : [1, 2];
    }

    const randomProfile1 = recommendations[Math.floor(Math.random() * recommendations.length)];
    const remainingProfiles = recommendations.filter(id => id !== randomProfile1);
    const randomProfile2 = remainingProfiles[Math.floor(Math.random() * remainingProfiles.length)];

    return [randomProfile1, randomProfile2];
}

const K = 32;

function calculateEloRating(playerRating, opponentRating, outcome) {
    const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
    return playerRating + K * (outcome - expectedScore);
}

function updateEloRatings(likesPastRounds) {
    const eloRatings = {};

    likesPastRounds.forEach(round => {
        const likedProfile = round.likedProfile;
        const dislikedProfile = round.dislikedProfile;
        const current_chosenProfileID = round.chosenProfileID;

        if (!(likedProfile in eloRatings)) {
            eloRatings[likedProfile] = 1000; // Initial Elo rating
        }
        if (!(dislikedProfile in eloRatings)) {
            eloRatings[dislikedProfile] = 1000;
        }
        if (!(current_chosenProfileID in eloRatings)) {
            eloRatings[current_chosenProfileID] = 1000;
        }

        const likedProfileRating = eloRatings[likedProfile];
        const dislikedProfileRating = eloRatings[dislikedProfile];
        const current_chosenProfileID_Rating = eloRatings[current_chosenProfileID];

        const updatedLikedProfileRating = calculateEloRating(current_chosenProfileID_Rating,likedProfileRating, 1); // Liked profile wins
        const updatedDislikedProfileRating = calculateEloRating(current_chosenProfileID_Rating, dislikedProfileRating, 0); // Disliked profile loses

        eloRatings[likedProfile] = updatedLikedProfileRating;
        eloRatings[dislikedProfile] = updatedDislikedProfileRating;
    });

    return eloRatings;
}

export function getFinalEloRating(ownProfileID) {
    const eloRatings = {};

    likesPastRounds.forEach(round => {
        const likedProfile = round.likedProfile;
        const dislikedProfile = round.dislikedProfile;
        const current_chosenProfileID = round.chosenProfileID;

        if (!(likedProfile in eloRatings)) {
            eloRatings[likedProfile] = 1000; // Initial Elo rating
        }
        if (!(dislikedProfile in eloRatings)) {
            eloRatings[dislikedProfile] = 1000;
        }
        if (!(current_chosenProfileID in eloRatings)) {
            eloRatings[current_chosenProfileID] = 1000;
        }

        const likedProfileRating = eloRatings[likedProfile];
        const dislikedProfileRating = eloRatings[dislikedProfile];
        const current_chosenProfileID_Rating = eloRatings[current_chosenProfileID];

        const updatedLikedProfileRating = calculateEloRating(current_chosenProfileID_Rating,likedProfileRating, 1); // Liked profile wins
        const updatedDislikedProfileRating = calculateEloRating(current_chosenProfileID_Rating, dislikedProfileRating, 0); // Disliked profile loses

        eloRatings[likedProfile] = updatedLikedProfileRating;
        eloRatings[dislikedProfile] = updatedDislikedProfileRating;
    });

    return eloRatings[ownProfileID]||1000;
}

export function getEloRecommendation(player) {
    const ownProfileID = player.game.get('chosenProfile');
    const finalElo = player.game.get('finalElo');
    const likedProfiles = player.game.get('likedProfiles') || [];
    const dislikedProfiles = player.game.get('dislikedProfiles') || [];
    const roundsPlayed = player.game.get("roundsPlayed") || 0;

    let currentElo = 1000;
    const increment = (finalElo - currentElo) / 50;
    if (roundsPlayed <= 50) {
        currentElo += increment * roundsPlayed;
    } else {
        currentElo = finalElo;
    }

    const recommendations = getBaselineRecommendation(player);

    if (recommendations.length <= 2) {
        return recommendations.length > 0 ? recommendations : [1, 2];
    }

    const eloRatings = updateEloRatings(likesPastRounds);

    recommendations.sort((a, b) => {
        const ratingA = eloRatings[a] || 1000;
        const ratingB = eloRatings[b] || 1000;
        const diffA = Math.abs(ratingA - currentElo);
        const diffB = Math.abs(ratingB - currentElo);
        return diffA - diffB;
    });
    const topRecommendations = recommendations.slice(0, 2);

    return topRecommendations;
}


// Helper function to calculate the similarity between two profiles
const calculateProfileSimilarity = (profile1, profile2) => {
    let similarity = 0;
    if (profile1.accessories === profile2.accessories) similarity++;
    if (profile1.face === profile2.face) similarity++;
    if (profile1.facial_hair === profile2.facial_hair) similarity++;
    if (profile1.hair === profile2.hair) similarity++;
    if (profile1.pose === profile2.pose) similarity++;
    if (profile1.skin_tone === profile2.skin_tone) similarity++;
    if (profile1.age === profile2.age) similarity++;
    if (profile1.main_hobby === profile2.main_hobby) similarity++;
    if (profile1.hobby_1 === profile2.hobby_1) similarity++;
    if (profile1.hobby_2 === profile2.hobby_2) similarity++;
    if (profile1.hair_color === profile2.hair_color) similarity++;
    if (profile1.clothes_color === profile2.clothes_color) similarity++;
    if (profile1.job_type === profile2.job_type) similarity++;
    if (profile1.job === profile2.job) similarity++;
    if (profile1.hair_short === profile2.hair_short) similarity++;
    if (profile1.hair_curly === profile2.hair_curly) similarity++;
    if (profile1.hair_braided === profile2.hair_braided) similarity++;
    if (profile1.has_facial_hair === profile2.has_facial_hair) similarity++;
    if (profile1.has_accessories === profile2.has_accessories) similarity++;
    return similarity;
};

// Calculate user preferences for each characteristic
const calculateUserPreferences = (likedProfiles, dislikedProfiles) => {
    const preferenceScores = {
        accessories: 0,
        face: 0,
        facial_hair: 0,
        hair: 0,
        pose: 0,
        skin_tone: 0,
        age: 0,
        main_hobby: 0,
        hobby_1: 0,
        hobby_2: 0,
        hair_color: 0,
        clothes_color: 0,
        job_type: 0,
        job: 0,
        hair_short: 0,
        hair_curly: 0,
        hair_braided: 0,
        has_facial_hair: 0,
        has_accessories: 0,
    };

    const updateScores = (profile, increment) => {
        Object.keys(preferenceScores).forEach(key => {
            if (profile[key]) {
                preferenceScores[key] += increment;
            }
        });
    };

    likedProfiles.forEach(likedID => {
        const likedProfile = profiles.find(p => parseInt(p.profile_ID) === parseInt(likedID));
        if (likedProfile) updateScores(likedProfile, 1);
    });

    dislikedProfiles.forEach(dislikedID => {
        const dislikedProfile = profiles.find(p => parseInt(p.profile_ID) === parseInt(dislikedID));
        if (dislikedProfile) updateScores(dislikedProfile, -1);
    });

    // Normalize the scores
    const totalProfiles = likedProfiles.length + dislikedProfiles.length;
    Object.keys(preferenceScores).forEach(key => {
        preferenceScores[key] /= totalProfiles;
    });

    return preferenceScores;
};

const calculateUCBValue = (successes, trials, totalTrials) => {
    if (trials === 0) return Infinity;
    const exploitation = successes / trials;
    const exploration = Math.sqrt((2 * Math.log(totalTrials)) / trials);
    return exploitation + exploration;
};

const getSiameseBanditRecommendation = (player) => {
    const ownProfileID = player.game.get('chosenProfile');
    const likedProfiles = player.game.get('likedProfiles') || [];
    const dislikedProfiles = player.game.get('dislikedProfiles') || [];
    const roundsPlayed = player.game.get("roundsPlayed") || 0;
    const userPreferences = calculateUserPreferences(likedProfiles, dislikedProfiles);

    const otherProfiles =  getBaselineRecommendation(player);

    const ucbValues = otherProfiles.map(profile => {
        let successes = 0;
        let trials = 0;

        likesPastRounds.forEach(round => {
            const participantProfile = profiles.find(p => parseInt(p.profile_ID) === parseInt(round.chosenProfileID));
            if (participantProfile) {
                const similarity = calculateProfileSimilarity(participantProfile, profile);
                if (similarity > 5) { // Threshold for considering profiles as similar
                    trials++;
                    if (round.likedProfile === profile.profile_ID) successes++;
                }
            }
        });

        // Adjust UCB value based on user preferences
        let ucbValue = calculateUCBValue(successes, trials, roundsPlayed);

        Object.keys(userPreferences).forEach(key => {
            if (profile[key]) {
                ucbValue += userPreferences[key]; // Boost or penalize based on user preference
            }
        });

        return {
            profile_ID: profile.profile_ID,
            ucbValue: ucbValue
        };
    });

    ucbValues.sort((a, b) => b.ucbValue - a.ucbValue);
    const topRecommendations = ucbValues.slice(0, 2).map(ucb => ucb.profile_ID);

    return [1,2];
};

export function getNextRecommendation(player) {

    const likedProfiles = player.game.get('likedProfiles') || [];
    if (likedProfiles.length < 15) {
        return getRandomRecommendation(player);
    }

    // After 15 recs rec system decides next recommendations depending on treatment group
    const recAlgorithm = player.game.get("recAlgorithm");
    if (recAlgorithm === 'random') {
        return getRandomRecommendation(player);
    }
    if (recAlgorithm === 'elo') {
        return getEloRecommendation(player);
    }
    if (recAlgorithm === 'siameseBandit') {
        return getSiameseBanditRecommendation(player);
    }
}



