import React from 'react';
import { usePlayer, usePlayers } from '@empirica/core/player/classic/react';
import { Button } from '../components/Button.jsx';


export function Results() {
    const player = usePlayer();
    const player_decision = player.round.get("decision");

    return (
        <div>
            <p>You chose {player_decision}</p>
        </div>
    );
}

// multi player:
// export function Results() {
//     const treatment = game.get("treatment");
//     const { name } = treatment; // Destructuring numRounds from treatment
//     const player = usePlayer();
//     const players = usePlayers();
//     const opponent = players.filter(p => p.id !== player.id)[0];
//     const player_decision = player.round.get("decision");
//     const opponent_decision = opponent.round.get("decision");

//     const isMatch = player_decision === "accepted" && opponent_decision === "accepted";

//     return (
//         <div>
//             <p>You chose {player_decision}</p>
//             {isMatch ? (
//                 <h1 style={{ color: 'green', fontSize: '40px' }}>It's a match!!!</h1>
//             ) : (
//                 <h1 style={{ color: 'red', fontSize: '40px' }}>It's not a match</h1>
//             )}
//             {/* <button onClick={() => player.stage.set("submit", true)}>
//                 Play Again
//             </button> */}
//         </div>
//     );
// }
