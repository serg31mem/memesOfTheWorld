import s from './Dialogs.module.css'
import * as React from "react";
import {Form, Field} from 'react-final-form'
import {element} from "../Common/Form control/FormControl";
import {composeValidators, maxLengthCreator, required} from "../../utils/validators";
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import Button from "@material-ui/core/Button";
import {Icon} from "@material-ui/core";
import {messageDataType, profileDataType} from "../../Types/types";
import { FC } from 'react';

const maxLength100 = maxLengthCreator(100)
const Textarea = element('textarea')

type PropsAddMessageFormType = {
    sendMessage: (newMessageText: string) => void
}
type FormDataType = {
    newMessageText: string
}
const AddMessageForm: FC<PropsAddMessageFormType> = (props) => {

    const sendMessage = (formData: FormDataType) => {
        props.sendMessage(formData.newMessageText)
    }

    return (
        <Form
            onSubmit={sendMessage}
            render={({handleSubmit, form}) => (
                <form onSubmit={handleSubmit}>
                    <div className={s.newMessage}>
                        <Field placeholder={'Message'} name={'newMessageText'} component={Textarea}
                               validate={composeValidators(required, maxLength100)}/>
                    </div>
                    <div>
                        <Button
                            onClick={async event => {
                                await handleSubmit(event)
                                form.reset()
                                form.resetFieldState('newMessageText')
                            }}
                            variant="contained"
                            color="primary"
                            endIcon={<Icon>send</Icon>}
                        >
                            Send
                        </Button>
                    </div>
                </form>
            )}/>
    )
}

type PropsDialogsType = {
    profileData: Array<profileDataType>
    messageData: Array<messageDataType>
    sendMessage: (newMessageText: string) => void
}
const Dialogs: FC<PropsDialogsType> = (props) => {

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
