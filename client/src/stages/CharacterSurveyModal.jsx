
import React, { useState, useEffect } from 'react';
import { usePlayer } from '@empirica/core/player/classic/react';
import { createProfile , getFacialHair, getAccessory} from '../utils.jsx';

function CharacterSurveyModal({ onSubmit, onClose, profile }) {
    const [attributes, setAttributes] = useState({
        hair: '',
        glasses: '',
        beard: '',
        skinTone: '',
        clothes: '',
        age: '',
        hobbies: '',
        job: '',
        reasons: {
            identify: '',
            look: '',
            funny: '',
            interestingHobbies: '',
            random: '',
            preferNotToAnswer: ''
        }
    });

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    useEffect(() => {
        const allAttributesSelected = Object.values(attributes).slice(0, 8).every(attr => attr !== '');
        const anyReasonChecked = Object.values(attributes.reasons).some(value => value !== '');
        setIsSubmitDisabled(!(allAttributesSelected && anyReasonChecked));
    }, [attributes]);

    const handleAttributeChange = (e) => {
        const { name, value } = e.target;
        setAttributes((prevAttributes) => ({ ...prevAttributes, [name]: value }));
    };

    const handleReasonChange = (e) => {
        const { name, value } = e.target;
        setAttributes((prevAttributes) => ({
            ...prevAttributes,
            reasons: { ...prevAttributes.reasons, [name]: value }
        }));
    };

    const handleSubmit = () => {
        onSubmit(attributes);
        onClose();
    };

    const characterHasBeard = getFacialHair(profile) !== 'None';
    const characterHasGlasses = getAccessory(profile) !== 'None';

    const beardQuestion = characterHasBeard
        ? "The character has a beard, as do I"
        : "The character does not have a beard, and I don't either";
    const glassesQuestion = characterHasGlasses
        ? "The character has glasses, as do I"
        : "The character does not have glasses, and I don't either";

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
            <div className="py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg flex flex-col space-y-4">
                <h1 className="text-2xl font-bold text-center">Please Answer the Following Questions</h1>
                <div className="flex flex-row space-x-4">
                    <div className="flex-2">
                        <h1 className="text-lg leading-6 font-medium text-gray-900">Your Character</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            For each of the following character attributes, check whether the character you chose is similar to you or not:
                        </p>

                        <div className="mt-4">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yes</th>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Somewhat</th>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prefer not to answer</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {[
                                        { id: 'hair', label: "The character’s hair is similar to mine" },
                                        { id: 'glasses', label: glassesQuestion },
                                        { id: 'beard', label: beardQuestion },
                                        { id: 'skinTone', label: "The character’s skin tone is similar to mine" },
                                        { id: 'clothes', label: "The character’s clothes are similar to mine" },
                                        { id: 'age', label: "The character’s age is similar to mine" },
                                        { id: 'hobbies', label: "The character’s hobbies are similar to mine" },
                                        { id: 'job', label: "The character’s job is similar to mine" }
                                    ].map(attr => (
                                        <tr key={attr.id}>
                                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{attr.label}</td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                                <input
                                                    type="radio"
                                                    name={attr.id}
                                                    value="yes"
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    onChange={handleAttributeChange}
                                                />
                                            </td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                                <input
                                                    type="radio"
                                                    name={attr.id}
                                                    value="somewhat"
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    onChange={handleAttributeChange}
                                                />
                                            </td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                                <input
                                                    type="radio"
                                                    name={attr.id}
                                                    value="no"
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    onChange={handleAttributeChange}
                                                />
                                            </td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                                <input
                                                    type="radio"
                                                    name={attr.id}
                                                    value="preferNotToAnswer"
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    onChange={handleAttributeChange}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-lg leading-6 font-medium text-gray-900 mt-4">Reasons for Choosing the Character</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            To what extent do you agree with the following reasons for choosing the character you played as:
                        </p>

                        <div className="mt-4">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yes</th>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Somewhat</th>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prefer not to answer</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {[
                                        { id: 'identify', label: "I can identify with the character due to the characteristics we have in common" },
                                        { id: 'look', label: "I liked the way the character looked" },
                                        { id: 'funny', label: "The character looked funny" },
                                        { id: 'interestingHobbies', label: "The character’s hobbies were interesting" },
                                        { id: 'random', label: "I chose randomly" },
                                        { id: 'preferNotToAnswer', label: "Prefer not to answer" }
                                    ].map(reason => (
                                        <tr key={reason.id}>
                                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{reason.label}</td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                                <input
                                                    type="radio"
                                                    name={reason.id}
                                                    value="yes"
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    onChange={handleReasonChange}
                                                />
                                            </td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                                <input
                                                    type="radio"
                                                    name={reason.id}
                                                    value="somewhat"
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    onChange={handleReasonChange}
                                                />
                                            </td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                                <input
                                                    type="radio"
                                                    name={reason.id}
                                                    value="no"
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    onChange={handleReasonChange}
                                                />
                                            </td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                                <input
                                                    type="radio"
                                                    name={reason.id}
                                                    value="preferNotToAnswer"
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    onChange={handleReasonChange}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={handleSubmit}
                                className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
                                disabled={isSubmitDisabled}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 space-y-2">
                        <div className="text-lg leading-6 font-medium text-gray-900">Chosen Character Profile</div>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '300px', maxHeight: '450px', textAlign: 'left' }}>
                            {createProfile(profile)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default CharacterSurveyModal;