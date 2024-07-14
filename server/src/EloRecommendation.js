import elo_ratings from '../data/elo_ratings.json';
import elo_history from '../data/elo_history.json';
import { getBaselineRecommendation } from './RecommendationAlgorithms.js';


function getOptimalRecommendations(elo_history_slice, profiles) {
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
    return recommendations.reverse(); 
}


export function getEloRecommendation(player) {

    const ownProfileID = player.game.get('chosenProfile');
    const roundsPlayed = player.game.get('roundsPlayed') || 0;
    const eloHistoryIndex = Math.max(0, Math.min(roundsPlayed - 15, 34));

    const currentElo = elo_history.profile[ownProfileID][eloHistoryIndex];
    let recommendations = getBaselineRecommendation(player);
    
    let ordered_recommendations = getOptimalRecommendations(
        elo_history.profile[ownProfileID].slice(eloHistoryIndex),
        recommendations
    );

    player.stage.set('currentElo', currentElo);

    return ordered_recommendations[0];
}