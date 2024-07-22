

const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';


let initialState = {
    dialogsData: [
        { id: "1", name: "Dima" },
        { id: "2", name: "Vova" },
        { id: "3", name: "Sasha" },
        { id: "4", name: "Leha" },
        { id: "5", name: "Danila" },
        { id: "6", name: "Vladik" },
    ],
    messagesData: [
        { id: '1', message: "Hi" },
        { id: '2', message: "How are you?" },
        { id: '3', message: "Yo" },
    ],

}


const dialogsReducer = (state = initialState, action) => {

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



export const sendMessageActionCreator = (newMessageBody) => {
    return {
        type: SEND_MESSAGE,
        newMessageBody
    }
}


export default dialogsReducer
