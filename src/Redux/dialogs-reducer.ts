import { messageDataType } from "../Types/types";
import {ActionsTypes} from "./store-redux";

const SEND_MESSAGE = 'dialogs/SEND-MESSAGE';

let initiationState = {
    messageData: [
        {id: 1, textMessage: 'Hi'},
        {id: 2, textMessage: 'KEK'},
        {id: 3, textMessage: 'LOL'},
    ] as Array<messageDataType>,
}

export type initiationStateType = typeof initiationState

const dialogsReducer = (state = initiationState, action: ActionsTypes<typeof actions>) => {
    switch (action.type) {
        case SEND_MESSAGE:{
            let newMessage = {
                id: state.messageData[state.messageData.length - 1].id + 1,
                textMessage: action.messageBody
            }
            return  {
                ...state,
                messageData: [...state.messageData, newMessage]
            }
        }
        default:
            return state
    }
}

const actions = {
    sendMessage: (messageBody: string) => ({type: SEND_MESSAGE, messageBody} as const)
}

export const {
    sendMessage
} = actions

export default dialogsReducer
