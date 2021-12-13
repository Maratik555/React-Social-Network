const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
    dialogs: [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Sveta'},
        {id: 3, name: 'Sasha'},
        {id: 4, name: 'Andrey'},
        {id: 5, name: 'Victor'},
        {id: 6, name: 'Valery'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Hi'},
        {id: 5, message: 'Bye'},
    ],
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SEND-MESSAGE':
            let body = action.newMessageBody
            return {
                ...state, messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state
    }
}

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE,newMessageBody})
export default dialogsReducer