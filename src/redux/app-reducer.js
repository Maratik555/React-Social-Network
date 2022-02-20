import {getAuthUserData} from "./auth-reducer";

const SET_INITIALIZE = 'SET_INITIALIZE'

let initialState = {
  initialize: false,

}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZE :
      return {
        ...state,
        initialize: true
      }
      default :
        return state

  }
}

export const initialized = () => ({type:SET_INITIALIZE})

export const initializeApp = () => (dispatch) => {
 const promise = dispatch(getAuthUserData())

  promise.then(() => {
    dispatch(initialized())
  })
}

export default appReducer