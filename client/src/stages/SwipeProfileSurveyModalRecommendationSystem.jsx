import React, { useState, useEffect } from 'react';
import { usePlayer } from '@empirica/core/player/classic/react';
import { createProfile, getRandomRecommendation } from '../utils.jsx';

function SwipeProfileSurveyModalRecommendationSystem({ onSubmit, onClose }) {
    const [reasons, setReasons] = useState({
        systemImprovement: '',
        variety: ''
    });

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    useEffect(() => {
        const isRadioSelected = reasons.systemImprovement !== '' && reasons.variety !== '';
        setIsSubmitDisabled(!isRadioSelected);
    }, [reasons]);

    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setReasons((prevReasons) => ({ ...prevReasons, [name]: value }));
    };

    const handleSubmit = () => {
        onSubmit(reasons);
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center overflow-auto">
            <div className="py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg flex flex-col space-y-8">
                <h1 className="text-2xl font-bold text-center">Please Answer the Following Questions</h1>
                
                <h2 className="text-lg leading-6 font-medium text-gray-900 mt-8">Recommendation System Improvement</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Do you feel that the recommendation system has learned and improved its suggestions since you began interacting with it?
                </p>

                <div className="mt-6 space-y-4">
                    <div className="flex items-start">
                        <input
                            id="systemImprovement1"
                            name="systemImprovement"
                            type="radio"
                            value="better"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="systemImprovement1" className="ml-3 text-sm text-gray-700">
                            Yes, the system is showing me better recommendations now compared to when I first started interacting with it
                        </label>
                    </div>
                    <div className="flex items-start">
                        <input
                            id="systemImprovement2"
                            name="systemImprovement"
                            type="radio"
                            value="somewhat"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="systemImprovement2" className="ml-3 text-sm text-gray-700">
                            Somewhat, there are minor improvements, but more could be done
                        </label>
                    </div>
                    <div className="flex items-start">
                        <input
                            id="systemImprovement3"
                            name="systemImprovement"
                            type="radio"
                            value="no"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="systemImprovement3" className="ml-3 text-sm text-gray-700">
                            No, I haven't noticed any significant changes in the quality of recommendations
                        </label>
                    </div>
                    <div className="flex items-start">
                        <input
                            id="systemImprovement4"
                            name="systemImprovement"
                            type="radio"
                            value="worse"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="systemImprovement4" className="ml-3 text-sm text-gray-700">
                            The recommendations are getting worse
                        </label>
                    </div>
                    <div className="flex items-start">
                        <input
                            id="systemImprovement5"
                            name="systemImprovement"
                            type="radio"
                            value="notSure"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="systemImprovement5" className="ml-3 text-sm text-gray-700">
                            Not sure
                        </label>
                    </div>
                    <div className="flex items-start">
                        <input
                            id="preferNotToAnswer2"
                            name="systemImprovement"
                            type="radio"
                            value="preferNotToAnswer"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="preferNotToAnswer2" className="ml-3 text-sm text-gray-700">
                            Prefer not to answer
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
                            id="variety1"
                            name="variety"
                            type="radio"
                            value="tooMuch"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="variety1" className="ml-3 text-sm text-gray-700">
                            There is too much variety in the recommendations
                        </label>
                    </div>
                    <div className="flex items-start">
                        <input
                            id="variety2"
                            name="variety"
                            type="radio"
                            value="goodAmount"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="variety2" className="ml-3 text-sm text-gray-700">
                            There is a good amount of variety
                        </label>
                    </div>
                    <div className="flex items-start">
                        <input
                            id="variety3"
                            name="variety"
                            type="radio"
                            value="tooLittle"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="variety3" className="ml-3 text-sm text-gray-700">
                            There is too little variety, all users I am being recommended are too similar
                        </label>
                    </div>
                    <div className="flex items-start">
                        <input
                            id="variety4"
                            name="variety"
                            type="radio"
                            value="notSure"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="variety4" className="ml-3 text-sm text-gray-700">
                            Not sure
                        </label>
                    </div>
                    <div className="flex items-start">
                        <input
                            id="preferNotToAnswer3"
                            name="variety"
                            type="radio"
                            value="preferNotToAnswer"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="preferNotToAnswer3" className="ml-3 text-sm text-gray-700">
                            Prefer not to answer
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