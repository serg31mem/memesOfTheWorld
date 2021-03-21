import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo userProfile={props.userProfile} status={props.status} updateProfileStatus={props.updateProfileStatus}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile