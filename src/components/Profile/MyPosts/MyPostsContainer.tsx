
import { actions } from "../../../reducers/profileReducer.ts";
import MyPosts from "./MyPosts.tsx";
import { connect } from "react-redux";



// const MyPostsContainer = (props) => {



//     let state = props.store.getState()
//     const addPost = () => {
//         props.store.dispatch(addPostActionCreator());
//     }

//     const onChangePost = (text) => {
//         let action = updateNewPostTextActionCreator(text);
//         props.store.dispatch(action);
//     }


//     return (
//         <MyPosts
//             updateNewPostText={onChangePost}
//             addPost={addPost}
//             postsData={state.profilePage.postsData}
//             newPostText={state.profilePage.newPostText}

//         />
//     );
// };


//не стал типизировать, 11 урок (1:43:30) он типизурет этот файл

const mapStateToProps = (state) => {
    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(actions.addPostActionCreator(newPostText))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)


export default MyPostsContainer;