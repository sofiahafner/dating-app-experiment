import profiles from '../data/peep_profiles.json';
import profile_bios from '../data/profile_bios.json';

export function getRandomRecommendation(player, ownProfileID) {
    const pastOpponentIDs = (player.get("opponentIDs") || []).map(id => parseInt(id));


    const otherProfiles = profiles.filter(p => {
        const profileID = parseInt(p.profile_ID);
        return profileID !== parseInt(ownProfileID) && !pastOpponentIDs.includes(profileID);
    });

    if (otherProfiles.length === 0) {
        return null; 
    }

    const randomIndex = Math.floor(Math.random() * otherProfiles.length);
    return otherProfiles[randomIndex].profile_ID;
}