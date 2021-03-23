import * as React from "react";
import {sendMessage} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        newMessageText: state.dialogsPage.newMessageText,
        profileData: state.profilePage.profileData,
        messageData: state.dialogsPage.messageData
    }
}

export default compose(
    connect(mapStateToProps,{sendMessage}),
    withAuthRedirect
)(Dialogs)