import { usePlayer } from '@empirica/core/player/classic/react';
import React, { useState, useEffect } from 'react';

export function EndSurveyRecommendationSystem() {
    const player = usePlayer();
    const [experienceAttributes, setExperienceAttributes] = useState({});
    const [systemVariety, setSystemVariety] = useState('');
    const [recommendationDiversity, setRecommendationDiversity] = useState('');
    const [recommendationQuality, setRecommendationQuality] = useState('');
    const [additionalComments, setAdditionalComments] = useState('');
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Save experience attributes
        Object.entries(experienceAttributes).forEach(([key, value]) => {
            player.round.set(key, value);
        });
        // Save other survey responses
        player.round.set('systemVariety', systemVariety);
        player.round.set('recommendationDiversity', recommendationDiversity);
        player.round.set('recommendationQuality', recommendationQuality);
        player.round.set('additionalComments', additionalComments);
        player.stage.set("submit", true);
    };

    const handleExperienceAttributesChange = (e) => {
        const { name, value } = e.target;
        setExperienceAttributes((prev) => ({ ...prev, [name]: value }));
    };

    const handleSystemVarietyChange = (e) => {
        setSystemVariety(e.target.value);
    };

    const handleRecommendationDiversityChange = (e) => {
        setRecommendationDiversity(e.target.value);
    };

    const handleRecommendationQualityChange = (e) => {
        setRecommendationQuality(e.target.value);
    };

    const handleAdditionalCommentsChange = (e) => {
        setAdditionalComments(e.target.value);
    };

    useEffect(() => {
        const attributesList = ["Appearance", "Age", "Hobbies", "Job"];
        const allAttributesSelected = attributesList.every(attr => experienceAttributes[`attribute-${attr}`]);

        const isAllRequiredFieldsSelected = () => {
            return allAttributesSelected && systemVariety && recommendationDiversity && recommendationQuality;
        };

        setIsSubmitEnabled(isAllRequiredFieldsSelected());
    }, [experienceAttributes, systemVariety, recommendationDiversity, recommendationQuality]);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center overflow-auto">
            <div className="py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg flex flex-col space-y-6 overflow-y-auto" style={{ maxHeight: '90vh' }}>
                <h1 className="text-2xl font-bold text-center">Recommendation System Experience Survey</h1>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-lg font-medium text-gray-700">Thank you for participating! Our algorithm has been designed to provide you with better recommendations by learning about your preferences. Please answer the following questions to help us evaluate its performance.</p>
                </div>
                <form className="space-y-6 divide-y divide-gray-200" onSubmit={handleFormSubmit}>
                    <div className="mt-4">
                        <label className="block text-lg font-medium text-gray-700 py-4">
                        To what extent do you think the algorithm learned about your character’s preferences regarding the following attributes? Rank each:</label>
                        <table className="min-w-full divide-y divide-gray-200 mt-4">
                            <thead>
                                <tr>
                                    <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attribute</th>
                                    {["Learned quickly", "Learned slowly", "Did not learn"].map((option, idx) => (
                                        <th key={idx} className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{option}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {["Appearance", "Age", "Hobbies", "Job"].map((attribute, idx) => (
                                    <tr key={idx}>
                                        <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{attribute}</td>
                                        {["Learned quickly", "Learned slowly", "Did not learn"].map((option, idy) => (
                                            <td key={idy} className="px-2 py-2 whitespace-nowrap">
                                                <input
                                                    id={`attribute-${attribute}-${option}`}
                                                    name={`attribute-${attribute}`}
                                                    type="radio"
                                                    value={option}
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    onChange={handleExperienceAttributesChange}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="space-y-4 pt-4">
                        <label className="block text-lg font-medium text-gray-700 py-4">Regarding the variety of recommendations, do you feel like the algorithm:</label>
                        {["Showed a variety of potential matches, even if they didn't perfectly match your character’s preferences", "Focused on suggesting matches closely aligned with your character’s established preferences"].map((option, idx) => (
                            <div key={idx} className="flex items-start">
                                <input
                                    id={`systemVariety-${idx}`}
                                    name="systemVariety"
                                    type="radio"
                                    value={option}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    onChange={handleSystemVarietyChange}
                                />
                                <label htmlFor={`systemVariety-${idx}`} className="ml-3 text-sm text-gray-700">
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4 pt-4">
                        <label className="block text-lg font-medium text-gray-700 py-4">Regarding the diversity of recommendations, do you think:</label>
                        {["The recommendations were too varied and inconsistent", "The diversity of recommendations was balanced and appropriate", "The recommendations were too similar and lacked diversity"].map((option, idx) => (
                            <div key={idx} className="flex items-start">
                                <input
                                    id={`recommendationDiversity-${idx}`}
                                    name="recommendationDiversity"
                                    type="radio"
                                    value={option}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    onChange={handleRecommendationDiversityChange}
                                />
                                <label htmlFor={`recommendationDiversity-${idx}`} className="ml-3 text-sm text-gray-700">
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4 pt-4">
                        <label className="block text-lg font-medium text-gray-700 py-4">Regarding the quality of recommendations, do you think:</label>
                        {["All/most recommendations were very good", "Some recommendations were good, and some not so good", "All/most recommendations were bad"].map((option, idx) => (
                            <div key={idx} className="flex items-start">
                                <input
                                    id={`recommendationQuality-${idx}`}
                                    name="recommendationQuality"
                                    type="radio"
                                    value={option}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    onChange={handleRecommendationQualityChange}
                                />
                                <label htmlFor={`recommendationQuality-${idx}`} className="ml-3 text-sm text-gray-700">
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4 pt-4">
                        <label className="block text-lg font-medium text-gray-700 py-4">Do you have any additional comments or feedback regarding your experience with the recommendation system during the experiment?</label>
                        <textarea
                            className="form-textarea mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            rows="4"
                            value={additionalComments}
                            onChange={handleAdditionalCommentsChange}
                        ></textarea>
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
