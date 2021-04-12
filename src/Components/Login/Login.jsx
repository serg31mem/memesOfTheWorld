import {Form, Field} from 'react-final-form'
import {connect} from "react-redux";
import {authLogin} from "../../Redux/auth-reducer";
import {element} from "../Common/Form control/FormControl";
import {required} from "../../utils/validators";
import {Redirect} from "react-router-dom";
import s from './Login.module.css'
import * as React from "react";
import Button from "@material-ui/core/Button";

const Input = element('input')

const LoginForm = (props) => {

    const onSubmit = (formData) => {
        props.authLogin(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    return (
        <Form onSubmit={onSubmit}
              render={({handleSubmit, submitting, pristine}) => (
                  <form onSubmit={async event => {
                      await handleSubmit(event)
                  }}>
                      <div>
                          <Field placeholder={'Email'} name={'email'} component={Input}
                                 validate={required}/>
                      </div>
                      <div>
                          <Field placeholder={'Password'} name={'password'} component={Input} type={'password'}
                                 validate={required}/>
                      </div>
                      <div>
                          <Field type={'checkbox'} name={'rememberMe'} component={Input}/> remember me
                      </div>
                      <div className={s.captcha}>
                          {props.captchaUrl && <img src={props.captchaUrl}/>}
                      </div>
                      <div>
                          {props.captchaUrl && <Field placeholder={'Enter captcha'} name={'captcha'} component={Input}
                                                      validate={required}/>}
                      </div>
                      <div>
                          {props.isErrorForm && <div className={s.formSummaryError}>{props.errorMessage}</div>}
                      </div>
                      <div className={s.button}>
                          <Button type="submit"
                                  disabled={props.loggingInProgress}
                                  onClick={handleSubmit}
                                  variant="contained"
                                  color="primary">LOGIN</Button>
                      </div>
                  </form>
              )}/>
    )
}

const Login = (props) => {

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={s.loginBlock}>
            <h1>Login</h1>
            <LoginForm authLogin={props.authLogin} captchaUrl={props.captchaUrl} isErrorForm={props.isErrorForm}
                       errorMessage={props.errorMessage} loggingInProgress={props.loggingInProgress}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl,
        isErrorForm: state.auth.isErrorForm,
        errorMessage: state.auth.errorMessage,
        loggingInProgress: state.auth.loggingInProgress
    }
}

export default connect(mapStateToProps, {authLogin})(Login)