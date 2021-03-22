import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {authLogin} from "../../Redux/auth-reducer";
import {element} from "../Common/Form control/FormControl";
import {required} from "../../utils/validators";
import {Redirect} from "react-router-dom";
import s from '../Common/Form control/FormControl.module.css'

const Input = element('input')

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={'Email'} name={'email'} component={Input}
                   validate={[required]}/>
        </div>
        <div>
            <Field placeholder={'Password'} name={'password'} component={Input} type={'password'}
                   validate={[required]}/>
        </div>
        <div>
            <Field type={'checkbox'} name={'rememberMe'} component={Input}/> remember me
        </div>
        <div className={s.captcha}>
            {props.captchaUrl && <img src={props.captchaUrl}/>}
        </div>
        <div>
            {props.captchaUrl && <Field placeholder={'Enter captcha'} name={'captcha'} component={Input}
                                        validate={[required]}/>}
        </div>
        <div>
            {props.error && <div className={s.formSummaryError}>{props.error}</div>}
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>

}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.authLogin(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, {authLogin})(Login)