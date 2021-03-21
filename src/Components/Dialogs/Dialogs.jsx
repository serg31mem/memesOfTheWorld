import s from './Dialogs.module.css'
import * as React from "react";
import {Field, reduxForm} from "redux-form";
import {element} from "../Common/Form control/FormControl";
import {maxLengthCreator, required} from "../../utils/validators";

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
    const sendMessage = (formData) => {
        props.sendMessage(formData.newMessageText)
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {props.dialogsElements}
            </div>
            <div className={s.messages}>
                {props.messageElements}
                <AddMessageReduxForm onSubmit={sendMessage}/>
            </div>
        </div>
    )
}


export default Dialogs