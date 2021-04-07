const SEND_MESSAGE = 'SEND-MESSAGE';

let initiationState = {
    messageData: [
        {id: 1, textMessage: 'Hi'},
        {id: 2, textMessage: 'KEK'},
        {id: 3, textMessage: 'LOL'},
    ],
}

const dilogsReduser = (state = initiationState, action) => {
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

export const sendMessage = (messageBody) => ({type: SEND_MESSAGE, messageBody})

export default dilogsReduser