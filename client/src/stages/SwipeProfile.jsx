import React from 'react';
import { Player, usePlayer } from '@empirica/core/player/classic/react';

// export function SwipeProfile(){
//     return <div>"SwipeProfile" not yet implemented</div>
// }

export function SwipeProfile() {
    console.log("in SwipeProfile")
    const player = usePlayer()

    const handleAccept = () => {
      console.log('Profile Accepted');
      player.round.set("decision", "accepted")
      player.stage.set("submit", true)
    };
  
    const handleReject = () => {
      console.log('Profile Rejected');
      player.round.set("decision", "rejected")
      player.stage.set("submit", true)
    };
  
    return (
      <div className="profile-container" style={{ textAlign: 'center', padding: '20px' }}>
        <img src="https://upload.wikimedia.org/wikipedia/en/0/06/Promising_Young_Woman_poster.jpg" alt="Profile Pic" style={{ width: '200px', height: '200px' }} />
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