import { applyMiddleware, combineReducers, createStore, compose, Action } from "redux";
import profileReducer from "./profileReducer.ts";
import dialogsReducer from "./dialogsReducer.ts";
import sidebarReducer from "./sidebarReducer.ts";
import usersReducer from "./usersReducer.ts";
import authReducer from "./authReducer.ts";
import {thunk as thunkMiddleware} from "redux-thunk"
import {reducer as formReducer} from 'redux-form'
import appReducer from "./appReducer.ts";
import { ThunkAction } from "redux-thunk"
import chatReducer from "./chat-reducer.ts";



let rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer
})


//AppStateType доступ к глоабльному state

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

type PropirtiesTypes<T> = T extends {[ket: string]: infer U} ? U : never

// export type inferActionsTypes<T extends {[key: string]: (...arg: any[])=> any}> = ReturnType<PropirtiesTypes<T>>
export type inferActionsTypes<T> = T extends {[key: string]: (...arg: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//redux dev tools 
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

// let store = createStore(reducers, applyMiddleware(thunkMiddleware))


export default store