import React from "react";
import style from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./Message/MessageItem";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, requiredField } from "../../utils/validators/validator";
import { Textarea } from "../../components/common/FormControls";


const Dialogs = (props) => {
    
    let state = props.messagesPage

    let dialogsElements = state.dialogsData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />);
    let messagesElements = state.messagesData.map(m => <MessageItem message={m.message} />);
    let newMessageBody = state.newMessageBody


    const addNewMessage = (values) => {
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

const addMessageForm = (props) => {
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
                    <button >Send</button>
                </div>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(addMessageForm)

export default Dialogs;