import s from './Dialogs.module.css'
import * as React from "react";
import {Form, Field} from 'react-final-form'
import {element} from "../Common/Form control/FormControl";
import {composeValidators, maxLengthCreator, required} from "../../utils/validators";
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";

const maxLength100 = maxLengthCreator(100)

const Textarea = element('textarea')

const AddMessageForm = (props) => {

    const sendMessage = (formData) => {
        props.sendMessage(formData.newMessageText)
    }

    return (
        <Form
            onSubmit={sendMessage}
            render={({handleSubmit, form}) => (
                <form onSubmit={async event => {
                    await handleSubmit(event)
                    form.reset()
                    form.resetFieldState('newMessageText')
                }}>
                    <div className={s.newMessage}>
                        <Field placeholder={'Message'} name={'newMessageText'} component={Textarea}
                               validate={composeValidators(required, maxLength100)}/>
                    </div>
                    <div>
                        <button>Send</button>
                    </div>
                </form>
            )}/>
    )
}

const Dialogs = (props) => {

    let dialogsElements = props.profileData
        .map(dialog => <Dialog name={dialog.name} id={dialog.id} avatar={dialog.avatar}
                               homeLink={dialog.homeLink} key={dialog.id}/>)
    let messageElements = props.messageData
        .map(message => <Message textMessage={message.textMessage} key={message.id}/>)


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messageElements}
                <AddMessageForm sendMessage={props.sendMessage}/>
            </div>
        </div>
    )
}


export default Dialogs