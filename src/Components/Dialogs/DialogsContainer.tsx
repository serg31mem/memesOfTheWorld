import * as React from "react";
import {sendMessage} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppType} from "../../Redux/store-redux";
import {messageDataType, profileDataType} from "../../Types/types";

type mapStateToPropsType = {
    profileData: Array<profileDataType>
    messageData: Array<messageDataType>
}

let mapStateToProps = (state: AppType): mapStateToPropsType => {
    return {
        profileData: state.profilePage.profileData,
        messageData: state.dialogsPage.messageData
    }
}

export default compose(
    connect(mapStateToProps,{sendMessage}),
    withAuthRedirect
)(Dialogs)