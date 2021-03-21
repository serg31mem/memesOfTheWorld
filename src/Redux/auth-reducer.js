import {authAPI, profileAPI} from "../Components/api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA'
const SET_USER_PHOTO = 'SET_USER_PHOTO'

let initiationState = {
    userID: null,
    login: null,
    email: null,
    isAuth: false,
    userPhoto: null,
    isUserPhoto: false,
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
        default:
            return state
    }

}

export const setUserData = (userID, email, login, isAuth) => ({
    type: SET_USER_DATA,
    data: {userID, login, email, isAuth}
})

export const setUserPhoto = (userPhoto) => ({type: SET_USER_PHOTO, userPhoto})

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


export const authLogin = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.authLogin(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(authMe())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const authLogout = () => async (dispatch) => {
    let response = await authAPI.authLogout()
    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
    }
}