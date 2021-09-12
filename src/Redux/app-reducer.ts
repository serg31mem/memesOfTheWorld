import {authMe} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppType} from "./store-redux";

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'

export type initiationStateType = {
    initialized: boolean
}

let initiationState: initiationStateType = {
    initialized: false,
}

const appReducer = (state = initiationState, action: ActionsTypes): initiationStateType => {

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

type ActionsTypes = initializedSuccessActionType

export type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): initializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

type ThunkType = ThunkAction<Promise<void>, AppType, unknown, ActionsTypes>

export const initialized = (): ThunkType => async (dispatch) => {
    await dispatch(authMe())
    dispatch(initializedSuccess)
}

export default appReducer