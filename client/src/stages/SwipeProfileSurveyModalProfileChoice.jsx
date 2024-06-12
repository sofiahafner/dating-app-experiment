import React, { useState, useEffect } from 'react';
import { usePlayer } from '@empirica/core/player/classic/react';
import { createProfile } from '../utils.jsx';

function SwipeProfileSurveyModalProfileChoice({ onSubmit, onClose, chosenProfile, unchosenProfile }) {
    const player = usePlayer();

    const [attributes, setAttributes] = useState({
        appearance: '',
        age: '',
        hobbies: '',
        job: ''
    });

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    useEffect(() => {
        const allAttributesSelected = Object.values(attributes).every(attr => attr !== '');
        setIsSubmitDisabled(!allAttributesSelected);
    }, [attributes]);

    const handleAttributeChange = (e) => {
        const { name, value } = e.target;
        setAttributes((prevAttributes) => ({ ...prevAttributes, [name]: value }));
    };

    const handleSubmit = () => {
        Object.entries(attributes).forEach(([key, value]) => {
            player.round.set(`SwipeProfileChoiceSurvey_Attribute${key.charAt(0).toUpperCase() + key.slice(1)}`, value);
        });
        player.stage.set("submit", true);

        onSubmit(attributes);
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
            <div className="py-4 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg flex flex-col space-y-4">
                <h1 className="text-2xl font-bold text-center">Matching Choice Survey</h1>
                <div className="flex flex-col space-y-8">
                    <div className="flex-2">
                        <h1 className="text-lg leading-6 font-medium text-gray-900">Reasons for Your Choice</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            For each of the following profile characteristics, indicate whether the chosen character was better, both were about the same, or the other character was better:
                        </p>

                        <div className="mt-4">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Characteristic</th>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chosen Better</th>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">About the Same</th>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Other Better</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {[
                                        { id: 'appearance', label: "Their Appearance" },
                                        { id: 'age', label: "Their Age" },
                                        { id: 'hobbies', label: "Their Hobbies" },
                                        { id: 'job', label: "Their Job" },
                                    ].map(attr => (
                                        <tr key={attr.id}>
                                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{attr.label}</td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                                <input
                                                    type="radio"
                                                    name={attr.id}
                                                    value="chosenBetter"
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    onChange={handleAttributeChange}
                                                />
                                            </td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                                <input
                                                    type="radio"
                                                    name={attr.id}
                                                    value="same"
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    onChange={handleAttributeChange}
                                                />
                                            </td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                                <input
                                                    type="radio"
                                                    name={attr.id}
                                                    value="notChosenBetter"
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    onChange={handleAttributeChange}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex flex-row justify-between space-x-4">
                        <div className="flex-1 flex flex-col items-center">
                            <div className="text-lg leading-6 font-medium text-gray-900">Chosen Character</div>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '300px', maxHeight: '450px', textAlign: 'left' }}>
                                {createProfile(chosenProfile)}
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                            <div className="text-lg leading-6 font-medium text-gray-900">Other Character</div>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '300px', maxHeight: '450px', textAlign: 'left' }}>
                                {createProfile(unchosenProfile)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
                        disabled={isSubmitDisabled}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SwipeProfileSurveyModalProfileChoice;
