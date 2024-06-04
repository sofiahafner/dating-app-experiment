import React, { useState, useEffect } from 'react';
import { usePlayer } from '@empirica/core/player/classic/react';
import { createProfile, getFacialHair, getAccessory } from '../utils.jsx';

function CharacterSurveyModal({ onSubmit, onClose, profile }) {
    const player = usePlayer();

    const [attributes, setAttributes] = useState({
        similar_hair: '',
        similar_glasses: '',
        similar_beard: '',
        // similar_skinTone: '',
        similar_clothes: '',
        similar_age: '',
        similar_hobbies: '',
        similar_job: '',
    });

    const [influences, setInfluences] = useState({
        hair: '',
        glasses: '',
        beard: '',
        facialExpression: '',
        clothes: '',
        pose: '',
        age: '',
        hobbies: '',
        job: ''
    });

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    useEffect(() => {
        const allAttributesSelected = Object.values(attributes).every(attr => attr !== '');
        const allInfluencesSelected = Object.values(influences).every(influence => influence !== '');
        setIsSubmitDisabled(!(allAttributesSelected && allInfluencesSelected));
    }, [attributes, influences]);

    const handleAttributeChange = (e) => {
        const { name, value } = e.target;
        setAttributes((prevAttributes) => ({ ...prevAttributes, [name]: value }));
    };

    const handleInfluenceChange = (e) => {
        const { name, value } = e.target;
        setInfluences((prevInfluences) => ({ ...prevInfluences, [name]: value }));
    };

    const handleSubmit = () => {
        Object.entries(attributes).forEach(([key, value]) => {
            player.round.set(`chosenCharacter${key.charAt(0).toUpperCase() + key.slice(1)}`, value);
        });
        Object.entries(influences).forEach(([key, value]) => {
            player.round.set(`chosenCharacterInfluence${key.charAt(0).toUpperCase() + key.slice(1)}`, value);
        });
        player.stage.set("submit", true);

        onSubmit({ attributes, influences });
        onClose();
    };

    const characterHasBeard = getFacialHair(profile) !== 'None';
    const characterHasGlasses = getAccessory(profile) !== 'None';

    const beardQuestion = characterHasBeard
        ? "Their Beard"
        : "Them not having a Beard";
    const glassesQuestion = characterHasGlasses
        ? "Their Glasses"
        : "Them not having Glasses";

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
            <div className="py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg flex flex-col space-y-4">
                <h1 className="text-2xl font-bold text-center">Please Answer the Following Questions</h1>
                <div className="flex flex-row space-x-4">
                    <div className="flex-2">
                        <h1 className="text-lg leading-6 font-medium text-gray-900">Similarity to your Character</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            For each of the following character attributes, check whether the character you chose is similar to you or not:
                        </p>

                        <div className="mt-4">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Characteristic</th>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Very Similar</th>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Somewhat Similar</th>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Not Similar</th>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prefer not to answer</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {[
                                        { id: 'similar_hair', label: "Their Hair" },
                                        { id: 'similar_glasses', label: glassesQuestion },
                                        { id: 'similar_beard', label: beardQuestion },
                                        // { id: 'similar_skinTone', label: "Their Skin Tone" },
                                        { id: 'similar_clothes', label: "Their Clothes" },
                                        { id: 'similar_age', label: "Their Age" },
                                        { id: 'similar_hobbies', label: "Their Hobbies" },
                                        { id: 'similar_job', label: "Their Job" }
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

                        <h2 className="text-lg leading-15 font-medium text-gray-900 mt-4">Reasons for Choosing the Character</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            How much did each of the following profile characteristics influence your decision to choose this character?
                        </p>

                        <div className="mt-4">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Characteristic</th>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Very Influential</th>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Somewhat Influential</th>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Not Influential</th>
                                        <th className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prefer not to answer</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {[
                                        { id: 'hair', label: "Their Hair" },
                                        { id: 'glasses', label: glassesQuestion },
                                        { id: 'beard', label: beardQuestion },
                                        { id: 'facialExpression', label: "Their Facial Expression" },
                                        { id: 'clothes', label: "Their Clothes" },
                                        { id: 'pose', label: "Their Pose" },
                                        { id: 'age', label: "Their Age" },
                                        { id: 'hobbies', label: "Their Hobbies" },
                                        { id: 'job', label: "Their Job" }
                                    ].map(influence => (
                                        <tr key={influence.id}>
                                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{influence.label}</td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                                <input
                                                    type="radio"
                                                    name={influence.id}
                                                    value="mainReason"
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    onChange={handleInfluenceChange}
                                                />
                                            </td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                                <input
                                                    type="radio"
                                                    name={influence.id}
                                                    value="somewhatInfluential"
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    onChange={handleInfluenceChange}
                                                />
                                            </td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                                <input
                                                    type="radio"
                                                    name={influence.id}
                                                    value="notInfluential"
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    onChange={handleInfluenceChange}
                                                />
                                            </td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                                <input
                                                    type="radio"
                                                    name={influence.id}
                                                    value="preferNotToAnswer"
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    onChange={handleInfluenceChange}
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

                    <div className="flex-1 space-y-2 text-center">
                        <div className="text-xl leading-6 font-medium text-gray-900">Chosen Character Profile</div>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '300px', maxHeight: '450px', margin: '0 auto', textAlign: 'left' }}>
                            {createProfile(profile)}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CharacterSurveyModal;
