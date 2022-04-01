import {getAuthUserData} from './auth-reducer'

// const SET_INITIALIZE = 'SET_INITIALIZE'

const initialState = {
  initialize: false
}

export type initialStateType = typeof initialState

const appReducer = (state = initialState, action:any): initialStateType => {
  switch (action.type) {
    case 'SET_INITIALIZE' :
      return {
        ...state,
        initialize: true,
      }
      default :
        return state

  }
}

type initializedType = {
    type: 'SET_INITIALIZE'
}

export const initialized = (): initializedType => ({type:'SET_INITIALIZE'} as const)

export const initializeApp = () => (dispatch:any) => {
 dispatch(getAuthUserData()).then(() => dispatch(initialized()))
}

export default appReducer