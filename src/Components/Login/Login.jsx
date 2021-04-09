import {Form, Field} from 'react-final-form'
import {connect} from "react-redux";
import {authLogin} from "../../Redux/auth-reducer";
import {element} from "../Common/Form control/FormControl";
import {required} from "../../utils/validators";
import {Redirect} from "react-router-dom";
import s from '../Common/Form control/FormControl.module.css'
import * as React from "react";

const Input = element('input')

const LoginForm = (props) => {

    const onSubmit = (formData) => {
        props.authLogin(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    return (
        <Form onSubmit={onSubmit}
              render={({handleSubmit, form}) => (
                  <form onSubmit={async event => {
                      await handleSubmit(event)
                      // form.resetFieldState('')
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
                      <div>
                          <button>Login</button>
                      </div>
                  </form>
              )}/>
    )
}

const Login = (props) => {

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginForm authLogin={props.authLogin} captchaUrl={props.captchaUrl} isErrorForm={props.isErrorForm}
                   errorMessage={props.errorMessage}/>
    </div>
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl,
        isErrorForm: state.auth.isErrorForm,
        errorMessage: state.auth.errorMessage,
    }
}

export default connect(mapStateToProps, {authLogin})(Login)