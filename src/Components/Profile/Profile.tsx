import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import * as React from "react";
import {FC} from "react";
import s from './Profile.module.css'
import ProfilePhoto from "./ProfilePhoto/ProfilePhoto";
import {photoFileType, userProfileType} from "../../Types/types";

type PropsType = {
    isErrorForm: boolean
    errorMessage: string
    isOwner: boolean
    userProfile: userProfileType | null
    status: string
    updateProfileStatus: () => void
    saveProfile: (formData: any) => Promise<{ items: any }>
    savePhoto: (photo: photoFileType) => void
}

const Profile: FC<PropsType> = (props) => {
    return (
        <div className={s.profile}>
            <ProfilePhoto savePhoto={props.savePhoto}
                          isOwner={props.isOwner}
                          userProfile={props.userProfile}/>
            <ProfileInfo userProfile={props.userProfile}
                         status={props.status}
                         updateProfileStatus={props.updateProfileStatus}
                         isOwner={props.isOwner}
                         saveProfile={props.saveProfile}
                         errorMessage={props.errorMessage}
                         isErrorForm={props.isErrorForm}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile