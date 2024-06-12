import profiles from '../../client/data/peep_profiles.json'

const calculateUserPreferences = (likedProfiles, dislikedProfiles) => {
    let preferences = { beard: 0, noBeard: 0, shortHair: 0, longHair: 0 };
    let comparisons = { beard: 0, hair: 0 };

    likedProfiles.forEach((likedID, index) => {
        const dislikedID = dislikedProfiles[index];
        const likedProfile = profiles.find(p => parseInt(p.profile_ID) === likedID);
        const dislikedProfile = profiles.find(p => parseInt(p.profile_ID) === dislikedID);

        if (likedProfile && dislikedProfile) {
            if (likedProfile.has_facial_hair && !dislikedProfile.has_facial_hair) preferences.beard++, comparisons.beard++;
            if (!likedProfile.has_facial_hair && dislikedProfile.has_facial_hair) preferences.noBeard++, comparisons.beard++;
            if (likedProfile.hair_short && !dislikedProfile.hair_short) preferences.shortHair++, comparisons.hair++;
            if (!likedProfile.hair_short && dislikedProfile.hair_short) preferences.longHair++, comparisons.hair++;
        }
    });

    return {
        beard: comparisons.beard ? preferences.beard / comparisons.beard : 0,
        noBeard: comparisons.beard ? preferences.noBeard / comparisons.beard : 0,
        shortHair: comparisons.hair ? preferences.shortHair / comparisons.hair : 0,
        longHair: comparisons.hair ? preferences.longHair / comparisons.hair : 0,
    };
};

export function getBaselineRecommendation(player, ownProfileID) {
    const pastOpponentIDs = (player.get("opponentIDs") || []).map(id => parseInt(id));
    const likedProfiles = player.get("likedProfiles") || [];
    const dislikedProfiles = player.get("dislikedProfiles") || [];
    const userPreferences = calculateUserPreferences(likedProfiles, dislikedProfiles);

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

    const strongPreference = preferences.find(p => p.value > 0.75);
    if (strongPreference) {
        otherProfiles = otherProfiles.filter(strongPreference.filter);
    }

    return otherProfiles.map(p => p.profile_ID);
}

export function getRandomRecommendation(player) {
    const ownProfileID = player.get("profile_ID")
    const recommendations = getBaselineRecommendation(player, ownProfileID);
    if (recommendations.length <= 2) {
        return recommendations;
    }

    const randomProfile1 = recommendations[Math.floor(Math.random() * recommendations.length)];
    const remainingProfiles = recommendations.filter(id => id !== randomProfile1);
    const randomProfile2 = remainingProfiles[Math.floor(Math.random() * remainingProfiles.length)];

    return [randomProfile1, randomProfile2].sort(() => Math.random() - 0.5);
}
