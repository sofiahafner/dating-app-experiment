// utils.jsx
import profiles from '../data/profiles.json';

export function findProfileById(profileId) {
    return profiles.find(p => parseInt(p.profile_ID) === parseInt(profileId));
}

export function getName(profileId) {
    const profile = findProfileById(profileId);
    return profile ? profile.name : "Profile not found";
}

export function getAge(profileId) {
    const profile = findProfileById(profileId);
    return profile ? profile.age : "Profile not found";
}

export function getHobby1(profileId) {
    const profile = findProfileById(profileId);
    return profile ? profile.hobby1 : "Profile not found";
}

export function getHobby2(profileId) {
    const profile = findProfileById(profileId);
    return profile ? profile.hobby2 : "Profile not found";
}

export function getRandomRecommendation(player, ownProfileID) {
    const pastOpponentIDs = (player.get("opponentIDs") || []).map(id => parseInt(id));

    const otherProfiles = profiles.filter(p => {
        const profileID = parseInt(p.profile_ID);
        return profileID !== parseInt(ownProfileID) && !pastOpponentIDs.includes(profileID);
    });

    if (otherProfiles.length === 0) {
        console.log("No eligible profiles found.");
        return null; 
    }

    const randomIndex = Math.floor(Math.random() * otherProfiles.length);
    return otherProfiles[randomIndex].profile_ID;
}

// export function createProfile(profileId, linkToProfilePicture) {
//     const name = getName(profileId);
//     const age = getAge(profileId);
//     const hobby1 = getHobby1(profileId);
//     const hobby2 = getHobby2(profileId);

//     return (
//         <div style={{ width: 391, height: 694, position: 'absolute' }}>
//             <div style={{ width: 370, height: 685, position: 'absolute', background: '#D9D9D9', borderRadius: 30, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                 <img style={{ width: 308, height: 334, borderRadius: 30, marginTop: '20px' }} src={linkToProfilePicture} />
//                 <div style={{ width: '100%', padding: '20px', boxSizing: 'border-box' }}>
//                     <div style={{ color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>Name: {name}</div>
//                     <div style={{ color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>Age: {age}</div>
//                     <div style={{ color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>Hobbies: {hobby1}, {hobby2}</div>
//                     <div style={{ color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>On a typical Sunday I:</div>
//                     <div style={{ color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Enjoy outdoor activities like swimming, fishing, or climbing</div>
//                     <div style={{ color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>I am looking for someone who:</div>
//                     <div style={{ color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Shares my love for adventure and outdoor pursuits.</div>
//                     <div style={{ color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>A fun fact about me:</div>
//                     <div style={{ color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>I listen to rock music to unwind after a day of outdoor adventures.</div>
//                 </div>
//             </div>
//         </div>
//     );
// }


export function createProfile(profileId, linkToProfilePicture) {
    const name = getName(profileId);
    const age = getAge(profileId);
    const hobby1 = getHobby1(profileId);
    const hobby2 = getHobby2(profileId);

    return (
        <div style={{ width: '100%', height: 'auto', padding: '20px', background: '#D9D9D9', borderRadius: 15, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingBottom: 15, position: 'relative', borderRadius: 15, overflow: 'hidden', marginBottom: '20px' }}>
            <img style={{ width: '100%', height: '100%', borderRadius: 15, marginBottom: '15px', objectFit: 'cover' }} src={linkToProfilePicture} />
            <div style={{ color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>Name: {name}</div>
            <div style={{ color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>Age: {age}</div>
            <div style={{ color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>Hobbies: {hobby1}, {hobby2}</div>
            <div style={{ color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>About me:</div>
            <div style={{ color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>I Enjoy outdoor activities like swimming, fishing, or climbing</div>
        </div>
    );
}

// export function createProfile(profileId, linkToProfilePicture) {
//     const name = getName(profileId);
//     const age = getAge(profileId);
//     const hobby1 = getHobby1(profileId);
//     const hobby2 = getHobby2(profileId);

//     return (
//         <div style={{ width: '100%', padding: '20px', background: '#D9D9D9', borderRadius: 15, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
//             <div style={{ width: '100%', paddingBottom: '200%', position: 'relative', borderRadius: 15, overflow: 'hidden', marginBottom: '20px' }}>
//                 <img style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} src={linkToProfilePicture} />
//             </div>
//             <div style={{ color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>Name: {name}</div>
//             <div style={{ color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>Age: {age}</div>
//             <div style={{ color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>Hobbies: {hobby1}, {hobby2}</div>
//             <div style={{ color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>On a typical Sunday I:</div>
//             <div style={{ color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Enjoy outdoor activities like swimming, fishing, or climbing</div>
//             <div style={{ color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>I am looking for someone who:</div>
//             <div style={{ color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Shares my love for adventure and outdoor pursuits.</div>
//             <div style={{ color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>A fun fact about me:</div>
//             <div style={{ color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>I listen to rock music to unwind after a day of outdoor adventures.</div>
//         </div>
//     );
// }
