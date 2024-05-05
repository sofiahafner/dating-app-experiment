import React from 'react';
import { Player, usePlayer } from '@empirica/core/player/classic/react';

// export function SwipeProfile(){
//     return <div>"SwipeProfile" not yet implemented</div>
// }

export function SwipeProfile() {
    const player = usePlayer()

    const handleAccept = () => {
      player.round.set("decision", "accepted")
      player.stage.set("submit", true)
    };
  
    const handleReject = () => {
      player.round.set("decision", "rejected")
      player.stage.set("submit", true)
    };
  
    return (
      <div className="profile-container" style={{ textAlign: 'center', padding: '20px' }}>
        <img src="https://raw.githubusercontent.com/sofiahafner/dating-app-experiment/main/profiles/pictures/1.webp" alt="Profile Pic" style={{ width: '200px', height: '200px' }} />
        <div className="profile-info" style={{ margin: '20px' }}>
          <p><strong>Name:</strong> Sofia Hafner </p>
          <p><strong>Age:</strong> 23</p>
          <p><strong>Hobbies:</strong> Doing my Thesis</p>
        </div>
        <div>
          <button onClick={handleAccept} style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', marginRight: '10px', border: 'none', borderRadius: '5px' }}>
            &#10003; Accept
          </button>
          <button onClick={handleReject} style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
            &#10007; Reject
          </button>
        </div>
      </div>
    );
  }