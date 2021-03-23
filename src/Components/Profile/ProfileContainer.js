import * as React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getProfileStatus, savePhoto, saveProfile, updateProfileStatus} from "../../Redux/profile-reducer";
import {withRouter} from "react-router";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile = () => {
        // the line below is taken from withRouter
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authuserID
        }
        this.props.getProfile(userId)
        this.props.getProfileStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <div>
                <Profile {...this.props}
                         userProfile={this.props.userProfile}
                         status={this.props.status}
                         updateProfileStatus={this.props.updateProfileStatus}
                         isOwner={!this.props.match.params.userId}
                         savePhoto={this.props.savePhoto}
                         saveProfile={this.props.saveProfile} />

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
    connect(mapStateToProps, {getProfile, getProfileStatus, updateProfileStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
