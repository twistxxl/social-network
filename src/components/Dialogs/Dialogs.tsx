import React from "react";
//@ts-ignore
import style from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem.jsx";
import MessageItem from "./Message/MessageItem.jsx";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, requiredField } from "../../utils/validators/validator.ts";
import { Textarea } from "../common/FormControls.tsx";
import {initialStateType} from "../../reducers/dialogsReducer.ts"

type PropsType = {
        messagesPage: initialStateType,
        sendMessage: (newMessageBody: string) => void,
}
export type DialogNewMessageFormType = {
    newMessageBody: string
}


const Dialogs: React.FC<PropsType> = (props) => {
    
    let state = props.messagesPage

    let dialogsElements = state.dialogsData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />);
    let messagesElements = state.messagesData.map(m => <MessageItem message={m.message} />);
    


    const addNewMessage = (values: DialogNewMessageFormType) => {
        props.sendMessage(values.newMessageBody)
    }

    
   

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux  onSubmit={addNewMessage}/>
            </div>
        </div>

    );
};

type LoginFormValuesTypeKeys = Extract<keyof DialogNewMessageFormType, string>
type FormPropsType = {

}

const addMessageForm: React.FC<InjectedFormProps<DialogNewMessageFormType, FormPropsType> & FormPropsType> = (props) => {


    let maxLength50 = maxLengthCreator(50)
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field
                        component={Textarea}
                        validate={[requiredField, maxLength50]}
                        name={'newMessageBody'}
                        placeholder="Enter your message"
                    >
                    </Field>
                </div>
                <div>
                    <button>Send</button>
                </div>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<DialogNewMessageFormType>({ form: 'dialogAddMessageForm' })(addMessageForm)

export default Dialogs;