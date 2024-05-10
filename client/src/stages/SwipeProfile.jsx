import React from 'react';
import { Player, usePlayer } from '@empirica/core/player/classic/react';
import profiles from '../../data/profiles.json';

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

  function getRandomRecommendation(own_profile_id) {
    // Filter out the own profile
    const otherProfiles = profiles.filter(p => parseInt(p.profile_ID) !== parseInt(own_profile_id));
    
    // Check if there are other profiles available
    if (otherProfiles.length === 0) {
        return null; // or handle this scenario appropriately
    }

    // Select a random profile from the remaining profiles
    const randomIndex = Math.floor(Math.random() * otherProfiles.length);
    const randomProfile = otherProfiles[randomIndex];

    // Return the profile_ID of the selected profile
    return randomProfile.profile_ID;
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
    const own_profile_name = getName(own_profile_id)
    const own_profile_age = getAge(own_profile_id)
    const own_profile_hobby1 = getHobby1(own_profile_id)
    const own_profile_hobby2 = getHobby2(own_profile_id)

    // const profile = findProfileById(1);
    // console.log(profile);
    const link_to_own_profile_picture = "https://raw.githubusercontent.com/sofiahafner/dating-app-experiment/main/profiles/pictures/"+ own_profile_id +".webp"

    const other_profile_id = getRandomRecommendation(own_profile_id)

    const other_profile_name = getName(other_profile_id)
    const other_profile_age = getAge(other_profile_id)
    const other_profile_hobby1 = getHobby1(other_profile_id)
    const other_profile_hobby2 = getHobby2(other_profile_id)

    // const profile = findProfileById(1);
    // console.log(profile);
    const link_to_other_profile_picture = "https://raw.githubusercontent.com/sofiahafner/dating-app-experiment/main/profiles/pictures/"+ other_profile_id +".webp"


  
    return (

    //   <div className="profile-container" style={{ textAlign: 'center', padding: '20px' }}>
    //     <img src={link_to_profile_picture} alt="Profile Pic" style={{ width: '200px', height: '200px' }} />
    //     <div className="profile-info" style={{ margin: '20px' }}>
    //       <p><strong>Name:</strong> {own_profile_name} </p>
    //       <p><strong>Age:</strong> {own_profile_age} </p>
    //       <p><strong>Hobbies:</strong>{own_profile_hobby1}, {own_profile_hobby2}</p>
    //     </div>
    //     <div>
    //       <button onClick={handleAccept} style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', marginRight: '10px', border: 'none', borderRadius: '5px' }}>
    //         &#10003; Accept
    //       </button>
    //       <button onClick={handleReject} style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
    //         &#10007; Reject
    //       </button>
    //     </div>
    //   </div>

<div style={{width: '100%', height: '100%', position: 'relative', background: 'white'}}>
    <div style={{width: 391, height: 694, left: 922, top: 49, position: 'absolute'}}>
        <div style={{width: 370, height: 685, left: 13, top: 0, position: 'absolute', background: '#D9D9D9', borderRadius: 30}} />
        <div style={{left: 39, top: 544, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>I am looking for someone who:</div>
        <div style={{left: 40, top: 478, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>On a typical Sunday I:</div>
        <div style={{width: 312, left: 40, top: 628, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>I listen to rock music to unwind after a day of outdoor adventures.</div>
        <div style={{left: 168, top: 376, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>{other_profile_name}</div>
        <div style={{left: 168, top: 400, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>{other_profile_age}</div>
        <div style={{left: 45, top: 400, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Age:</div>
        <div style={{left: 44, top: 380, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Name:</div>
        <div style={{left: 165, top: 421, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>{other_profile_hobby1}, {other_profile_hobby2}</div>
        <div style={{width: 313, left: 39, top: 496, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Enjoy outdoor activities like swimming, fishing, or climbing</div>
        <div style={{width: 313, left: 39, top: 562, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Shares my love for adventure and outdoor pursuits.</div>
        <div style={{left: 46, top: 421, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Hobbies:</div>
        <img style={{width: 308, height: 334, left: 44, top: 30, position: 'absolute', borderRadius: 30}} src={link_to_other_profile_picture}  />
        <div style={{left: 39, top: 610, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>A fun fact about me:</div>
    </div>
    <button onClick={handleAccept} style={{ border: 'none', background: 'none', padding: 0, position: 'absolute', left: 1149, top: 780 }}>
    <img src="../../data/Heart.png" alt="Accept" style={{ width: 156, height: 139 }} />
    </button>
    <button onClick={handleReject} style={{ border: 'none', background: 'none', padding: 0, position: 'absolute', left: 931, top: 775 }}>
    <img src="../../data/Multiply.png" alt="Reject" style={{ width: 147, height: 150 }} />
    </button>
    <div style={{width: 616, height: '100%', left: -54, top: -21, position: 'absolute'}}>
        <div style={{width: 482, height: '100%', left: 15, top: 0, position: 'absolute', background: '#282828'}} />
        <div style={{width: 391, height: 694, left: 79, top: 226, position: 'absolute'}}>
            <div style={{width: 370, height: 685, left: 13, top: 0, position: 'absolute', background: '#D9D9D9', borderRadius: 30}} />
            <div style={{left: 39, top: 544, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>I am looking for someone who:</div>
            <div style={{left: 40, top: 478, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>On a typical Sunday I:</div>
            <div style={{width: 309, left: 40, top: 628, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>I listen to rock music to unwind after a day of outdoor adventures.</div>
            <div style={{left: 168, top: 376, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>{own_profile_name}</div>
            <div style={{left: 168, top: 400, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>{own_profile_age}</div>
            <div style={{left: 45, top: 400, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Age:</div>
            <div style={{left: 44, top: 380, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Name:</div>
            <div style={{left: 165, top: 421, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>{own_profile_hobby1}, {own_profile_hobby2}</div>
            <div style={{width: 310, left: 39, top: 496, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Enjoy outdoor activities like swimming, fishing, or climbing</div>
            <div style={{width: 310, left: 39, top: 562, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Shares my love for adventure and outdoor pursuits.</div>
            <div style={{left: 46, top: 421, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Hobbies:</div>
            <div style={{left: 39, top: 610, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>A fun fact about me:</div>
            <img style={{width: 308, height: 334, left: 41, top: 30, position: 'absolute', borderRadius: 30}} src={link_to_own_profile_picture}  />
        </div>
        <div style={{width: 367, height: 70, left: 91, top: 74, position: 'absolute', color: '#DADADA', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Click on the heart if you think your character and the character on the right would be a match. Otherwise, click on the cross.</div>
        <div style={{left: 92, top: 191, position: 'absolute', color: '#DADADA', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>This is your character:</div>
        <div style={{left: 92, top: 47, position: 'absolute', color: '#DADADA', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Instructions:</div>
    </div>
</div>
    );
  }




