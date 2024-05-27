import React, { useState, useEffect } from 'react';
import { usePlayer } from '@empirica/core/player/classic/react';
import { createProfile, getRandomRecommendation } from '../utils.jsx';

export function SwipeProfile() {
    const player = usePlayer();
    const [buttonsEnabled, setButtonsEnabled] = useState(false);

    const ownProfileId = player.get("chosenProfile");
    const [otherProfileId1, setOtherProfileId1] = useState(getRandomRecommendation(player, ownProfileId));
    const [otherProfileId2, setOtherProfileId2] = useState(getRandomRecommendation(player, ownProfileId));

    useEffect(() => {
        const timer = setTimeout(() => {
            setButtonsEnabled(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleSelectProfile1 = () => {
        if (buttonsEnabled) {
            player.round.set("decision", "selected1");
            player.round.set("opponentId", otherProfileId1);
            player.stage.set("submit", true);
        }
    };

    const handleSelectProfile2 = () => {
        if (buttonsEnabled) {
            player.round.set("decision", "selected2");
            player.round.set("opponentId", otherProfileId2);
            player.stage.set("submit", true);
        }
    };

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', background: 'white', display: 'flex' }}>
            <div style={{ width: '20%', height: '100%', background: '#282828', padding: '20px', boxSizing: 'border-box' }}>
                <div style={{ marginBottom: '20px', color: '#DADADA', fontSize: 15, fontFamily: 'Inter', fontWeight: '700' }}>Instructions:</div>
                <div style={{ marginBottom: '10px', color: '#DADADA', fontSize: 15, fontFamily: 'Inter', fontWeight: '400' }}>
                    Click on the heart of the profile you think would be a better match for your character.
                </div>
                <div style={{ color: '#DADADA', fontSize: 15, fontFamily: 'Inter', fontWeight: '700' }}>This is your character:</div>
                <div style={{ width: '100%', height: 'auto', marginTop: '10px' }}>
                    {createProfile(ownProfileId)}
                </div>
            </div>
            <div style={{ width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <div style={{ margin: '0 20px', textAlign: 'center' }}>
                        {createProfile(otherProfileId1)}
                        <button 
                            onClick={handleSelectProfile1} 
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
                            <img 
                                src="../../data/Heart.png" 
                                alt="Select Profile 1" 
                                style={{ 
                                    width: 156, 
                                    height: 139 
                                }} 
                            />
                        </button>
                    </div>
                    <div style={{ margin: '0 20px', textAlign: 'center' }}>
                        {createProfile(otherProfileId2)}
                        <button 
                            onClick={handleSelectProfile2} 
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
                            <img 
                                src="../../data/Heart.png" 
                                alt="Select Profile 2" 
                                style={{ 
                                    width: 156, 
                                    height: 139 
                                }} 
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
