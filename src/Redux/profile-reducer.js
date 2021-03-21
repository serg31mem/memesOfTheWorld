import {profileAPI} from "../Components/api/api";
import {authMe} from "./auth-reducer";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_PROFILE_STATUS = 'SET_PROFILE_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'


let initiationState = {
    profileData: [
        {
            homeLink: 'sergio',
            id: 1,
            name: 'Sergio',
            avatar: <img
                src='https://yt3.ggpht.com/a/AATXAJxetozsFIxpK6XvnUDpCVKIYn7hxLiM2DVFWixqPA=s900-c-k-c0xffffffff-no-rj-mo'/>,
            status: 'Life coll',
            country: 'Russia',
            city: 'Samara'
        },
        {
            homeLink: 'alex',
            id: 2,
            name: 'Alex',
            avatar: <img
                src='https://avatars.yandex.net/get-music-user-playlist/51766/595160370.1000.25677/m1000x1000?1589812186474&webp=false'/>,
            status: '3D coll',
            country: 'Russia',
            city: 'Samara'
        },
        {
            homeLink: 'nasty',
            id: 3,
            name: 'Nasty',
            avatar: <img
                src='https://4.bp.blogspot.com/-aau51YHhLqI/UDFgnKjncGI/AAAAAAAAAH8/8WKFByNzopI/s1600/INFINITO+DESPRECIO.png'/>,
            status: 'Psychology coll',
            country: 'Russia',
            city: 'Samara'
        },
        {
            homeLink: 'mike',
            id: 4,
            name: 'Mike',
            avatar: <img src='https://ezhbaev.ru/faces/img/large/surprised-rage-clean-l.png'/>,
            status: 'Money coll',
            country: 'Russia',
            city: 'Samara'
        },
        {
            homeLink: 'svetachka',
            id: 5,
            name: 'Svetachka',
            avatar: <img src='https://forum.exbo.ru/assets/files/2019-11-10/1573417254-129155-14d.png'/>,
            status: 'Pussies coll',
            country: 'Russia',
            city: 'Samara'
        },
        {
            homeLink: 'losha',
            id: 6,
            name: 'Losha',
            avatar: <img src='https://i03.fotocdn.net/s102/9d0b74786a63f5d0/user_l/222810920.jpg'/>,
            status: 'Drugs coll',
            country: 'Russia',
            city: 'Samara'
        },
    ],
    postsData: [
        {id: 1, message: 'Привет, классные мемы', likes: 3},
        {id: 2, message: 'Твои мемы дают силы жить!', likes: 69}
    ],
    userProfile: null,
    status: '',

}

const profileReducer = (state = initiationState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 10,
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
                userProfile: {...state.userProfile, photos: action.photos}
            }
        default:
            return state
    }
}

export const addPost = (bodyPost) => ({type: ADD_POST, bodyPost})

export const deletePost = (idPost) => ({type: DELETE_POST, idPost})

export const setUserProfile = (userProfile) => ({type: SET_USER_PROFILE, userProfile})

export const setProfileStatus = (profileStatus) => ({type: SET_PROFILE_STATUS, profileStatus})

export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

export default profileReducer

export const getProfile = (userId) => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)

    dispatch(setUserProfile(data))
}

export const getProfileStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfileStatus(userId)

    dispatch(setProfileStatus(response))
}

export const updateProfileStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateProfileStatus(status)

    if (response.data.resultCode === 0) {
        dispatch(setProfileStatus(status))
    }
}

export const savePhoto = (photos) => async (dispatch) => {
    let response = await profileAPI.savePhoto(photos)

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
        dispatch(authMe())
    }
}
