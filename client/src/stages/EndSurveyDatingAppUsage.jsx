import { usePlayer } from '@empirica/core/player/classic/react';
import React, { useState, useEffect } from 'react';

export function EndSurveyDatingAppUsage() {
    const player = usePlayer();
    const [activeOnDatingApps, setActiveOnDatingApps] = useState('');
    const [appsUsed, setAppsUsed] = useState([]);
    const [otherApp, setOtherApp] = useState(''); // State to hold the other app specified
    const [factors, setFactors] = useState({});
    const [recommendations, setRecommendations] = useState({});
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        player.stage.set("EndDatingAppSurvey_activeOnDatingApps", activeOnDatingApps);
        player.stage.set("EndDatingAppSurvey_datingAppsUsed", appsUsed);
        if (otherApp) {
            player.stage.set("EndDatingAppSurvey_otherAppUsed", otherApp);
        }

        Object.entries(factors).forEach(([key, value]) => {
            player.stage.set(`EndDatingAppSurvey_PersonalInfluenceFactors${key.charAt(0).toUpperCase() + key.slice(1)}`, value);
        });

        Object.entries(recommendations).forEach(([key, value]) => {
            player.stage.set(`EndDatingAppSurvey_AlgorithmShouldUse${key.charAt(0).toUpperCase() + key.slice(1)}`, value);
        });

        player.stage.set("submit", true);
    };

    const handleActiveOnDatingAppsChange = (e) => {
        setActiveOnDatingApps(e.target.value);
    };

    const handleAppsUsedChange = (e) => {
        const value = e.target.value;
        if (value === "Other (please specify)") {
            setOtherApp('');
        }
        setAppsUsed((prev) => prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]);
    };

    const handleOtherAppChange = (e) => {
        setOtherApp(e.target.value);
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
        const factorsList = ["Appearance", "Age", "Hobbies", "Profession", "Education Level", "Ethnicity"];
        
        const allFactorsSelected = factorsList.every(factor => factors[`factor-${factor}`]);
        const allRecommendationsSelected = factorsList.every(factor => recommendations[`recommend-${factor}`]);

        const isAllRequiredFieldsSelected = () => {
            if (activeOnDatingApps === "I am currently active on dating apps." || activeOnDatingApps === "I am not currently active on dating apps but was in the past.") {
                return appsUsed.length > 0 && allFactorsSelected && allRecommendationsSelected;
            }
            return activeOnDatingApps && allRecommendationsSelected;
        };

        setIsSubmitEnabled(isAllRequiredFieldsSelected());
    }, [activeOnDatingApps, appsUsed, factors, recommendations]);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center overflow-auto">
            <div className="py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg flex flex-col space-y-6 overflow-y-auto" style={{ maxHeight: '90vh' }}>
                <h1 className="text-2xl font-bold text-center">Dating App Usage Survey</h1>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-lg font-medium text-gray-700">You will now be asked questions about your personal experiences with dating apps, not specifically relating to the previous experiment.</p>
                </div>
                <form className="space-y-6 divide-y divide-gray-200" onSubmit={handleFormSubmit}>
                    
                    <div className="space-y-4">
                        <label className="block text-lg font-medium text-gray-700 py-4">Are you currently active on any dating apps?</label>
                        {["I am currently active on dating apps.", "I am not currently active on dating apps but was in the past.", "I have never been active on a dating app"].map((option, idx) => (
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
                                <label className="block text-lg font-medium text-gray-700 py-4">Which dating apps have you used before? (Check all that apply)</label>
                                {["Tinder", "Bumble", "Hinge", "OkCupid", "Plenty of Fish (PoF)", "HER", "Coffee Meets Bagel", "eHarmony", "Grindr", "Feeld", "Other (please specify)"].map((option, idx) => (
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
                                        {option === "Other (please specify)" && (
                                            <input 
                                                type="text" 
                                                className="ml-3 mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                                value={otherApp}
                                                onChange={handleOtherAppChange}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4">
                                <label className="block text-lg font-medium text-gray-700 py-4">What factors would you consider when determining if someone is a good match on a dating app? Rank each:</label>
                                <table className="min-w-full divide-y divide-gray-200 mt-4">
                                    <thead>
                                        <tr>
                                            <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Factor</th>
                                            {["Very Important", "Quite Important", "Not Very Important", "Not Important", "Prefer not to answer"].map((option, idx) => (
                                                <th key={idx} className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{option}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {["Appearance", "Age", "Hobbies", "Profession", "Education Level", "Ethnicity"].map((factor, idx) => (
                                            <tr key={idx}>
                                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{factor}</td>
                                                {["Very Important", "Quite Important", "Not Very Important", "Not Important", "Prefer not to answer"].map((option, idy) => (
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
                        <label className="block text-lg font-medium text-gray-700 py-4">Dating apps use various aspects of user profiles to make recommendations. From an ethical standpoint, which of the following factors do you believe should be permissible for them to consider? Rank each:</label>
                        <table className="min-w-full divide-y divide-gray-200 mt-4">
                            <thead>
                                <tr>
                                    <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Factor</th>
                                    {["Should definitely use", "Should maybe use", "Should maybe not use", "Should definitely not use"].map((option, idx) => (
                                        <th key={idx} className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{option}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {["Appearance", "Age", "Hobbies", "Profession", "Education Level", "Ethnicity"].map((factor, idx) => (
                                    <tr key={idx}>
                                        <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{factor}</td>
                                        {["Should definitely use", "Should maybe use", "Should maybe not use", "Should definitely not use"].map((option, idy) => (
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
