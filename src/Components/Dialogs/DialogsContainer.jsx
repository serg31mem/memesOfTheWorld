import * as React from "react";
import {sendMessage} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        newMessageText: state.dialogsPage.newMessageText,
        dialogsElements: state.profilePage.profileData
            .map(dialog => <Dialog name={dialog.name} id={dialog.id} avatar={dialog.avatar}
                                   homeLink={dialog.homeLink} key={dialog.id}/>),
        messageElements: state.dialogsPage.messageData
            .map(message => <Message textMessage={message.textMessage} key={message.id}/>)
    }
}

export default compose(
    connect(mapStateToProps,{sendMessage}),
    withAuthRedirect
)(Dialogs)