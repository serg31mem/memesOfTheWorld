import s from './ProfileInfo.module.css'
import * as React from "react";
import {FC, useState} from "react";
import ProfileDataForm from "./ProfileDataForm";
import Button from "@material-ui/core/Button";
import ProfileStatus from "./ProfileStatus";
import {userProfileType} from "../../../Types/types";
import {promises} from "dns";

type ProfileInfoPropsType = {
    status: string
    userProfile: userProfileType | null
    errorMessage: string
    isErrorForm: boolean
    isOwner: boolean
    updateProfileStatus: () => void
    saveProfile: (formData: userProfileType) => Promise<{ items: any }>
}
const ProfileInfo: FC<ProfileInfoPropsType> = (props) => {

    const [editMode, setEditMode] = useState(false)

    if (!props.userProfile) {
        return <div></div>
    }

    const onSubmit = (formData: userProfileType) => {
        props.saveProfile(formData)
            .then(
                () => {
                    setEditMode(false)
                }
            )
    }

    return (
        <div className={s.profileInfo}>
            <ProfileStatus status={props.status} updateProfileStatus={props.updateProfileStatus}/>
            <div className={s.profileData}>
                {editMode
                    ? <ProfileDataForm initialValues={props.userProfile} userProfile={props.userProfile}
                                       onSubmit={onSubmit} errorMessage={props.errorMessage}
                                       isErrorForm={props.isErrorForm}/>
                    : <ProfileData userProfile={props.userProfile} isOwner={props.isOwner}
                                   goToEditMode={() => setEditMode(true)}/>}
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    userProfile: userProfileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData: FC<ProfileDataPropsType> = (props) => {
    const [openContact, setOpenContact] = useState(false)

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
            {openContact
                ? <b className={s.contactsClick} onClick={() => setOpenContact(false)}>Contacts</b>
                : <b className={s.contactsClick} onClick={() => setOpenContact(true)}>Contacts</b>}
            {openContact && <div>{Object.keys(props.userProfile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={props.userProfile.contacts[key]}/>
            })}</div>}
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

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: FC<ContactPropsType> = (props) => {
    console.log('render')

    return <div className={s.contacts}>
        <b>{props.contactTitle}: </b>
        <a target="_blank" href={props.contactValue}>{props.contactValue}</a>
    </div>
}

export default ProfileInfo