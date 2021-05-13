import {authAPI, profileAPI, securityAPI} from "../Components/api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_USER_PHOTO = 'auth/SET_USER_PHOTO'
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL'
const SET_ERROR_FORM = 'auth/SET_ERROR_FORM'
const TOGGLE_IS_LOGGING_PROGRESS = 'auth/TOGGLE_IS_FOLLOWING_PROGRESS'

let initiationState = {
    userID: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    userPhoto: null as string | null,
    isUserPhoto: false,
    captchaUrl: '' as string | null,
    isErrorForm: false,
    errorMessage: '' as string,
    loggingInProgress: false,
}

export type initiationStateType = typeof initiationState

const authReducer = (state = initiationState, action: any): initiationStateType => {

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
        case TOGGLE_IS_LOGGING_PROGRESS:
            return {
                ...state,
                loggingInProgress: action.isFetching,
            }
        default:
            return state
    }
}

export default authReducer

export type setUserDataActionDataType = {
    userID: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}

export type setUserDataActionType = {
    type: typeof SET_USER_DATA
    data: setUserDataActionDataType
}

export const setUserData = (userID: number | null, email: string | null, login: string | null, isAuth: boolean): setUserDataActionType => ({
    type: SET_USER_DATA,
    data: {userID, login, email, isAuth}
})

export type setUserPhotoActionType = {
    type: typeof SET_USER_PHOTO
    userPhoto: string
}

export const setUserPhoto = (userPhoto: string): setUserPhotoActionType => ({type: SET_USER_PHOTO, userPhoto})

export type setCaptchaActionType = {
    type: typeof SET_CAPTCHA_URL
    captchaUrl: string
}

export const setCaptcha = (captchaUrl: string): setCaptchaActionType => ({type: SET_CAPTCHA_URL, captchaUrl})

export type setErrorFormActionType = {
    type: typeof SET_ERROR_FORM
    errorMessage: string
    isErrorForm: boolean
}

export const setErrorForm = (isErrorForm: boolean, errorMessage: string): setErrorFormActionType => ({
    type: SET_ERROR_FORM,
    isErrorForm,
    errorMessage
})

export type toggleIsLoggingProgressActionType = {
    type: typeof TOGGLE_IS_LOGGING_PROGRESS
    isFetching: boolean
}

export const toggleIsLoggingProgress = (isFetching: boolean): toggleIsLoggingProgressActionType => ({
    type: TOGGLE_IS_LOGGING_PROGRESS,
    isFetching
})

export const authMe = () => async (dispatch: any) => {
    let response = await authAPI.authMe()
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data
        dispatch(setUserData(id, email, login, true))
        let data = await profileAPI.getProfile(id)
        dispatch(setUserPhoto(data.photos.small))
    }
}

export const authLogin = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    return async (dispatch: any) => {
        dispatch(toggleIsLoggingProgress(true))
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
        dispatch(toggleIsLoggingProgress(false))
    }
}

export const authLogout = () => async (dispatch: any) => {
    let response = await authAPI.authLogout()
    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
    }
}

export const getCaptcha = () => async (dispatch: any) => {
    let response = await securityAPI.getCaptcha()
    dispatch(setCaptcha(response.data.url))
}