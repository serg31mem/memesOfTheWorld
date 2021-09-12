import {ResultCodeEnum, usersAPI} from "../Components/api/api";
import {usersType} from "../Types/types";
import {ThunkAction} from "redux-thunk";
import {AppType} from "./store-redux";

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS'

let initiationState = {
    users: [] as Array<usersType>,
    totalCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: true,
    followingProgress: [] as Array<number>,
}

export type initiationStateType = typeof initiationState

const usersReducer = (state = initiationState, action: ActionsTypes) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalCount: action.totalCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingProgress: action.isFetching
                    ? [...state.followingProgress, action.userID]
                    : state.followingProgress.filter(id => id !== action.userID)
            }
        default:
            return state
    }

}

type ActionsTypes = followSuccessActionType | unFollowSuccessActionType | setUsersActionType | setCurrentPageActionType |
    setTotalUsersCountActionType | toggleIsFetchingActionType | toggleIsFollowingProgressActionType

type followSuccessActionType = {
    type: typeof FOLLOW
    userID: number
}
export const followSuccess = (userID: number): followSuccessActionType => ({type: FOLLOW, userID})

type unFollowSuccessActionType = {
    type: typeof UNFOLLOW
    userID: number
}
export const unFollowSuccess = (userID: number): unFollowSuccessActionType => ({type: UNFOLLOW, userID})

type setUsersActionType = {
    type: typeof SET_USERS
    users: Array<usersType>
}
export const setUsers = (users: Array<usersType>): setUsersActionType => ({type: SET_USERS, users})

type setCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})

type setTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalCount: number
}
export const setTotalUsersCount = (totalCount: number): setTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalCount
})

type toggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})

type toggleIsFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userID: number
}
export const toggleIsFollowingProgress = (isFetching: boolean, userID: number): toggleIsFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userID
})

type ThunkType = ThunkAction<Promise<void>, AppType, unknown, ActionsTypes>

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(currentPage))
    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}

export const unfollow = (userID: number): ThunkType => async (dispatch) => {
    dispatch(toggleIsFollowingProgress(true, userID))
    let data = await usersAPI.unfollowUser(userID)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(unFollowSuccess(userID))
    }
    dispatch(toggleIsFollowingProgress(false, userID))
}

export const follow = (userID: number): ThunkType => async (dispatch) => {
    dispatch(toggleIsFollowingProgress(true, userID))
    let data = await usersAPI.followUser(userID)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(followSuccess(userID))
    }
    dispatch(toggleIsFollowingProgress(false, userID))
}

export default usersReducer