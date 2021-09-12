import {profileAPI, ResultCodeEnum} from "../Components/api/api";
import {photoFileType, photosType, postsDataType, profileDataType, userProfileType} from "../Types/types";
import {authMe} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppType} from "./store-redux";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_PROFILE_STATUS = 'profile/SET_PROFILE_STATUS'
const DELETE_POST = 'profile/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'
const SET_ERROR_FORM = 'profile/SET_ERROR_FORM'

let initiationState = {
    profileData: [
        {
            homeLink: 'sergio',
            id: 1,
            name: 'Sergio',
            avatar: 'https://w7.pngwing.com/pngs/332/451/png-transparent-pepe-the-frog-pepe-4chan-television-face-leaf.png',
            status: 'Life coll',
            country: 'Russia',
            city: 'Samara'
        },
        {
            homeLink: 'alex',
            id: 2,
            name: 'Alex',
            avatar: 'https://avatars.yandex.net/get-music-user-playlist/51766/595160370.1000.25677/m1000x1000?1589812186474&webp=false',
            status: '3D coll',
            country: 'Russia',
            city: 'Samara'
        },
        {
            homeLink: 'nasty',
            id: 3,
            name: 'Nasty',
            avatar: 'https://4.bp.blogspot.com/-aau51YHhLqI/UDFgnKjncGI/AAAAAAAAAH8/8WKFByNzopI/s1600/INFINITO+DESPRECIO.png',
            status: 'Psychology coll',
            country: 'Russia',
            city: 'Samara'
        },
        {
            homeLink: 'mike',
            id: 4,
            name: 'Mike',
            avatar: 'https://ezhbaev.ru/faces/img/large/surprised-rage-clean-l.png',
            status: 'Money coll',
            country: 'Russia',
            city: 'Samara'
        },
        {
            homeLink: 'svetachka',
            id: 5,
            name: 'Svetachka',
            avatar: 'https://forum.exbo.ru/assets/files/2019-11-10/1573417254-129155-14d.png',
            status: 'Pussies coll',
            country: 'Russia',
            city: 'Samara'
        },
        {
            homeLink: 'losha',
            id: 6,
            name: 'Losha',
            avatar: 'https://i03.fotocdn.net/s102/9d0b74786a63f5d0/user_l/222810920.jpg',
            status: 'Drugs coll',
            country: 'Russia',
            city: 'Samara'
        },
    ] as Array<profileDataType>,
    postsData: [
        {id: 1, message: 'Привет, классные мемы'},
        {id: 2, message: 'Твои мемы дают силы жить!'}
    ] as Array<postsDataType>,
    userProfile: null as userProfileType | null,
    status: '',
    isErrorForm: false,
    errorMessage: '',
}

export type initiationStateType = typeof initiationState

const profileReducer = (state = initiationState, action: ActionsTypes): initiationStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.postsData[state.postsData.length - 1].id + 1,
                message: action.bodyPost,
                likes: 0,
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost]
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile
            }
        case SET_PROFILE_STATUS:
            return {
                ...state,
                status: action.profileStatus
            }
        case DELETE_POST:
            return {
                ...state,
                postsData: [...state.postsData].filter((p) => p.id !== action.idPost)
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                userProfile: {...state.userProfile, photos: action.photos} as userProfileType
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


type ActionsTypes = addPostActionType | deletePostActionType | setUserProfileActionType | setProfileStatusActionType |
    savePhotoSuccessActionType | setErrorFormActionType

export type addPostActionType = {
    type: typeof ADD_POST
    bodyPost: string
}
export const addPost = (bodyPost: string): addPostActionType => ({type: ADD_POST, bodyPost})

export type deletePostActionType = {
    type: typeof DELETE_POST
    idPost: number
}
export const deletePost = (idPost: number): deletePostActionType => ({type: DELETE_POST, idPost})

export type setUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    userProfile: userProfileType
}
export const setUserProfile = (userProfile: userProfileType): setUserProfileActionType => {
    return {
        type: SET_USER_PROFILE, userProfile
    }
}

export type setProfileStatusActionType = {
    type: typeof SET_PROFILE_STATUS
    profileStatus: string
}
export const setProfileStatus = (profileStatus: string): setProfileStatusActionType => {
    return {
        type: SET_PROFILE_STATUS, profileStatus
    }
}

export type savePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: photosType
}
export const savePhotoSuccess = (photos: photosType): savePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

export type setErrorFormActionType = {
    type: typeof SET_ERROR_FORM
    isErrorForm: boolean
    errorMessage: string
}

export const setErrorForm = (isErrorForm: boolean, errorMessage: string): setErrorFormActionType => ({
    type: SET_ERROR_FORM,
    isErrorForm,
    errorMessage
})

type ThunkType = ThunkAction<Promise<void>, AppType, unknown, ActionsTypes>

export const getProfile = (userId: number | null): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data))
}

export const getProfileStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfileStatus(userId)
    dispatch(setProfileStatus(data))
}

export const updateProfileStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateProfileStatus(status)
    if (data.resultCode === 0) {
        dispatch(setProfileStatus(status))
    }
}

export const savePhoto = (photos: photoFileType): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(photos)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(savePhotoSuccess(data.data.photos))
        dispatch(authMe())
    }
}

export const saveProfile = (profile: userProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userID
    let data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        dispatch(getProfile(userId))
    } else {
        dispatch(setErrorForm(true, data.messages[0]))
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer