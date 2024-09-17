import { inferActionsTypes } from "./reduxStore";

const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';

type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}

let initialState = {
    dialogsData: [
        { id: 1, name: "Dima" },
        { id: 2, name: "Vova" },
        { id: 3, name: "Sasha" },
        { id: 4, name: "Leha" },
        { id: 5, name: "Danila" },
        { id: 6, name: "Vladik" },
    ] as Array<DialogType>,
    messagesData: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How are you?" },
        { id: 3, message: "Yo" },
    ] as Array<MessageType>,
}




const dialogsReducer = (state = initialState, action: ActionType): initialStateType => {

    let stateCopy

    switch (action.type) {
        
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            stateCopy = {
                ...state,
                messagesData: [...state.messagesData, { id: 6, message: body }]
            }
            return stateCopy
        default:
            return state
    }

}


type sendMessageActionCreatorType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const actions = {
    sendMessageActionCreator : (newMessageBody: string) => ({type: SEND_MESSAGE, newMessageBody} as const),


}


export type initialStateType = typeof initialState
export type ActionType = inferActionsTypes<typeof actions>


export default dialogsReducer
