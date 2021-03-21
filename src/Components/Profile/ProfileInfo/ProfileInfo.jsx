import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import * as React from "react";
import userPhoto from '../../../assets/images/userPhoto.png'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
    if (!props.userProfile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div className={s.profilePhoto}>
            {props.userProfile.fullName}
            <div/>
            <div>
                <img src={props.userProfile.photos.large != null ? props.userProfile.photos.large : userPhoto}/>
                <div>
                    {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                </div>
            </div>
            <div>
                <ProfileStatusWithHooks status={props.status} updateProfileStatus={props.updateProfileStatus}/>
            </div>
            <div>
                {props.userProfile.aboutMe === null
                    ? 'About me: Еще нет'
                    : `About me: ${props.userProfile.aboutMe}`}
            </div>
            <div>
                {`My contacts: `}
                <div/>
                {props.userProfile.contacts.facebook === null
                    ? `facebook: Еще нет`
                    : `facebook: ${props.userProfile.contacts.facebook}`}
                <div/>
                {props.userProfile.contacts.website === null
                    ? 'website: Еще нет'
                    : `website: ${props.userProfile.contacts.website}`
                }
                <div/>
                {props.userProfile.contacts.vk === null
                    ? `VK: Еще нет`
                    : `VK: ${props.userProfile.contacts.vk}`}
                <div/>
                {props.userProfile.contacts.twitter === null
                    ? `Twitter: Еще нет`
                    : `Twitter: ${props.userProfile.contacts.twitter}`}
                <div/>
                {props.userProfile.contacts.instagram === null
                    ? `Instagram: Еще нет`
                    : `Instagram: ${props.userProfile.contacts.instagram}`}
                <div/>
                {props.userProfile.contacts.youtube === null
                    ? 'youtube: Еще нет'
                    : `youtube: ${props.userProfile.contacts.youtube}`
                }
                <div/>
                {props.userProfile.contacts.github === null
                    ? `github: Еще нет`
                    : `github: ${props.userProfile.contacts.github}`}
                <div/>
                {props.userProfile.contacts.mainLink === null
                    ? 'mainLink: Еще нет'
                    : `mainLink: ${props.userProfile.contacts.mainLink}`
                }
                <div>
                    {props.userProfile.lookingForAJob
                        ? `Ищу работу: ${props.userProfile.lookingForAJobDescription}`
                        : 'Не ищу работу'}
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo