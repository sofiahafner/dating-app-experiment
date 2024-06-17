// utils.jsx
// import peepProfiles from '../data/peep_profiles.json';
import profiles from '../data/peep_profiles.json';
import Peep from 'react-peeps';
import  { useState, useEffect} from 'react';
import { Effigy } from '../../client/open-peeps/lib/Effigy.tsx';



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

export function getJob(profileId) {
    const profile = findProfileById(profileId);
    return profile ? profile.job : "Job not found";
}

export function getAdditionalInfo(profileId) {
    const profile = findProfileById(profileId);
    return profile ? profile.body_has_color.toString()  : "Face Mood not found";
}


export function createProfile(profileId) {
    const name = getName(profileId);
    const age = getAge(profileId);
    const hobby1 = getHobby1(profileId);
    const hobby2 = getHobby2(profileId);
    const accessory = getAccessory(profileId) || "None";
    const face = getFace(profileId);
    const facialHair = getFacialHair(profileId) || "None";
    const hair = getHair(profileId);
    const body = getPose(profileId);
    const skinTone = getSkinTone(profileId);
    const hairColor = getHairColor(profileId);
    const clothesColor = getClothesColor(profileId);
    const job = getJob(profileId);

    const styles = {
        profileContainer: {
            width: '100%',
            padding: '10px',
            background: '#D9D9D9',
            borderRadius: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: '20px',
            overflow: 'hidden',
        },
        peepContainer: {
            width: '100%',
            height: '170px',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '15px',
        },
        textContainer: {
            width: '100%',
            height: '90px',
            overflow: 'hidden',
        },
        textStyle: {
            color: 'black',
            fontSize: '14px',
            fontFamily: 'Inter',
            fontWeight: '700',
            wordWrap: 'break-word',
        },
        answerTextStyle: {
            color: 'black',
            fontSize: '14px',
            fontFamily: 'Inter',
            fontWeight: '400',
            wordWrap: 'break-word',
        },
        aboutTextStyle: {
            color: 'black',
            fontSize: '14px',
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
            <div style={{ ...styles.peepContainer, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Effigy 
                    body={bodyDetails} 
                    head={headDetails} 
                    face={faceDetails} 
                    beard={beardDetails} 
                    accessory={accessoryDetails} 
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
            <div style={styles.textContainer}>
                <div style={styles.textStyle}>Age: <span style={styles.answerTextStyle}>{age}</span></div>
                <div style={styles.textStyle}>Hobbies: <span style={styles.answerTextStyle}>{hobby1}, {hobby2}</span></div>
                {/* <div style={styles.textStyle}>Hobbies:</div>
                <div style={styles.aboutTextStyle}>{hobby1}, {hobby2}</div> */}
                <div style={styles.textStyle}>Job: <span style={styles.answerTextStyle}>{job}</span></div>
                {/* <div style={styles.textStyle}>About me:</div>
                <div style={styles.aboutTextStyle}>{getProfileBio(profileId)}</div> */}
            </div>
        </div>
    );
}