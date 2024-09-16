import React from "react"
import { Input, Textarea } from "../../common/FormControls.tsx"
import { Field, reduxForm } from "redux-form"



const ProfileDescriptionForm = ({ handleSubmit, ...props }) => {

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <b>Full name</b>: <Field type="text" placeholder="full name" component={Input} validate={[]} name={'fullName'} />
                </div>
                <div>
                    <b>Looking for a job</b>: <Field type="checkbox" component={Input} name={'lookingForAJob'} />
                </div>
                <div>
                    <b>My professional skills</b>: <Field type="text" placeholder="skills" component={Textarea} validate={[]} name={'lookingForAJobDescription'} />
                </div>
                <div>
                    <b>About me</b>: <Field type="text" placeholder="about me" component={Textarea} validate={[]} name={'aboutMe'} />
                </div>
                <div>
                    <button>Save</button>
                </div>
            </form>
        </div>
    )
}

const ProfileDescriptionReduxForm = reduxForm({
    form: 'editProfile'
})(ProfileDescriptionForm)

export default ProfileDescriptionReduxForm