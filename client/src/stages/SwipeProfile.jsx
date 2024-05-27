import React from 'react';
import { usePlayer } from '@empirica/core/player/classic/react';
import { createProfile, getRandomRecommendation } from '../utils.jsx';


export function SwipeProfile() {
    const player = usePlayer();

    const handleAccept = () => {
        player.round.set("decision", "accepted");
        player.round.set("opponentId", otherProfileId);
        player.stage.set("submit", true);
    };

    const handleReject = () => {
        player.round.set("decision", "rejected");
        player.round.set("opponentId", otherProfileId);
        player.stage.set("submit", true);
    };

    // const ownProfileId = player.round.get("ownProfileID");
    const ownProfileId = player.get("chosenProfile");
    const linkToOwnProfilePicture = `https://raw.githubusercontent.com/sofiahafner/dating-app-experiment/main/profiles/pictures/${ownProfileId}.png`;

    const otherProfileId = getRandomRecommendation(player, ownProfileId);
    const linkToOtherProfilePicture = `https://raw.githubusercontent.com/sofiahafner/dating-app-experiment/main/profiles/pictures/${otherProfileId}.png`;

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', background: 'white' }}>
            <div style={{ width: 391, height: 694, left: 922, top: 49, position: 'absolute' }}>
                {createProfile(otherProfileId)}
            </div>
            <button onClick={handleAccept} style={{ border: 'none', background: 'none', padding: 0, position: 'absolute', left: 1149, top: 780 }}>
                <img src="../../data/Heart.png" alt="Accept" style={{ width: 156, height: 139 }} />
            </button>
            <button onClick={handleReject} style={{ border: 'none', background: 'none', padding: 0, position: 'absolute', left: 931, top: 775 }}>
                <img src="../../data/Multiply.png" alt="Reject" style={{ width: 147, height: 150 }} />
            </button>
            <div style={{ width: 616, height: '100%', left: -54, top: -21, position: 'absolute' }}>
                <div style={{ width: 482, height: '100%', left: 15, top: 0, position: 'absolute', background: '#282828' }} />
                <div style={{ width: 391, height: 694, left: 79, top: 226, position: 'absolute' }}>
                    {createProfile(ownProfileId)}
                </div>
                <div style={{ width: 367, height: 70, left: 91, top: 74, position: 'absolute', color: '#DADADA', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Click on the heart if you think your character and the character on the right would be a match. Otherwise, click on the cross.</div>
                <div style={{ left: 92, top: 191, position: 'absolute', color: '#DADADA', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>This is your character:</div>
                <div style={{ left: 92, top: 47, position: 'absolute', color: '#DADADA', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>Instructions:</div>
            </div>
        </div>
    );
}
