import * as React from "react";
import {Form, Field} from 'react-final-form'
import {element} from "../../Common/Form control/FormControl";
import s from "./ProfileInfo.module.css";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save'
import {userProfileType} from "../../../Types/types";
import {FC} from "react";

const Input = element('input')
const Textarea = element('textarea')

type PropsType = {
    initialValues: userProfileType
    onSubmit: (formData: userProfileType) => void
    isErrorForm: boolean
    errorMessage: string
    userProfile: userProfileType
}
const ProfileDataForm: FC<PropsType> = (props) => {
    return (
        <Form initialValues={props.initialValues}
              onSubmit={props.onSubmit}
              render={({handleSubmit, form}) => (
                  <form onSubmit={handleSubmit}>
                      <div>
                          <Button
                              onClick={handleSubmit}
                              variant="contained"
                              color="primary"
                              size="small"
                              startIcon={<SaveIcon/>}
                          >
                              Save
                          </Button>
                      </div>
                      <div>
                          {props.isErrorForm && <div className={s.formSummaryError}>{props.errorMessage}</div>}
                      </div>
                      <div>
                          <b>Full Name:</b> <Field placeholder={'Full Name'} name={'fullName'} component={Input}/>
                      </div>
                      <div>
                          <b>About me</b>: <Field placeholder={'About me'} name={'aboutMe'} component={Input}/>
                      </div>
                      <div>
                          <b>Looking for a job:</b> <Field placeholder={''} name={'lookingForAJob'} component={Input}
                                                           type={'checkbox'}/>
                      </div>
                      <div>
                          <b>My professional skills:</b> <Field placeholder={'My professional skills'}
                                                                name={'lookingForAJobDescription'}
                                                                component={Textarea}/>
                      </div>
                      <div>
                          <b>Contact:</b> {Object.keys(props.userProfile.contacts).map(key => {
                          return <div className={s.contacts} key={key}><b>{key}:</b> <Field placeholder={key}
                                                                                            name={`contacts.${key}`}
                                                                                            component={Input}/>
                          </div>
                      })}
                      </div>
                  </form>
              )}/>
    )
}

export default ProfileDataForm