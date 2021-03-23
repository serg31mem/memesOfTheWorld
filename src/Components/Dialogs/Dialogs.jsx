import s from './Dialogs.module.css'
import * as React from "react";
import {Field, reduxForm, reset} from "redux-form";
import {element} from "../Common/Form control/FormControl";
import {maxLengthCreator, required} from "../../utils/validators";
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";

const maxLength100 = maxLengthCreator(100)

const Textarea = element('textarea')

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.newMessage}>
                <Field placeholder={'Message'} name={'newMessageText'} component={Textarea}
                       validate={[required, maxLength100]}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm({form: 'addMessage'})(AddMessageForm)

const Dialogs = (props) => {

    let dialogsElements = props.profileData
        .map(dialog => <Dialog name={dialog.name} id={dialog.id} avatar={dialog.avatar}
                               homeLink={dialog.homeLink} key={dialog.id}/>)
    let messageElements = props.messageData
        .map(message => <Message textMessage={message.textMessage} key={message.id}/>)

    const sendMessage = (formData, dispatch) => {
        props.sendMessage(formData.newMessageText)
        dispatch(reset('addMessage'))
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messageElements}
                <AddMessageReduxForm onSubmit={sendMessage}/>
            </div>
        </div>
    )
}


export default Dialogs