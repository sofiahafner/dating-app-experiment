import React, { useState, useEffect } from 'react';
import { usePlayer } from '@empirica/core/player/classic/react';

function SwipeProfileSurveyModalRecommendationSystem({ onSubmit, onClose }) {
    const player = usePlayer();

    const [reasons, setReasons] = useState({
        recommendationSystemImprovement: '',
        profileVariety: ''
    });

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    useEffect(() => {
        const isRadioSelected = reasons.recommendationSystemImprovement !== '' && reasons.profileVariety !== '';
        setIsSubmitDisabled(!isRadioSelected);
    }, [reasons]);

    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setReasons((prevReasons) => ({ ...prevReasons, [name]: value }));
    };

    const handleSubmit = () => {
        player.round.set("SwipeProfileRecommendationSurvey_Improvement", reasons.recommendationSystemImprovement);
        player.round.set("SwipeProfileRecommendationSurvey_Variety", reasons.profileVariety);
        player.stage.set("submit", true);

        onSubmit(reasons);
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center overflow-auto">
            <div className="py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg flex flex-col space-y-8">
                <h1 className="text-2xl font-bold text-center">Recommendation System Improvement and Variety</h1>
                
                <h2 className="text-lg leading-6 font-medium text-gray-900 mt-8">Recommendation System Improvement</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Do you feel that the recommendation system has learned and improved its suggestions since you began interacting with it?
                </p>

                <div className="mt-6 space-y-4">
                    <div className="flex items-start">
                        <input
                            id="recommendationSystemImprovement1"
                            name="recommendationSystemImprovement"
                            type="radio"
                            value="better"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="recommendationSystemImprovement1" className="ml-3 text-sm text-gray-700">
                            Yes, the recommendations are better now
                        </label>
                    </div>
                    <div className="flex items-start">
                        <input
                            id="recommendationSystemImprovement2"
                            name="recommendationSystemImprovement"
                            type="radio"
                            value="somewhat"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="recommendationSystemImprovement2" className="ml-3 text-sm text-gray-700">
                            Somewhat, with minor improvements
                        </label>
                    </div>
                    <div className="flex items-start">
                        <input
                            id="recommendationSystemImprovement3"
                            name="recommendationSystemImprovement"
                            type="radio"
                            value="no"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="recommendationSystemImprovement3" className="ml-3 text-sm text-gray-700">
                            No, no significant changes
                        </label>
                    </div>
                    <div className="flex items-start">
                        <input
                            id="recommendationSystemImprovement4"
                            name="recommendationSystemImprovement"
                            type="radio"
                            value="worse"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="recommendationSystemImprovement4" className="ml-3 text-sm text-gray-700">
                            The recommendations are worse
                        </label>
                    </div>
                    <div className="flex items-start">
                        <input
                            id="recommendationSystemImprovement5"
                            name="recommendationSystemImprovement"
                            type="radio"
                            value="notSure"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="recommendationSystemImprovement5" className="ml-3 text-sm text-gray-700">
                            Not sure
                        </label>
                    </div>
                </div>

                <h2 className="text-lg leading-6 font-medium text-gray-900 mt-8">Recommendation System Variety</h2>
                <p className="mt-1 text-sm text-gray-500">
                    How would you describe the variety of user profiles you get recommended?
                </p>

                <div className="mt-6 space-y-4">
                    <div className="flex items-start">
                        <input
                            id="profileVariety1"
                            name="profileVariety"
                            type="radio"
                            value="tooMuch"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="profileVariety1" className="ml-3 text-sm text-gray-700">
                            Too much variety
                        </label>
                    </div>
                    <div className="flex items-start">
                        <input
                            id="profileVariety2"
                            name="profileVariety"
                            type="radio"
                            value="goodAmount"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="profileVariety2" className="ml-3 text-sm text-gray-700">
                            Good amount of variety
                        </label>
                    </div>
                    <div className="flex items-start">
                        <input
                            id="profileVariety3"
                            name="profileVariety"
                            type="radio"
                            value="tooLittle"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="profileVariety3" className="ml-3 text-sm text-gray-700">
                            Too little variety
                        </label>
                    </div>
                    <div className="flex items-start">
                        <input
                            id="profileVariety4"
                            name="profileVariety"
                            type="radio"
                            value="notSure"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="profileVariety4" className="ml-3 text-sm text-gray-700">
                            Not sure
                        </label>
                    </div>
                </div>

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            isSubmitDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                        }`}
                        disabled={isSubmitDisabled}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SwipeProfileSurveyModalRecommendationSystem;
