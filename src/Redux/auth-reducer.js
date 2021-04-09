import {authAPI, profileAPI, securityAPI} from "../Components/api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_USER_PHOTO = 'auth/SET_USER_PHOTO'
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL'
const SET_ERROR_FORM = 'auth/SET_ERROR_FORM'

let initiationState = {
    userID: null,
    login: null,
    email: null,
    isAuth: false,
    userPhoto: null,
    isUserPhoto: false,
    captchaUrl: '',
    isErrorForm: false,
    errorMessage: '',
}

const authReducer = (state = initiationState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        case SET_USER_PHOTO:
            return {
                ...state,
                userPhoto: action.userPhoto,
            }
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.captchaUrl,
            }
        case SET_ERROR_FORM:
            return {
                ...state,
                isErrorForm: action.isErrorForm,
                errorMessage: action.errorMessage,
            }
        default:
            return state
    }

}

export const setUserData = (userID, email, login, isAuth) => ({
    type: SET_USER_DATA,
    data: {userID, login, email, isAuth}
})

export const setUserPhoto = (userPhoto) => ({type: SET_USER_PHOTO, userPhoto})

export const setCaptcha = (captchaUrl) => ({type: SET_CAPTCHA_URL, captchaUrl})

export const setErrorForm = (isErrorForm, errorMessage) => ({type: SET_ERROR_FORM, isErrorForm, errorMessage})

export default authReducer

export const authMe = () => async (dispatch) => {
    let response = await authAPI.authMe()
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data
        dispatch(setUserData(id, email, login, true))
        let data = await profileAPI.getProfile(id)
        dispatch(setUserPhoto(data.photos.small))
    }
}

export const authLogin = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.authLogin(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(authMe())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptcha())
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
            dispatch(setErrorForm(true, message))
        }
    }
}

export const authLogout = () => async (dispatch) => {
    let response = await authAPI.authLogout()
    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
    }
}

export const getCaptcha = () => async (dispatch) => {
    let response = await securityAPI.getCaptcha()
    dispatch(setCaptcha(response.data.url))
}