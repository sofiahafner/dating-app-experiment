// import profiles from '../data/peep_profiles.json';
// import profile_bios from '../data/profile_bios.json';

// export function getRandomRecommendation(player, ownProfileID) {
//     const pastOpponentIDs = (player.get("opponentIDs") || []).map(id => parseInt(id));
//     console.log(pastOpponentIDs)

//     const otherProfiles = profiles.filter(p => {
//         const profileID = parseInt(p.profile_ID);
//         return profileID !== parseInt(ownProfileID) && !pastOpponentIDs.includes(profileID);
//     });

//     if (otherProfiles.length === 0) {
//         return null; 
//     }

//     const randomIndex = Math.floor(Math.random() * otherProfiles.length);
//     return otherProfiles[randomIndex].profile_ID;
// }


export function getRandomRecommendation(player, ownProfileID) {
    const pastOpponentIDs = (player.get("opponentIDs") || []).map(id => parseInt(id));
    const player_round = player.get("roundsPlayed") + 1 || 0;
    const likedProfiles = player.get("likedProfiles") || [];

    console.log(`Round: ${player_round}`);
    console.log(`Past Opponent IDs: ${pastOpponentIDs}`);
    console.log(`Liked Profiles: ${likedProfiles}`);

    const hasLikedBeard = likedProfiles.filter(id => {
        const profile = profiles.find(p => parseInt(p.profile_ID) === id);
        return profile && profile.has_facial_hair && profile.hair_short;
    }).length >= 8;

    const hasLikedNoBeard = likedProfiles.filter(id => {
        const profile = profiles.find(p => parseInt(p.profile_ID) === id);
        return profile && !profile.has_facial_hair && !profile.hair_short;
    }).length >= 8;

    console.log(`Has Liked Beard: ${hasLikedBeard}`);
    console.log(`Has Liked No Beard: ${hasLikedNoBeard}`);

    let otherProfiles = profiles.filter(p => {
        const profileID = parseInt(p.profile_ID);
        return profileID !== parseInt(ownProfileID) && !pastOpponentIDs.includes(profileID);
    });

    const getRandomProfile = (profiles) => {
        if (profiles.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * profiles.length);
        return profiles[randomIndex].profile_ID;
    };

    const beardAndShortHairProfiles = otherProfiles.filter(p => p.has_facial_hair && p.hair_short);
    const noBeardAndLongHairProfiles = otherProfiles.filter(p => !p.has_facial_hair && !p.hair_short);

    console.log(`Beard and Short Hair Profiles: ${beardAndShortHairProfiles.map(p => p.profile_ID)}`);
    console.log(`No Beard and Long Hair Profiles: ${noBeardAndLongHairProfiles.map(p => p.profile_ID)}`);

    if (player_round <= 10) {
        if (beardAndShortHairProfiles.length > 0 && noBeardAndLongHairProfiles.length > 0) {
            return [
                getRandomProfile(beardAndShortHairProfiles),
                getRandomProfile(noBeardAndLongHairProfiles),
            ];
        } else {
            console.log("Insufficient variety in initial 10 rounds. Fallback to random profiles.");
        }
    } else if (hasLikedBeard) {
        otherProfiles = beardAndShortHairProfiles;
        console.log(`Filtering for Beard and Short Hair Profiles: ${otherProfiles.map(p => p.profile_ID)}`);
    } else if (hasLikedNoBeard) {
        otherProfiles = noBeardAndLongHairProfiles;
        console.log(`Filtering for No Beard and Long Hair Profiles: ${otherProfiles.map(p => p.profile_ID)}`);
    }

    const randomProfile1 = getRandomProfile(otherProfiles);
    const remainingProfiles = otherProfiles.filter(p => parseInt(p.profile_ID) !== parseInt(randomProfile1));
    const randomProfile2 = getRandomProfile(remainingProfiles);

    console.log(`Random Profile 1: ${randomProfile1}`);
    console.log(`Random Profile 2: ${randomProfile2}`);

    if (randomProfile1 && randomProfile2) {
        return [randomProfile1, randomProfile2];
    }

    const fallbackProfile1 = randomProfile1 || getRandomProfile(profiles.filter(p => !pastOpponentIDs.includes(parseInt(p.profile_ID))));
    const fallbackProfile2 = randomProfile2 || getRandomProfile(profiles.filter(p => !pastOpponentIDs.includes(parseInt(p.profile_ID)) && parseInt(p.profile_ID) !== parseInt(fallbackProfile1)));

    console.log(`Fallback Profile 1: ${fallbackProfile1}`);
    console.log(`Fallback Profile 2: ${fallbackProfile2}`);

    return [fallbackProfile1, fallbackProfile2];
}


import profiles from '../data/peep_profiles.json';

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
    const getRandomProfile = (profiles) => profiles.length ? profiles[Math.floor(Math.random() * profiles.length)] : null;

    if (likedProfiles.length < 15) {
        const randomProfile1 = getRandomProfile(otherProfiles);
        const remainingProfiles = otherProfiles.filter(p => p.profile_ID !== randomProfile1?.profile_ID);
        const randomProfile2 = getRandomProfile(remainingProfiles);

        if (randomProfile1 && randomProfile2) {
            return [randomProfile1.profile_ID, randomProfile2.profile_ID].sort(() => Math.random() - 0.5);
        }

        const fallbackProfiles = profiles.filter(p => !pastOpponentIDs.includes(parseInt(p.profile_ID)) && p.profile_ID !== randomProfile1?.profile_ID);
        const fallbackProfile1 = randomProfile1 ? randomProfile1.profile_ID : getRandomProfile(fallbackProfiles)?.profile_ID;
        const fallbackProfile2 = randomProfile2 ? randomProfile2.profile_ID : getRandomProfile(fallbackProfiles.filter(p => p.profile_ID !== fallbackProfile1))?.profile_ID;

        return [fallbackProfile1, fallbackProfile2].sort(() => Math.random() - 0.5);
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

    const randomProfile1 = getRandomProfile(otherProfiles);
    const remainingProfiles = otherProfiles.filter(p => p.profile_ID !== randomProfile1?.profile_ID);
    const randomProfile2 = getRandomProfile(remainingProfiles);

    if (randomProfile1 && randomProfile2) {
        return [randomProfile1.profile_ID, randomProfile2.profile_ID].sort(() => Math.random() - 0.5);
    }

    const fallbackProfiles = profiles.filter(p => !pastOpponentIDs.includes(parseInt(p.profile_ID)) && p.profile_ID !== randomProfile1?.profile_ID);
    const fallbackProfile1 = randomProfile1 ? randomProfile1.profile_ID : getRandomProfile(fallbackProfiles)?.profile_ID;
    const fallbackProfile2 = randomProfile2 ? randomProfile2.profile_ID : getRandomProfile(fallbackProfiles.filter(p => p.profile_ID !== fallbackProfile1))?.profile_ID;

    return [fallbackProfile1, fallbackProfile2].sort(() => Math.random() - 0.5);
}
