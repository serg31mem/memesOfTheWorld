import * as React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getProfileStatus, savePhoto, saveProfile, updateProfileStatus} from "../../Redux/profile-reducer";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {AppType} from "../../Redux/store-redux";
import {photoFileType, userProfileType} from "../../Types/types";

type mapStateToPropsType = {
    userProfile: userProfileType | null
    status: string
    authUserID: number | null
    isErrorForm: boolean
    errorMessage: string
}
type withRouterPropsType = {
    match: any
    history: any
}
type mapDispatchToPropsType = {
    getProfile: (userId: number) => void
    getProfileStatus: (userId: number) => void
    updateProfileStatus: () => void
    savePhoto: (photo: photoFileType) => void
    saveProfile: (formData: userProfileType) => Promise<{ items: any }>
}
type PropsType = mapStateToPropsType & mapDispatchToPropsType & withRouterPropsType

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile = () => {
        // match.params is taken from withRouter
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authUserID
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getProfile(userId)
        this.props.getProfileStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType) {
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
                         saveProfile={this.props.saveProfile}
                         errorMessage={this.props.errorMessage}
                         isErrorForm={this.props.isErrorForm}/>

            </div>
        )
    }
}

let mapStateToProps = (state: AppType): mapStateToPropsType => {
    return {
        userProfile: state.profilePage.userProfile,
        status: state.profilePage.status,
        authUserID: state.auth.userID,
        isErrorForm: state.profilePage.isErrorForm,
        errorMessage: state.profilePage.errorMessage,
    }
}

export default compose(
    connect(mapStateToProps,
        {getProfile, getProfileStatus, updateProfileStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
