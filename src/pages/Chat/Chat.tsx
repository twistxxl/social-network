import React, { useEffect } from "react";
import Messages from "./Messages.tsx";
import AddMessageForm from "./AddMessagesForm.tsx";
import { useDispatch, useSelector } from "react-redux";
import { startMessagesListening, stopMessagesListening } from "../../reducers/chat-reducer.ts";

const Chat = () => {
    const dispatch = useDispatch()

    

    useEffect(() => {
        //@ts-ignore
        dispatch(startMessagesListening())
        //cleanUp func
        return () => {
            //@ts-ignore
            dispatch(stopMessagesListening())
        }
    }, [])
    const status = useSelector((state: any) => state.chat.status)


    return (
        <div>
            {status === 'error' ? (<div>Some error occured. Please refresh the page</div>
            ):(
            <>
                <Messages />
                <AddMessageForm />
            </>
            )}
        </div>
    )
}

export default Chat