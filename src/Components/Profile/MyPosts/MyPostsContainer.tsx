import * as React from "react";
import {addPost} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppType} from "../../../Redux/store-redux";
import {postsDataType} from "../../../Types/types";

type mapStateToPropsType = {
    posts: Array<postsDataType>
}
let mapStateToProps = (state: AppType): mapStateToPropsType => {
    return {
        posts: state.profilePage.postsData
    }
}

export default connect(mapStateToProps, {addPost})(MyPosts)