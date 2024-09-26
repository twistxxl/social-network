import React from "react";
import Post from "./Post/Post.tsx";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { requiredField, maxLengthCreator } from "../../../utils/validators/validator.ts";
import { Textarea } from "../../common/FormControls.tsx";
import { PostType } from "../../../types/types.ts";

//1:06:00 типизация MyPosts(11 video)
type AddPostsValuesType = {
    newPostText: string
    addPost: (newPostText: string) => void
    }

type PropsType = {
    postsData: Array<PostType>
    addPost: (newPostText: string) => void
    newPostText: string
}

const MyPosts: React.FC<PropsType> = (props) => {
    let postsElements = props.postsData.map(p => <Post message={p.message} likesCount={p.likesCount} />);

    let newPostElement = React.createRef();
    const addPost = (values: AddPostsValuesType) => {
        props.addPost(values.newPostText);
    }


    return (
        <div>
            <div>
                My posts
            </div>
            <ProfileAddNewPostForm onSubmit={addPost} newPostText={props.newPostText} />
            <div>
                {postsElements}
            </div>
        </div>
    );
}

const MyPostsMemo = React.memo(MyPosts)


type PostsAddPropsType = {
    addPost: (newPostText: string) => void
    newPostText: string
}

const AddPostsForm: React.FC<InjectedFormProps<AddPostsValuesType ,PostsAddPropsType> & PostsAddPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Textarea}
                    name={'newPostText'}
                    value={props.newPostText}
                    validate={[requiredField, maxLengthCreator(10)]}
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const ProfileAddNewPostForm = reduxForm< AddPostsValuesType, PostsAddPropsType>({ form: 'ProfileAddNewPostForm' })(AddPostsForm)

export default MyPosts;