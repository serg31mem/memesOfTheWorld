import * as React from "react";
import {Field, reduxForm} from "redux-form";
import {element} from "../../Common/Form control/FormControl";
import s from "./ProfileInfo.module.css";

const Input = element('input')
const Textarea = element('textarea')

const ProfileDataForm = (props) => {

    return <form onSubmit={props.handleSubmit}>
        <div>
            <button>Save</button>
        </div>
        <div>
            {props.error && <div className={s.formSummaryError}>{props.error}</div>}
        </div>
        <div>
            <b>Full Name:</b> <Field placeholder={'Full Name'} name={'fullName'} component={Input}
                                     validate={[]}/>
        </div>
        <div>
            <b>About me</b>: <Field placeholder={'About me'} name={'aboutMe'} component={Input}
                                    validate={[]}/>
        </div>
        <div>
            <b>Looking for a job:</b> <Field placeholder={''} name={'lookingForAJob'} component={Input}
                                             validate={[]} type={'checkbox'}/>
        </div>
        <div>
            <b>My professional skills:</b> <Field placeholder={'My professional skills'}
                                                  name={'lookingForAJobDescription'} component={Textarea}
                                                  validate={[]}/>
        </div>

        <div>
            <b>Contact</b>: {Object.keys(props.userProfile.contacts).map(key => {
            return <div className={s.contacts} key={key}><b>{key}:</b> <Field placeholder={key} name={`contacts.${key}`} component={Input}
                                             validate={[]}/>
            </div>
        })}
        </div>
    </form>
}

const ProfileDataFormRedux = reduxForm({form: 'profile-edit'})(ProfileDataForm)

export default ProfileDataFormRedux