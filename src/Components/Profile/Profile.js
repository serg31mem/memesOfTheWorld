import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import * as React from "react";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo userProfile={props.userProfile}
                         status={props.status}
                         updateProfileStatus={props.updateProfileStatus}
                         isOwner={props.isOwner}
                         savePhoto={props.savePhoto}
                         saveProfile={props.saveProfile}
                         errorMessage={props.errorMessage}
                         isErrorForm={props.isErrorForm}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile