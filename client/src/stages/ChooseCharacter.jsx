import React, { useState, useEffect } from 'react';
import { usePlayer } from '@empirica/core/player/classic/react';
import { createProfile , getFacialHair, getAccessory} from '../utils.jsx';
import profiles from '../../data/peep_profiles.json';



function CharacterSurveyModal({ onSubmit, onClose, profile }) {
    const [attributes, setAttributes] = useState({
        hair: '',
        glasses: '',
        beard: '',
        skinTone: '',
        clothes: '',
        age: '',
        hobbies: '',
        reasons: {
            identify: false,
            look: false,
            funny: false,
            interestingHobbies: false,
            random: false,
            preferNotToAnswer: false
        }
    });

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    useEffect(() => {
        const allAttributesSelected = Object.values(attributes).slice(0, 7).every(attr => attr !== '');
        const anyReasonChecked = Object.values(attributes.reasons).some(value => value === true);
        setIsSubmitDisabled(!(allAttributesSelected && anyReasonChecked));
    }, [attributes]);

    const handleAttributeChange = (e) => {
        const { name, value } = e.target;
        setAttributes((prevAttributes) => ({ ...prevAttributes, [name]: value }));
    };

    const handleReasonChange = (e) => {
        const { name, checked } = e.target;
        setAttributes((prevAttributes) => ({
            ...prevAttributes,
            reasons: { ...prevAttributes.reasons, [name]: checked }
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
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg flex flex-col space-y-8">
                <h1 className="text-2xl font-bold text-center">Please Answer the Following Questions</h1>
                <div className="flex flex-row space-x-8">
                    <div className="flex-2">
                        <h1 className="text-lg leading-6 font-medium text-gray-900">Your Character</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            For each of the following character attributes, check whether the character you chose is similar to you or not:
                        </p>

                        <div className="mt-6">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yes</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prefer not to answer</th>
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
                                        { id: 'hobbies', label: "The character’s hobbies are similar to mine" }
                                    ].map(attr => (
                                        <tr key={attr.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{attr.label}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="radio"
                                                    name={attr.id}
                                                    value="yes"
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    onChange={handleAttributeChange}
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="radio"
                                                    name={attr.id}
                                                    value="no"
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    onChange={handleAttributeChange}
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
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

                        <h2 className="text-lg leading-6 font-medium text-gray-900 mt-8">Reasons for Choosing the Character</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            What aspects of the profile you chose made you decide to play as this character? Check all that apply:
                        </p>

                        <div className="mt-6 space-y-4">
                            {[
                                { id: 'identify', label: "I can identify with the character due to the characteristics we have in common" },
                                { id: 'look', label: "I liked the way the character looked" },
                                { id: 'funny', label: "The character looked funny" },
                                { id: 'interestingHobbies', label: "The character’s hobbies were interesting" },
                                { id: 'random', label: "I chose randomly" },
                                { id: 'preferNotToAnswer', label: "Prefer not to answer" }
                            ].map(reason => (
                                <div key={reason.id} className="flex items-start">
                                    <input
                                        id={reason.id}
                                        name={reason.id}
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        onChange={handleReasonChange}
                                    />
                                    <label htmlFor={reason.id} className="ml-3 text-sm text-gray-700">
                                        {reason.label}
                                    </label>
                                </div>
                            ))}
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

                    <div className="flex-1 space-y-4">
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





// export default CharacterSurveyModal;

// import React, { useState, useEffect } from 'react';
// import CharacterSurveyModal from './CharacterSurveyModal'; // Ensure you have the correct path for the import

export function ChooseCharacter() {
    const player = usePlayer();
    const [glasses, setGlasses] = useState(player.round.get("chosenCharacterGlasses") || 'Yes');
    const [hair, setHair] = useState(player.round.get("chosenCharacterHair") || 'Long');
    const [beard, setBeard] = useState(player.round.get("chosenCharacterBeard") || 'Yes');
    const [hobby, setHobby] = useState(player.round.get("chosenCharacterHobby") || 'Sport');
    const [chosenProfile, setChosenProfile] = useState(null);
    const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);

    const handlePlayCharacter = (profileId) => {
        setChosenProfile(profileId);
        setIsSurveyModalOpen(true);
    };

    const handleSurveySubmit = (surveyData) => {
        // Handle survey submission logic
        console.log(surveyData);
        player.round.set('chosenProfile', parseInt(chosenProfile));
        player.stage.set("submit", true);
    };

    const handleSurveyClose = () => {
        setIsSurveyModalOpen(false);
    };

    useEffect(() => {
        player.round.set("chosenCharacterGlasses", glasses);
        player.round.set("chosenCharacterHair", hair);
        player.round.set("chosenCharacterBeard", beard);
        player.round.set("chosenCharacterHobby", hobby);
    }, [glasses, hair, beard, hobby, player]);

    const glassesChoice = glasses === "Yes";
    const hairChoice = hair;
    const beardChoice = beard === "Yes";
    const hobbyChoice = hobby;

    const filterProfiles = (profile) => {
        const profile_glasses = profile.accessories && !profile.accessories.includes('None');
        const profile_hair = profile.hair_short;
        const profile_beard = profile.facial_hair && profile.facial_hair !== 'None';
        const profile_main_hobby = profile.main_hobby;

        const glasses_match = profile_glasses === glassesChoice;
        const hair_match = (hairChoice === 'Long' && !profile_hair) || (hairChoice === 'Short' && profile_hair);
        const beard_match = profile_beard === beardChoice;
        const hobby_matches = profile_main_hobby === hobbyChoice;

        return glasses_match && hair_match && beard_match && hobby_matches;
    };

    const filteredProfiles = profiles.filter(filterProfiles);
    const shuffledProfiles = filteredProfiles.sort(() => 0.5 - Math.random()).slice(0, 8);

    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ width: '20%', background: '#282828', padding: '20px', boxSizing: 'border-box' }}>
                <div style={{ color: '#DADADA', fontSize: 22, fontFamily: 'Inter', fontWeight: '700' }}>Instructions</div>
                <div style={{ color: '#DADADA', fontSize: 16, fontFamily: 'Inter', fontWeight: '400' }}>Select a character you want to play by clicking on the "Play this Character" button under their profile. Use the form below to change your previous selections.</div>
                <div className="mt-12 space-y-8 divide-y divide-gray-200">
                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                        <div>
                            <div className="space-y-6 sm:space-y-5">
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="glasses" className="block text-sm font-medium" style={{ color: '#DADADA' }}>
                                    Does your character wear glasses?
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <select id="glasses" name="glasses" value={glasses} onChange={e => setGlasses(e.target.value)} className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>

                                    <label htmlFor="hair" className="block text-sm font-medium" style={{ color: '#DADADA' }}>
                                    Does your character have long or short hair?
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <select id="hair" name="hair" value={hair} onChange={e => setHair(e.target.value)} className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                            <option value="Long">Long</option>
                                            <option value="Short">Short</option>
                                        </select>
                                    </div>

                                    <label htmlFor="beard" className="block text-sm font-medium" style={{ color: '#DADADA' }}>
                                    Does your character have a beard?
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <select id="beard" name="beard" value={beard} onChange={e => setBeard(e.target.value)} className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="hobby" className="block text-sm font-medium" style={{ color: '#DADADA' }}>
                                        What is your character's main hobby?
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <select id="hobby" name="hobby" value={hobby} onChange={e => setHobby(e.target.value)} className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                            <option value="Sport">Sport</option>
                                            <option value="Music">Music</option>
                                            <option value="Arts">Arts and Crafts</option>
                                            <option value="Travel">Travel</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', padding: '20px', justifyItems: 'center', alignItems: 'start', width: '80%' }}>
                {shuffledProfiles.map((profile, index) => {
                    const isTopRow = index < 4;
                    return (
                        <div key={profile.profile_ID} style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '350px', maxHeight: '450px', marginBottom: isTopRow ? '20px' : '0' }}>
                            {createProfile(profile.profile_ID)}
                            <button
                                onClick={() => handlePlayCharacter(profile.profile_ID)}
                                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                style={{ 
                                    marginTop: '-3px',
                                    backgroundColor: '#282828',
                                    color: 'white',
                                    transition: 'background-color 0.3s ease'
                                }}
                                onMouseOver={e => e.currentTarget.style.backgroundColor = '#1f1f1f'}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = '#282828'}
                            >
                                Play this Character
                            </button>
                        </div>
                    );
                })}
            </div>
            {isSurveyModalOpen && (
                <CharacterSurveyModal
                    onSubmit={handleSurveySubmit}
                    onClose={handleSurveyClose}
                    profile={chosenProfile}
                />
            )}
        </div>
    );
}

export default ChooseCharacter;
