import elo_ratings from '../data/elo_ratings.json';
import { getBaselineRecommendation } from './RecommendationAlgorithms.js';

export function getEloRecommendation(player) {
    console.log('in getEloRecommendation function');

    const ownProfileID = player.game.get('chosenProfile');
    const finalElo = elo_ratings.profile[ownProfileID];
    const roundsPlayed = player.game.get("roundsPlayed") || 0;

    const initialElo = 1500;
    const roundsTotal = 50;
    const currentElo = initialElo + ((finalElo - initialElo) * roundsPlayed) / roundsTotal;

    // Calculate the number of profiles to include in the range
    const initialProfiles = 100;
    const finalProfiles = 2;
    let currentProfileCount;

    if (roundsPlayed <= 1) {
        currentProfileCount = initialProfiles;
    } else {
        currentProfileCount = initialProfiles - ((initialProfiles - finalProfiles) * (roundsPlayed - 1)) / (roundsTotal - 1);
    }
    
    let recommendations = getBaselineRecommendation(player);
    // If the number of profiles returned by the baseline recommendation is less than the number to consider, use all that are returned
    if (recommendations.length < currentProfileCount) {
        currentProfileCount = recommendations.length;
    }

    console.log('Initial recommendations:', recommendations);
    console.log('currentProfileCount:', currentProfileCount);

    // Sort profiles by their proximity to the current elo
    recommendations.sort((a, b) => {
        const ratingA = elo_ratings.profile[a] || 1500;
        const ratingB = elo_ratings.profile[b] || 1500;
        return Math.abs(ratingA - currentElo) - Math.abs(ratingB - currentElo);
    });

    // Select the top profiles based on the currentProfileCount
    let effectiveRecommendations = recommendations.slice(0, currentProfileCount);

    // Log the elos of all profiles in the effective recommendations
    console.log('Elos of effective recommended profiles:', effectiveRecommendations.map(id => elo_ratings.profile[id] || 1500));

    // Ensure there are at least two recommendations
    if (effectiveRecommendations.length < 2) {
        console.log('Not enough recommendations within the current range. Expanding range temporarily.');
        effectiveRecommendations = getBaselineRecommendation(player).slice(0, 2);
    }

    // Randomly select two profiles from the effective recommendations
    const topRecommendations = [];
    while (topRecommendations.length < 2 && effectiveRecommendations.length > 0) {
        const randomIndex = Math.floor(Math.random() * effectiveRecommendations.length);
        topRecommendations.push(effectiveRecommendations.splice(randomIndex, 1)[0]);
    }

    console.log('Top recommendations:', topRecommendations);
    console.log('Elo rec 1:', elo_ratings.profile[topRecommendations[0]]);
    console.log('Elo rec 2:', elo_ratings.profile[topRecommendations[1]]);

    return topRecommendations;
}
