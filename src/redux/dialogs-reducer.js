const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Sveta'},
        {id: 3, name: 'Sasha'},
        {id: 4, name: 'Andrey'},
        {id: 5, name: 'Victor'},
        {id: 6, name: 'Valeria'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Hi'},
        {id: 5, message: 'Bye'},
    
    ],
    
    newMessageBody: ''
}

const dialogsReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-BODY':
            return {
                ...state, newMessageBody : action.body
            }
        
        case 'SEND-MESSAGE':
            let body = state.newMessageBody
            return {
                ...state, newMessageBody: '', messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state
    }
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageBodyCreator = (body) => ({type: UPDATE_NEW_MESSAGE_BODY, body: body})

export default dialogsReducer