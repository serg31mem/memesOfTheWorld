import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import * as React from "react";
import ProfileStatusWithHooks from "./ProfileInfo/ProfileStatusWithHooks";
import s from './Profile.module.css'
import ProfilePhoto from "./ProfilePhoto/ProfilePhoto";

const Profile = (props) => {
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