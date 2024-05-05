import React from 'react';
import { Player, usePlayer } from '@empirica/core/player/classic/react';
import profiles from '../../profiles.json';

function findProfileById(profileId) {
    const profile = profiles.find(p => parseInt(p.profile_ID) === parseInt(profileId));
    return profile;
  }
  
  function getName(profileId) {
    const profile = findProfileById(profileId);
    return profile ? profile.name : "Profile not found";
  }
  
  function getAge(profileId) {
    const profile = findProfileById(profileId);
    return profile ? profile.age : "Profile not found";
  }
  
  function getHobby1(profileId) {
    const profile = findProfileById(profileId);
    return profile ? profile.hobby1 : "Profile not found";
  }
  
  function getHobby2(profileId) {
    const profile = findProfileById(profileId);
    return profile ? profile.hobby2 : "Profile not found";
  }


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

    const own_profile_id = player.round.get("ownProfileID")
    console.log(own_profile_id)

    const own_profile_name = getName(own_profile_id)
    const own_profile_age = getAge(own_profile_id)
    const own_profile_hobby1 = getHobby1(own_profile_id)
    const own_profile_hobby2 = getHobby2(own_profile_id)

    // const profile = findProfileById(1);
    // console.log(profile);
    const link_to_profile_picture = "https://raw.githubusercontent.com/sofiahafner/dating-app-experiment/main/profiles/pictures/"+ own_profile_id +".webp"
  
    return (
      <div className="profile-container" style={{ textAlign: 'center', padding: '20px' }}>
        <img src={link_to_profile_picture} alt="Profile Pic" style={{ width: '200px', height: '200px' }} />
        <div className="profile-info" style={{ margin: '20px' }}>
          <p><strong>Name:</strong> {own_profile_name} </p>
          <p><strong>Age:</strong> {own_profile_age} </p>
          <p><strong>Hobbies:</strong>{own_profile_hobby1}, {own_profile_hobby2}</p>
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