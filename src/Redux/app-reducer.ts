import {authMe} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {ActionsTypes, AppType} from "./store-redux";

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'

export type initiationStateType = {
    initialized: boolean
}

let initiationState: initiationStateType = {
    initialized: false,
}

const appReducer = (state = initiationState, action: ActionsTypes<typeof actions>): initiationStateType => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
}

const actions = {
    initializedSuccess: () => ({type: INITIALIZED_SUCCESS} as const)
}

export const {
    initializedSuccess
} = actions

type ThunkType = ThunkAction<Promise<void>, AppType, unknown, ActionsTypes<typeof actions>>

export const initialized = (): ThunkType => async (dispatch) => {
    await dispatch(authMe())
    dispatch(initializedSuccess)
}

export default appReducer
