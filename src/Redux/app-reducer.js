import {authMe} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'


let initiationState = {
    initialized: false,
}


const appReducer = (state = initiationState, action) => {

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

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

export const initialized = () => async (dispatch) => {
    await dispatch(authMe())
    dispatch(initializedSuccess)
}


export default appReducer