import * as React from "react";
import {addPost} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.postsData

    }
}

const MyPostsContainer = connect(mapStateToProps, {addPost})(MyPosts)


export default MyPostsContainer