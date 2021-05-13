const SEND_MESSAGE = 'dialogs/SEND-MESSAGE';

export type messageDataType = {
    id: number
    textMessage: string
}

let initiationState = {
    messageData: [
        {id: 1, textMessage: 'Hi'},
        {id: 2, textMessage: 'KEK'},
        {id: 3, textMessage: 'LOL'},
    ] as Array<messageDataType>,
}

export type initiationStateType = typeof initiationState

const dialogsReducer = (state = initiationState, action: any) => {
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

export type sendMessageActionType = {
    type: typeof SEND_MESSAGE
    messageBody: string
}

export const sendMessage = (messageBody: string): sendMessageActionType => ({type: SEND_MESSAGE, messageBody})

export default dialogsReducer