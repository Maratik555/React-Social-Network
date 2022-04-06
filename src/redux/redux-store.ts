import {Action, applyMiddleware, combineReducers, compose, createStore} from 'redux'
import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import friendsReducer from './friends-reducer'
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from './app-reducer'
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import chatReducer from './chat-reducer'


let rootReducers = combineReducers({
   profilePage: profileReducer,
   dialogsPage: dialogsReducer,
   friendsR: friendsReducer,
   usersPage: usersReducer,
   auth: authReducer,
   form: formReducer,
   app: appReducer,
   chat: chatReducer
})

export const TypedUseSelector: TypedUseSelectorHook<AppStateType> = useSelector


// type RootReducerType = typeof rootReducers

export type AppStateType = ReturnType<typeof rootReducers>

type PropertyType<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionTypes<T extends{[key:string]: (...args: any[]) => any}> = ReturnType<PropertyType<T>>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R,AppStateType,unknown,A>

 // @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store