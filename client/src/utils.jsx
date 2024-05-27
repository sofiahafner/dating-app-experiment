// utils.jsx
// import peepProfiles from '../data/peep_profiles.json';
import profiles from '../data/peep_profiles.json';
import Peep from 'react-peeps';
// import Peep from 'react-peeps';
import  { useState, useEffect} from 'react';
import { Effigy } from '../../client/open-peeps/lib/Effigy.tsx';
// import { Effigy } from "../data/open-peeps/lib/Effigy.tsx";

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

export function getMainHobby(profileId) {
    const profile = findProfileById(profileId);
    return profile ? profile.main_hobby : "Main Hobby not found";
}

export function getHobby1(profileId) {
    const profile = findProfileById(profileId);
    return profile ? profile.hobby_1 : "Profile not found";
}

export function getHobby2(profileId) {
    const profile = findProfileById(profileId);
    return profile ? profile.hobby_2 : "Profile not found";
}

export function getAccessory(profileId) {
    const profile = findProfileById(profileId);
    return profile ? profile.accessories : "Accessory not found";
}

export function getFace(profileId) {
    const profile = findProfileById(profileId);
    return profile ? profile.face : "Face not found";
}

export function getFacialHair(profileId) {
    const profile = findProfileById(profileId);
    return profile ? profile.facial_hair : "Facial hair not found";
}

export function getHair(profileId) {
    const profile = findProfileById(profileId);
    return profile ? profile.hair : "Hair not found";
}

export function getPose(profileId) {
    const profile = findProfileById(profileId);
    return profile ? profile.pose : "Pose not found";
}

export function getSkinTone(profileId) {
    const profile = findProfileById(profileId);
    return profile ? profile.skin_tone : "Skin tone not found";
}

export function getHairColor(profileId) {
    const profile = findProfileById(profileId);
    return profile ? profile.hair_color : "Hair color not found";
}

export function getClothesColor(profileId) {
    const profile = findProfileById(profileId);
    return profile ? profile.clothes_color : "Clothes color not found";
}

