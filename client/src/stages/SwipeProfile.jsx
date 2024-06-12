import React, { useState, useEffect } from 'react';
import { usePlayer } from '@empirica/core/player/classic/react';
import { getRandomRecommendation, getBaselineRecommendation } from '../RecommendationAlgorithms.js';
import { createProfile } from '../utils.jsx';
import SwipeProfileSurveyModalProfileChoice from './SwipeProfileSurveyModalProfileChoice.jsx';
import SwipeProfileSurveyModalRecommendationSystem from './SwipeProfileSurveyModalRecommendationSystem.jsx';

export function SwipeProfile() {
    const player = usePlayer();
    const player_round = player.get("roundsPlayed") || 0;
    const [buttonsEnabled, setButtonsEnabled] = useState(false);
    const [showSurvey, setShowSurvey] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [profileChoiceCount, setProfileChoiceCount] = useState(0);
    const [showRecommendationModal, setShowRecommendationModal] = useState(false);

    const ownProfileId = player.get("chosenProfile");
    const [otherProfiles, setOtherProfiles] = useState([]);
    const [sidebarWidth, setSidebarWidth] = useState(300); // initial sidebar width

    const updateSidebarWidth = () => {
        const minWidth = 270; // minimum width for the sidebar
        const newWidth = Math.max(window.innerWidth * 0.2, minWidth);
        setSidebarWidth(newWidth);
    };

    useEffect(() => {
        const [profile1, profile2] = getRandomRecommendation(player, ownProfileId);
        setOtherProfiles([profile1, profile2]);
        console.log("Recommended profiles: ", profile1, profile2);
    }, [ownProfileId, player]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setButtonsEnabled(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', updateSidebarWidth);
        updateSidebarWidth();
        return () => window.removeEventListener('resize', updateSidebarWidth);
    }, []);

    const handleSelectProfile = (likedProfile, dislikedProfile) => {
        if (buttonsEnabled) {
            player.round.set("likedProfile", likedProfile);
            player.round.set("dislikedProfile", dislikedProfile);

            const pastOpponentIDs = player.get("opponentIDs") || [];
            player.set("opponentIDs", [...pastOpponentIDs, likedProfile, dislikedProfile]);

            if ((player_round % 10 === 0) && (player_round !== 0)) {
                setShowRecommendationModal(true);
                setSelectedProfile({ likedProfile, dislikedProfile });
            } else if ([5, 27, 32].includes(player_round)) {
                setSelectedProfile({ likedProfile, dislikedProfile });
                setShowSurvey(true);
                setProfileChoiceCount(profileChoiceCount + 1);
            } else {
                submitChoice(likedProfile, dislikedProfile);
            }
        }
    };

    const submitChoice = (likedProfile, dislikedProfile) => {
        player.round.set("likedProfile", likedProfile);
        player.round.set("dislikedProfile", dislikedProfile);
        player.stage.set("submit", true);
    };

    const handleSurveySubmit = (reason) => {
        if (selectedProfile) {
            submitChoice(selectedProfile.likedProfile, selectedProfile.dislikedProfile);
        }
        setShowSurvey(false);
    };

    const handleRecommendationSubmit = (reason) => {
        if (selectedProfile) {
            submitChoice(selectedProfile.likedProfile, selectedProfile.dislikedProfile);
        }
        setShowRecommendationModal(false);
    };

    const heartStyle = {
        width: '100px',
        height: '100px',
        cursor: buttonsEnabled ? 'pointer' : 'not-allowed',
        opacity: buttonsEnabled ? 1 : 0.5,
        fill: 'none',
        stroke: 'black',
        strokeWidth: '2px',
        transition: 'fill 0.3s ease',
    };

    if (otherProfiles.length < 2) {
        return <div>Loading...</div>; // or any other loading indicator
    }

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', background: 'white', display: 'flex' }}>
            <div style={{
                width: `${sidebarWidth}px`,
                height: '100%',
                background: '#1c1c1c',
                padding: '20px',
                boxSizing: 'border-box',
                boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
            }}>
                <div style={{ color: '#FFFFFF', fontSize: 22, fontFamily: 'Inter', fontWeight: '700', marginBottom: '20px', textAlign: 'center' }}>
                    Completed Swipes
                </div>
                <div style={{ color: '#FFFFFF', fontSize: 40, fontFamily: 'Inter', fontWeight: '400', marginBottom: '40px', textAlign: 'center' }}>
                    {player_round} / 50
                </div>
                <div style={{ color: '#FFFFFF', fontSize: 22, fontFamily: 'Inter', fontWeight: '700', textAlign: 'center' }}>
                    This is your character
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '450px', margin: '0 auto' }}>
                    {createProfile(ownProfileId)}
                </div>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', flexDirection: 'column' }}>
                <div style={{ marginBottom: '20px', color: '#282828', fontSize: 18, fontFamily: 'Inter', fontWeight: '700' }}>
                    Click on the heart of the profile you think would be a better match for your character
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <div style={{ margin: '0 20px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '270px', width: '100%', height: '450px', textAlign: 'left' }}>
                            {createProfile(otherProfiles[0])}
                        </div>
                        <button
                            onClick={() => handleSelectProfile(otherProfiles[0], otherProfiles[1])}
                            style={{
                                border: 'none',
                                background: 'none',
                                padding: 0,
                                marginTop: '10px',
                                cursor: buttonsEnabled ? 'pointer' : 'not-allowed',
                                opacity: buttonsEnabled ? 1 : 0.5
                            }}
                            disabled={!buttonsEnabled}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                style={heartStyle}
                                onMouseOver={e => { if (buttonsEnabled) e.currentTarget.style.fill = 'red'; }}
                                onMouseOut={e => { if (buttonsEnabled) e.currentTarget.style.fill = 'none'; }}
                            >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>
                    </div>
                    <div style={{ margin: '0 20px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '270px', width: '100%', height: '450px', textAlign: 'left' }}>
                            {createProfile(otherProfiles[1])}
                        </div>
                        <button
                            onClick={() => handleSelectProfile(otherProfiles[1], otherProfiles[0])}
                            style={{
                                border: 'none',
                                background: 'none',
                                padding: 0,
                                marginTop: '10px',
                                cursor: buttonsEnabled ? 'pointer' : 'not-allowed',
                                opacity: buttonsEnabled ? 1 : 0.5
                            }}
                            disabled={!buttonsEnabled}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                style={heartStyle}
                                onMouseOver={e => { if (buttonsEnabled) e.currentTarget.style.fill = 'red'; }}
                                onMouseOut={e => { if (buttonsEnabled) e.currentTarget.style.fill = 'none'; }}
                            >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {showSurvey && (
                <SwipeProfileSurveyModalProfileChoice
                    onSubmit={handleSurveySubmit}
                    onClose={() => setShowSurvey(false)}
                    chosenProfile={player.round.get("likedProfile")}
                    unchosenProfile={player.round.get("dislikedProfile")}
                />
            )}
            {showRecommendationModal && (
                <SwipeProfileSurveyModalRecommendationSystem
                    onSubmit={handleRecommendationSubmit}
                    onClose={() => setShowRecommendationModal(false)}
                    chosenProfile={player.round.get("likedProfile")}
                    unchosenProfile={player.round.get("dislikedProfile")}
                />
            )}
        </div>
    );
}
