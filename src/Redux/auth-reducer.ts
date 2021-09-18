import { ThunkAction } from "redux-thunk";
import {authAPI, profileAPI, ResultCodeEnum, securityAPI} from "../Components/api/api";
import {ActionsTypes, AppType } from "./store-redux";

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

const authReducer = (state = initiationState, action: ActionsTypes<typeof actions>): initiationStateType => {

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

const actions = {
    setUserData: (userID: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: SET_USER_DATA,
        data: {userID, login, email, isAuth}
    } as const),
    setUserPhoto: (userPhoto: string | null) => ({type: SET_USER_PHOTO, userPhoto} as const),
    setCaptcha: (captchaUrl: string) => ({type: SET_CAPTCHA_URL, captchaUrl} as const),
    setErrorForm: (isErrorForm: boolean, errorMessage: string) => ({
        type: SET_ERROR_FORM,
        isErrorForm,
        errorMessage
    } as const),
    toggleIsLoggingProgress: (isFetching: boolean) => ({
        type: TOGGLE_IS_LOGGING_PROGRESS,
        isFetching
    } as const),
}

export const {
    toggleIsLoggingProgress,
    setErrorForm,
    setUserData,
    setUserPhoto,
    setCaptcha,
} = actions

type ThunkType = ThunkAction<Promise<void>, AppType, unknown, ActionsTypes<typeof actions>>

export const authMe = (): ThunkType => async (dispatch) => {
    let dataMe = await authAPI.authMe()
    if (dataMe.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = dataMe.data
        dispatch(setUserData(id, email, login, true))
        let data = await profileAPI.getProfile(id)
        dispatch(setUserPhoto(data.photos.small))
    }
}

export const authLogin = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsLoggingProgress(true))
        let data = await authAPI.authLogin(email, password, rememberMe, captcha)
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(authMe())
        } else {
            if (data.resultCode === ResultCodeEnum.Captcha) {
                dispatch(getCaptcha())
            } else {
                let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
                dispatch(setErrorForm(true, message))
            }
        }
        dispatch(toggleIsLoggingProgress(false))
    }
}

export const authLogout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.authLogout()
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(setUserData(null, null, null, false))
    }
}

export const getCaptcha = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptcha()
    dispatch(setCaptcha(data.url))
}
