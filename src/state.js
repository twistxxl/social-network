import dialogsReducer from "./reducers/dialogsReducer";
import profileReducer from "./reducers/profileReducer";
import sidebarReducer from "./reducers/sidebarReducer";




let store = {
    _state: {
        profilePage: {
            postsData: [
                { id: "1", message: "Hi", likesCount: "15" },
                { id: "2", message: "How are you", likesCount: "20" },
                { id: "3", message: "Yo", likesCount: "10" },
                { id: "4", message: "Its my first", likesCount: "5" },
                { id: "5", message: "I love sex", likesCount: "666" },
                { id: "6", message: "We love womens", likesCount: "0" },
            ],

            newPostText: "ebal tvoi rot",
        },

        messagesPage: {
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
            newMessageBody: 'sdf',
        },

        sidebar: {},

    },
    _rerenderEntireTree() {
        console.log('state changed');
    },


    getState() {
        return this._state
    },
    subscribe(observer) {
        this._rerenderEntireTree = observer
    },


    addPost() {
        let newPost = {
            id: 5,
            message: this._state.profilePage.newPostText,
            likesCount: 0
        }
        this._state.profilePage.postsData.push(newPost)
        this._state.profilePage.newPostText = ''
        this._rerenderEntireTree(this._state)
    },
    updateNewPostText(newText) {
        this._state.profilePage.newPostText = newText
        this._rerenderEntireTree(this._state)
    },
    dispatch(action) {

       this._state.profilePage = profileReducer(this._state.profilePage, action)
       this._state.messagesPage = dialogsReducer(this._state.messagesPage, action)
       this._state.sidebar = sidebarReducer(this._state.sidebar, action)

       this._rerenderEntireTree(this._state)

    }
}


export default store
