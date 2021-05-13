import {authMe} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'

export type initiationStateType = {
    initialized: boolean
}

let initiationState: initiationStateType = {
    initialized: false,
}

const appReducer = (state = initiationState, action: any): initiationStateType => {

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

export type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): initializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

export const initialized = () => async (dispatch: any) => {
    await dispatch(authMe())
    dispatch(initializedSuccess)
}

export default appReducer