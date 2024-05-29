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
        }, 300);

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

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', background: 'white', display: 'flex' }}>
            <div style={{ width: '20%', height: '100%', background: '#282828', padding: '20px', boxSizing: 'border-box' }}>
                
                <div style={{ color: '#DADADA', fontSize: 22, fontFamily: 'Inter', fontWeight: '700' }}>This is your character:</div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '300px', maxHeight: '450px'}}>
                    {createProfile(ownProfileId)}
                </div>
                {/* <div style={{ marginBottom: '20px', color: '#DADADA', fontSize: 15, fontFamily: 'Inter', fontWeight: '700' }}>Instructions:</div>
                <div style={{ marginBottom: '10px', color: '#DADADA', fontSize: 15, fontFamily: 'Inter', fontWeight: '400' }}>
                    Click on the heart of the profile you think would be a better match for your character.
                </div> */}
            </div>
            <div style={{ width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', flexDirection: 'column' }}>
                <div style={{ marginBottom: '20px', color: '#282828', fontSize: 18, fontFamily: 'Inter', fontWeight: '700' }}>Click on the heart of the profile you think would be a better match for your character</div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <div style={{ margin: '0 20px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '300px', maxHeight: '450px',  textAlign: 'left' }}>
                            {createProfile(otherProfileId1)}
                        </div>
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
                            <svg 
                                viewBox="0 0 24 24" 
                                style={heartStyle}
                                onMouseOver={e => { if (buttonsEnabled) e.currentTarget.style.fill = 'red'; }}
                                onMouseOut={e => { if (buttonsEnabled) e.currentTarget.style.fill = 'none'; }}
                            >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </button>
                    </div>
                    <div style={{ margin: '0 20px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '300px', maxHeight: '450px' ,  textAlign: 'left' }}>
                            {createProfile(otherProfileId2)}
                        </div>
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
                            <svg 
                                viewBox="0 0 24 24" 
                                style={heartStyle}
                                onMouseOver={e => { if (buttonsEnabled) e.currentTarget.style.fill = 'red'; }}
                                onMouseOut={e => { if (buttonsEnabled) e.currentTarget.style.fill = 'none'; }}
                            >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
