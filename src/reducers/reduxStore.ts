import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import profileReducer from "./profileReducer.ts";
import dialogsReducer from "./dialogsReducer.ts";
import sidebarReducer from "./sidebarReducer.ts";
import usersReducer from "./usersReducer.ts";
import authReducer from "./authReducer.ts";
import {thunk as thunkMiddleware} from "redux-thunk"
import {reducer as formReducer} from 'redux-form'
import appReducer from "./appReducer.ts";



let rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})


//AppStateType доступ к глоабльному state

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

type PropirtiesTypes<T> = T extends {[ket: string]: infer U} ? U : never

export type inferActionsTypes<T extends {[ket: string]: (...arg: any[])=> any}> = ReturnType<PropirtiesTypes<T>>

//redux dev tools 
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

// let store = createStore(reducers, applyMiddleware(thunkMiddleware))


export default store