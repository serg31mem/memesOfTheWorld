import * as React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getProfileStatus, updateProfileStatus} from "../../Redux/profile-reducer";
import {withRouter} from "react-router";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authuserID
        }
        this.props.getProfile(userId)
        this.props.getProfileStatus(userId)

    }

    render() {
        return (
            <div>
                <Profile {...this.props} userProfile={this.props.userProfile}
                status={this.props.status} updateProfileStatus={this.props.updateProfileStatus}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        userProfile: state.profilePage.userProfile,
        status: state.profilePage.status,
        authuserID: state.auth.userID
    }
}

export default compose(
    connect(mapStateToProps, {getProfile, getProfileStatus, updateProfileStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
