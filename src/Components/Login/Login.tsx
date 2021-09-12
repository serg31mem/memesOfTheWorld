import {Form, Field} from 'react-final-form'
import {connect} from "react-redux";
import {authLogin} from "../../Redux/auth-reducer";
import {element} from "../Common/Form control/FormControl";
import {required} from "../../utils/validators";
import {Redirect} from "react-router-dom";
import s from './Login.module.css'
import * as React from "react";
import Button from "@material-ui/core/Button";
import {AppType} from "../../Redux/store-redux";
import {FC} from "react";

const Input = element('input')

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormPropsType = mapStateToPropsType & mapDispatchToPropsType
const LoginForm: FC<LoginFormPropsType> = (props) => {
    const onSubmit = (formData: FormDataType) => {
        props.authLogin(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    return (
        <Form onSubmit={onSubmit}
              render={({handleSubmit}) => (
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
                          {props.captchaUrl && <img src={props.captchaUrl} alt=' '/>}
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

type LoginPropsType = mapStateToPropsType & mapDispatchToPropsType
const Login: FC<LoginPropsType> = (props) => {
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

type mapStateToPropsType = {
    isAuth?: boolean
    captchaUrl: string | null
    isErrorForm: boolean
    errorMessage: string
    loggingInProgress: boolean
}
type mapDispatchToPropsType = {
    authLogin: (email: string, password: string, rememberMe: boolean, captcha: string) => Promise<void>
}
const mapStateToProps = (state: AppType): mapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl,
        isErrorForm: state.auth.isErrorForm,
        errorMessage: state.auth.errorMessage,
        loggingInProgress: state.auth.loggingInProgress
    }
}

export default connect(mapStateToProps, {authLogin})(Login)