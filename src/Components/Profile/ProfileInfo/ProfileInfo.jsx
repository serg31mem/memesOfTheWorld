import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import * as React from "react";
import {useState} from "react";
import ProfileDataForm from "./ProfileDataForm";
import Button from "@material-ui/core/Button";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {NavLink} from "react-router-dom";

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false)

    if (!props.userProfile) {
        return <div></div>
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
        <div>
            <ProfileStatusWithHooks status={props.status} updateProfileStatus={props.updateProfileStatus}/>

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
        {props.isOwner &&
        <div className={s.button}>
            <Button type="submit"
                    onClick={props.goToEditMode}
                    variant="contained"
                    color="primary"
                    size="small">Edit profile</Button>
        </div>}
    </div>
}

const Contact = (props) => {
    return <div className={s.contacts}>
        <b>{props.contactTitle}: </b>
        <a target="_blank" href={props.contactValue}>{props.contactValue}</a>
    </div>
}

export default ProfileInfo