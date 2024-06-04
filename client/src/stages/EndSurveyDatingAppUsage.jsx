import { usePlayer } from '@empirica/core/player/classic/react';
import React, { useState, useEffect } from 'react';

export function EndSurveyDatingAppUsage() {
    const player = usePlayer();
    const [activeOnDatingApps, setActiveOnDatingApps] = useState('');
    const [frequency, setFrequency] = useState('');
    const [appsUsed, setAppsUsed] = useState([]);
    const [factors, setFactors] = useState({});
    const [recommendations, setRecommendations] = useState({});
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        player.round.set("activeOnDatingApps", activeOnDatingApps);
        player.round.set("frequency", frequency);
        player.round.set("appsUsed", appsUsed);
        
        Object.entries(factors).forEach(([key, value]) => {
            player.round.set(key, value);
        });

        Object.entries(recommendations).forEach(([key, value]) => {
            player.round.set(key, value);
        });

        player.stage.set("submit", true);
    };

    const handleActiveOnDatingAppsChange = (e) => {
        setActiveOnDatingApps(e.target.value);
    };

    const handleFrequencyChange = (e) => {
        setFrequency(e.target.value);
    };

    const handleAppsUsedChange = (e) => {
        const value = e.target.value;
        setAppsUsed((prev) => prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]);
    };

    const handleFactorsChange = (e) => {
        const { name, value } = e.target;
        setFactors((prev) => ({ ...prev, [name]: value }));
    };

    const handleRecommendationsChange = (e) => {
        const { name, value } = e.target;
        setRecommendations((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const factorsList = ["Political affiliation", "Race / Ethnicity", "Nationality", "Hobbies", "Income level", "Popularity on App", "Profession", "Education Level", "Relationship history", "Dietary preferences", "Height", "Number of children", "Pet ownership", "Language spoken", "Social media activity", "Physical Health", "Mental Health"];
        
        const allFactorsSelected = factorsList.every(factor => factors[`factor-${factor}`]);
        const allRecommendationsSelected = factorsList.every(factor => recommendations[`recommend-${factor}`]);

        const isAllRequiredFieldsSelected = () => {
            if (activeOnDatingApps === "I am currently active on dating apps." || activeOnDatingApps === "I am not currently active on dating apps but was in the past.") {
                return frequency && appsUsed.length > 0 && allFactorsSelected && allRecommendationsSelected;
            }
            return activeOnDatingApps && allRecommendationsSelected;
        };

        setIsSubmitEnabled(isAllRequiredFieldsSelected());
    }, [activeOnDatingApps, frequency, appsUsed, factors, recommendations]);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center overflow-auto">
            <div className="py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg flex flex-col space-y-6 overflow-y-auto" style={{ maxHeight: '90vh' }}>
                <h1 className="text-2xl font-bold text-center">Dating App Usage Survey</h1>
                <form className="space-y-6 divide-y divide-gray-200" onSubmit={handleFormSubmit}>
                    
                    <div className="space-y-4">
                        <label className="block text-lg font-medium text-gray-700 py-4">Are you currently active on any dating apps?</label>
                        {["I am currently active on dating apps.", "I am not currently active on dating apps but was in the past.", "I have never been active on a dating app", "Prefer not to answer"].map((option, idx) => (
                            <div key={idx} className="flex items-start">
                                <input
                                    id={`activeDating-${idx}`}
                                    name="activeDating"
                                    type="radio"
                                    value={option}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    onChange={handleActiveOnDatingAppsChange}
                                />
                                <label htmlFor={`activeDating-${idx}`} className="ml-3 text-sm text-gray-700">
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>

                    {(activeOnDatingApps === "I am currently active on dating apps." || activeOnDatingApps === "I am not currently active on dating apps but was in the past.") && (
                        <>
                            <div className="space-y-4 pt-4">
                                <label className="block text-lg font-medium text-gray-700 py-4">If you are currently active on dating apps or have been in the past, how frequently do/did you use them?</label>
                                {["Multiple times a day", "Daily", "A few times a week", "Once a week", "Less than once a week", "Prefer not to answer"].map((option, idx) => (
                                    <div key={idx} className="flex items-start">
                                        <input
                                            id={`frequency-${idx}`}
                                            name="frequency"
                                            type="radio"
                                            value={option}
                                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                            onChange={handleFrequencyChange}
                                        />
                                        <label htmlFor={`frequency-${idx}`} className="ml-3 text-sm text-gray-700">
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-4">
                                <label className="block text-lg font-medium text-gray-700 py-4">Which dating apps have you used before? (Check all that apply)</label>
                                {["Tinder", "Bumble", "Hinge", "OkCupid", "Plenty of Fish (PoF)", "HER", "Coffee Meets Bagel", "eHarmony", "Grindr", "Other (please specify)", "Prefer not to answer"].map((option, idx) => (
                                    <div key={idx} className="flex items-start">
                                        <input
                                            id={`appsUsed-${idx}`}
                                            name="appsUsed"
                                            type="checkbox"
                                            value={option}
                                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                            onChange={handleAppsUsedChange}
                                        />
                                        <label htmlFor={`appsUsed-${idx}`} className="ml-3 text-sm text-gray-700">
                                            {option}
                                        </label>
                                        {option === "Other (please specify)" && <input type="text" className="ml-3 mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4">
                                <label className="block text-lg font-medium text-gray-700 py-4">What factors would you consider when determining if someone is a good match on a dating app? Rank each:</label>
                                <table className="min-w-full divide-y divide-gray-200 mt-4">
                                    <thead>
                                        <tr>
                                            <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Factor</th>
                                            {["Very Important", "Quite Important", "Not Very Important", "Not Important", "Prefer not to Answer"].map((option, idx) => (
                                                <th key={idx} className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{option}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {["Political affiliation", "Race / Ethnicity", "Nationality", "Hobbies", "Income level", "Popularity on App", "Profession", "Education Level", "Relationship history", "Dietary preferences", "Height", "Number of children", "Pet ownership", "Language spoken", "Social media activity", "Physical Health", "Mental Health"].map((factor, idx) => (
                                            <tr key={idx}>
                                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{factor}</td>
                                                {["Very Important", "Quite Important", "Not Very Important", "Not Important", "Prefer not to Answer"].map((option, idy) => (
                                                    <td key={idy} className="px-2 py-2 whitespace-nowrap">
                                                        <input
                                                            id={`factor-${factor}-${option}`}
                                                            name={`factor-${factor}`}
                                                            type="radio"
                                                            value={option}
                                                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                            onChange={handleFactorsChange}
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    <div className="mt-4">
                        <label className="block text-lg font-medium text-gray-700 py-4">Dating apps take into account various aspects of user profiles to decide whether or not to recommend profiles to each other. Which of the following do you think they should be allowed to use? Rank each:</label>
                        <table className="min-w-full divide-y divide-gray-200 mt-4">
                            <thead>
                                <tr>
                                    <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Factor</th>
                                    {["Should definitely use", "Should maybe use", "Should maybe not use", "Should definitely not use", "Prefer not to Answer"].map((option, idx) => (
                                        <th key={idx} className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{option}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {["Political affiliation", "Race / Ethnicity", "Nationality", "Hobbies", "Income level", "Popularity on App", "Profession", "Education Level", "Relationship history", "Dietary preferences", "Height", "Number of children", "Pet ownership", "Language spoken", "Social media activity", "Physical Health", "Mental Health"].map((factor, idx) => (
                                    <tr key={idx}>
                                        <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{factor}</td>
                                        {["Should definitely use", "Should maybe use", "Should maybe not use", "Should definitely not use", "Prefer not to Answer"].map((option, idy) => (
                                            <td key={idy} className="px-2 py-2 whitespace-nowrap">
                                                <input
                                                    id={`recommend-${factor}-${option}`}
                                                    name={`recommend-${factor}`}
                                                    type="radio"
                                                    value={option}
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    onChange={handleRecommendationsChange}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="pt-5">
                        <div className="flex justify-end">
                            <button 
                                type="submit" 
                                className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${isSubmitEnabled ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'bg-gray-400 cursor-not-allowed'}`} 
                                disabled={!isSubmitEnabled}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}
