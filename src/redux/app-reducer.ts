import {getAuthUserData} from "./auth-reducer"

const SET_INITIALIZE = 'SET_INITIALIZE'

export type initialStateType = {
    initialize: boolean,
}

const initialState: initialStateType = {
  initialize: false,

}

const appReducer = (state = initialState, action:any): initialStateType => {
  switch (action.type) {
    case SET_INITIALIZE :
      return {
        ...state,
        initialize: true,
      }
      default :
        return state

  }
}

type initializedType = {
    type: typeof SET_INITIALIZE // 'SET_INITIALIZE'
}

export const initialized = (): initializedType => ({type:SET_INITIALIZE})

export const initializeApp = () => (dispatch:any) => {
 const promise = dispatch(getAuthUserData())

  promise.then(() => {
    dispatch(initialized())
  })
}

export default appReducer