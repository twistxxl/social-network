import React from "react";
import { Field, Form, Formik } from "formik"
import { FilterType } from './../../reducers/usersReducer.ts'


const userSearchFormValidate = (values: FilterType) => {
    const errors: any = {};
    if (!values.term) {
        errors.term = "Required";
    }
    return errors;
}

type FormType = {
    term: string
    friend: "true" | "false" | "null"
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
//main func(comp)
const UserSearchForm: React.FC<PropsType> = React.memo((props) => {

    const onSubmit = (values: FormType, { setSubmitting} : {setSubmitting: (isSubmitting: boolean) => void}) => {
            const filter: FilterType = {
                term: values.term,
                friend: values.friend === "null" ? null : values.friend === "true" ? true : false
            }
            props.onFilterChanged(filter)
            setSubmitting(false)
    }

    return (
        <>
            <Formik
                initialValues={{ term: "", friend: "null" }}
                validate={userSearchFormValidate}
                onSubmit={onSubmit}
            >
                {({isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form> 
                )}
            </Formik>
            
        </>
    )
    
})


export default UserSearchForm