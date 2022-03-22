const SEND_MESSAGE = 'SEND-MESSAGE'

type dialogType = {
    id: number,
    name: string
}

type messagesType = {
    id: number,
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Sveta'},
        {id: 3, name: 'Sasha'},
        {id: 4, name: 'Andrey'},
        {id: 5, name: 'Victor'},
        {id: 6, name: 'Valery'}
    ] as Array<dialogType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Hi'},
        {id: 5, message: 'Bye'},
    ] as Array<messagesType>,
}

export type initialStateType = typeof initialState

const dialogsReducer = (state = initialState, action:any): initialStateType => {

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

type sendMessageCreatorType = {
    type: typeof SEND_MESSAGE,
    newMessageBody:string
}

export const sendMessageCreator = (newMessageBody:string): sendMessageCreatorType => ({type: SEND_MESSAGE,newMessageBody})

export default dialogsReducer