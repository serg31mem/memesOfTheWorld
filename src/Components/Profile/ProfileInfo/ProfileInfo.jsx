import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import * as React from "react";
import userPhoto from '../../../assets/images/userPhoto.png'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {useState} from "react";
import ProfileDataFormRedux from "./ProfileDataForm";

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false)

    if (!props.userProfile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData)
            .then(
            () => {
                setEditMode(false)
            }
        )
    }

    return (
        <div className={s.profilePhoto}>
            <div>
                <img src={props.userProfile.photos.large != null ? props.userProfile.photos.large : userPhoto}/>
                <div>
                    {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                </div>
            </div>
            <div>
                <ProfileStatusWithHooks status={props.status} updateProfileStatus={props.updateProfileStatus}/>
            </div>
            {editMode
                ? <ProfileDataFormRedux initialValues={props.userProfile} userProfile={props.userProfile} onSubmit={onSubmit}/>
                : <ProfileData userProfile={props.userProfile} isOwner={props.isOwner}
                               goToEditMode={() => setEditMode(true)}/>}

        </div>
    )
}

const ProfileData = (props) => {
    return <div>
        {props.isOwner &&
        <div>
            <button onClick={props.goToEditMode}>Edit profile</button>
        </div>}
        <div>
            <b>Full Name:</b> {props.userProfile.fullName}
        </div>
        <div>
            <b>About me:</b> {props.userProfile.aboutMe}
        </div>
        <div>
            <b>Looking for a job:</b> {props.userProfile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {props.userProfile.lookingForAJob &&
        <div>
            <b>My professional skills:</b> {props.userProfile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>Contact:</b> {Object.keys(props.userProfile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={props.userProfile.contacts[key]}/>
        })}
        </div>
    </div>
}

const Contact = (props) => {
    return <div className={s.contacts}><b>{props.contactTitle}:</b> {props.contactValue}</div>
}

export default ProfileInfo


// {`My contacts: `}
// <div/>
// {props.userProfile.contacts.facebook === null
//     ? `facebook: Еще нет`
//     : `facebook: ${props.userProfile.contacts.facebook}`}
// <div/>
// {props.userProfile.contacts.website === null
//     ? 'website: Еще нет'
//     : `website: ${props.userProfile.contacts.website}`
// }
// <div/>
// {props.userProfile.contacts.vk === null
//     ? `VK: Еще нет`
//     : `VK: ${props.userProfile.contacts.vk}`}
// <div/>
// {props.userProfile.contacts.twitter === null
//     ? `Twitter: Еще нет`
//     : `Twitter: ${props.userProfile.contacts.twitter}`}
// <div/>
// {props.userProfile.contacts.instagram === null
//     ? `Instagram: Еще нет`
//     : `Instagram: ${props.userProfile.contacts.instagram}`}
// <div/>
// {props.userProfile.contacts.youtube === null
//     ? 'youtube: Еще нет'
//     : `youtube: ${props.userProfile.contacts.youtube}`
// }
// <div/>
// {props.userProfile.contacts.github === null
//     ? `github: Еще нет`
//     : `github: ${props.userProfile.contacts.github}`}
// <div/>
// {props.userProfile.contacts.mainLink === null
//     ? 'mainLink: Еще нет'
//     : `mainLink: ${props.userProfile.contacts.mainLink}`
// }
// <div>
//     {props.userProfile.lookingForAJob
//         ? `Ищу работу: ${props.userProfile.lookingForAJobDescription}`
//         : 'Не ищу работу'}
// </div>