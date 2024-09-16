import React from "react";
import Post from "./Post/Post";
import { reduxForm, Field } from "redux-form";
import { requiredField, maxLengthCreator } from "../../../utils/validators/validator.ts";
import { Textarea } from "../../common/FormControls.tsx";




const MyPosts = React.memo((props) => {
    let postsElements = props.postsData.map(p => <Post message={p.message} likesCount={p.likesCount} />);

    let newPostElement = React.createRef();
    const addPost = (values) => {
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
)


const AddPostsForm = (props) => {
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

const ProfileAddNewPostForm = reduxForm({ form: 'ProfileAddNewPostForm' })(AddPostsForm)

export default MyPosts;