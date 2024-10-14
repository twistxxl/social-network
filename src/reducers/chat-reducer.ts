import { v1 } from "uuid";
import { chatAPI, ChatMessageType, statusType } from "../api/chat-api.ts";

type ChatMessageUUID = ChatMessageType & { id: string }

let initialState = {
    messages: [] as ChatMessageUUID[],
    status: 'pending' as statusType
}

type initialStateType = typeof initialState

const chatReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case 'SN/chat/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
                .filter((message, index, array) => index >= array.length - 100)
            }
        case 'SN/chat/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({ 
        type: 'SN/chat/MESSAGES_RECEIVED', payload: { messages } 
    } as const),
    statusChanged: (status: statusType) => ({ 
        type: 'SN/chat/STATUS_CHANGED', payload: { status } 
    } as const),
}

//thunk'a
let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch) => {
    if(_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageType[]) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}
let _statusChangedHandler: ((status: statusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch) => {
    if(_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}
     
//вынес в отдельную функцию потому что ф-ия должна быть одна(ссылка на ф-ию)
export const startMessagesListening = () => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe( 'MESSAGES_RECEIVED' , newMessageHandlerCreator(dispatch))
    // @ts-ignore
    chatAPI.subscribe( 'STATUS_CHANGED' , statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = () => async (dispatch) => {
    chatAPI.unsubscribe( 'MESSAGES_RECEIVED' ,newMessageHandlerCreator(dispatch))
    // @ts-ignore
    chatAPI.unsubscribe( 'STATUS_CHANGED' ,statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string) => async (dispatch) => {
    chatAPI.sendMessage(message)
}


export default chatReducer