import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import * as React from "react";
import {useState} from "react";
import userPhoto from '../../../assets/images/userPhoto.png'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataFormRedux from "./ProfileDataForm";
import ProfileDataForm from "./ProfileDataForm";

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
                ? <ProfileDataForm initialValues={props.userProfile} userProfile={props.userProfile}
                                        onSubmit={onSubmit} errorMessage={props.errorMessage}
                                        isErrorForm={props.isErrorForm}/>
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