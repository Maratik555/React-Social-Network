import {BaseThunkType, InferActionTypes} from './redux-store'
import {ChatType} from '../utils/ChatPage'
import {chatAPI} from '../API/chat-api'
import {Dispatch} from 'redux'
import {v1} from 'uuid'


let initialState = {
    messages: [] as ChatType[]

}

export type InitialStateType = typeof initialState

const chatReducer = (state = initialState, action: ActionTypes):InitialStateType => {
    switch (action.type) {
        case 'MESSAGE':
            return {
                ...state,
            messages: [...state.messages, ...action.payload.map(m => ({...m, id: v1()}))]
                .filter((m,i,arr) => i >= arr.length - 100)
       }
        default: return state
    }
}

type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>

export const actions = {
    messagesReceived: (messages: ChatType[]) => ({
        type: 'MESSAGE', payload: messages}  as const)
}

let _messageHandler: ((messages: ChatType[]) => void) | null = null

const messageCreator = (dispatch: Dispatch) => {
    if (_messageHandler === null) {
        _messageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _messageHandler
}

export const startMessages = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(messageCreator(dispatch))
}

export const stopMessages = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(messageCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (messages: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(messages)
}


export default chatReducer