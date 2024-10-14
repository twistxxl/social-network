import React, { useEffect } from "react";
import { WebSocketType } from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../reducers/chat-reducer.ts";


const AddMessagesForm: React.FC = () => {

    const [message, setMessage] = React.useState('')
    const dispatch = useDispatch()

    const status = useSelector((state: any) => state.chat.status)

    const onMessageSend = () => {
        if(!message) return
        //@ts-ignore
        dispatch(sendMessage(message))
        setMessage('')
    }


    return (
        <>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value) } value={message}></textarea>
        </div>
        <div>
            <button disabled={false} onClick={onMessageSend}>send</button>
        </div>
        </>
    )
}

export default AddMessagesForm