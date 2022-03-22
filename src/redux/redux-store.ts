import {applyMiddleware, combineReducers, compose, createStore} from "redux"
import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import friendsReducer from "./friends-reducer"
import usersReducer from './users-reducer'
import authReducer from "./auth-reducer"
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer"

let rootReducers = combineReducers({
   profilePage: profileReducer,
   dialogsPage: dialogsReducer,
   friendsR: friendsReducer,
   usersPage: usersReducer,
   auth: authReducer,
   form: formReducer,
   app: appReducer
})

type RootReducerType = typeof rootReducers
export type AppStateType = ReturnType<RootReducerType>

type PropertyType<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionTypes<T extends{[key:string]: (...args: any[]) => any}> = ReturnType<PropertyType<T>>

 // @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)))



export default store