export function getRandomRecommendation(player, ownProfileID) {
    const pastOpponentIDs = (player.get("opponentIDs") || []).map(id => parseInt(id));


    const otherProfiles = profiles.filter(p => {
        const profileID = parseInt(p.profile_ID);
        return profileID !== parseInt(ownProfileID) && !pastOpponentIDs.includes(profileID);
    });

    if (otherProfiles.length === 0) {
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


// export function createProfile(profileId, linkToProfilePicture) {
//     const name = getName(profileId);
//     const age = getAge(profileId);
//     const hobby1 = getHobby1(profileId);
//     const hobby2 = getHobby2(profileId);

//     return (
//         <div style={{ width: '100%', height: 'auto', padding: '20px', background: '#D9D9D9', borderRadius: 15, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingBottom: 15, position: 'relative', borderRadius: 15, overflow: 'hidden', marginBottom: '20px' }}>
//             <img style={{ width: '100%', height: '100%', borderRadius: 15, marginBottom: '15px', objectFit: 'cover' }} src={linkToProfilePicture} />
//             <div style={{ color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>Name: {name}</div>
//             <div style={{ color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>Age: {age}</div>
//             <div style={{ color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>Hobbies: {hobby1}, {hobby2}</div>
//             <div style={{ color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>About me:</div>
//             <div style={{ color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>I Enjoy outdoor activities like swimming, fishing, or climbing</div>
//         </div>
//     );
// }

// export function createProfile(profileId) {
//     const name = getName(profileId);
//     const age = getAge(profileId);
//     const hobby1 = getHobby1(profileId);
//     const hobby2 = getHobby2(profileId);

//     const styles = {
//         profileContainer: {
//             width: '100%',
//             padding: '20px',
//             background: '#D9D9D9',
//             borderRadius: 15,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'flex-start',
//             marginBottom: '20px',
//             overflow: 'hidden',
//         },
//         peepContainer: {
//             width: '100%',
//             height: '0',
//             paddingBottom: '100%', // 2:1 aspect ratio
//             position: 'relative',
//             marginBottom: '15px',
//         },
//         peepStyle: {
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//         },
//         textStyle: {
//             color: 'black',
//             fontSize: 12,
//             fontFamily: 'Inter',
//             fontWeight: '700',
//             wordWrap: 'break-word',
//         },
//         aboutTextStyle: {
//             color: 'black',
//             fontSize: 12,
//             fontFamily: 'Inter',
//             fontWeight: '400',
//             wordWrap: 'break-word',
//         },
//     };

//     return (
//         <div style={styles.profileContainer}>
//             <div style={styles.peepContainer}>
//                 <Peep
//                     style={styles.peepStyle}
//                     accessory='GlassRoundThick'
//                     body='Shirt'
//                     face='Cute'
//                     hair='ShortVolumed'
//                     facialHair='Dali'
//                     strokeColor='black'
//                     backgroundColor='#8d5524'
//                 />
//             </div>
//             <div style={styles.textStyle}>Name: {name}</div>
//             <div style={styles.textStyle}>Age: {age}</div>
//             <div style={styles.textStyle}>Hobbies: {hobby1}, {hobby2}</div>
//             <div style={styles.textStyle}>About me:</div>
//             <div style={styles.aboutTextStyle}>I enjoy outdoor activities like swimming, fishing, or climbing</div>
//         </div>
//     );
// }


export function createProfile(profileId) {
    const name = getName(profileId);
    const age = getAge(profileId);
    const hobby1 = getHobby1(profileId);
    const hobby2 = getHobby2(profileId);
    const accessory = getAccessory(profileId) || "None";
    const face = getFace(profileId);
    const facialHair = getFacialHair(profileId) || "None";
    const hair = getHair(profileId);
    const body = getPose(profileId); // Assuming body corresponds to the pose
    const skinTone = getSkinTone(profileId);
    const hairColor = getHairColor(profileId);
    const clothesColor = getClothesColor(profileId);

    const styles = {
        profileContainer: {
            width: '100%',
            padding: '20px',
            background: '#D9D9D9',
            borderRadius: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: '20px',
            overflow: 'hidden',
        },
        peepContainer: {
            width: '250px',
            height: '230px',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '15px',
        },
        textStyle: {
            color: 'black',
            fontSize: 12,
            fontFamily: 'Inter',
            fontWeight: '700',
            wordWrap: 'break-word',
        },
        aboutTextStyle: {
            color: 'black',
            fontSize: 12,
            fontFamily: 'Inter',
            fontWeight: '400',
            wordWrap: 'break-word',
        },
    };

    const bodyDetails = {
        type: body,
        options: { skinColor: skinTone, topColor: clothesColor, blazerColor: clothesColor, outlineColor: "#000" }
    };

    const headDetails = {
        type: hair,
        options: { hairColor: hairColor, skinColor: skinTone, outlineColor: "#000" }
    };

    const faceDetails = {
        type: face,
        options: { outlineColor: "#000" }
    };

    const beardDetails = {
        type: facialHair,
        options: { outlineColor: "#000", beardColor: "#000" }
    };

    const accessoryDetails = {
        type: accessory,
        options: { outlineColor: "#000", frameColor: "#8FAAAA" }
    };

    return (
        <div style={styles.profileContainer}>
            <div style={styles.peepContainer}>
                <Effigy 
                    body={bodyDetails} 
                    head={headDetails} 
                    face={faceDetails} 
                    beard={beardDetails} 
                    accessory={accessoryDetails} 
                    style={{ width: '100%', height: '100%' }} // Make the Effigy fit the container
                />
            </div>
            <div style={styles.textStyle}>Profile ID: {profileId}</div>
            <div style={styles.textStyle}>Name: {name}</div>
            <div style={styles.textStyle}>Age: {age}</div>
            <div style={styles.textStyle}>Hobbies: {hobby1}, {hobby2}</div>
            <div style={styles.textStyle}>About me:</div>
            <div style={styles.aboutTextStyle}>I enjoy outdoor activities like swimming, fishing, or climbing</div>
        </div>
    );
}
