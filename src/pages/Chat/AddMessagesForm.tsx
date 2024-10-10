import React, { useEffect } from "react";
import { WebSocketType } from "./Messages";



const AddMessagesForm: React.FC<WebSocketType> = ({ws}) => {

    const [message, setMessage] = React.useState('')
    const [readyStatus, setReadyStatus] = React.useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        let openHandler =  () => {
            setReadyStatus('ready')
        }
        ws?.addEventListener('open', openHandler)
        //обязательно делать отписку, cleanUp func
        return () => {
            ws?.removeEventListener('open', openHandler)
        }
    }, [])

    const onMessageSend = () => {
        if(!message) return
        ws?.send(message)
        setMessage('')
    }


    return (
        <>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value) } value={message}></textarea>
        </div>
        <div>
            <button disabled={!readyStatus} onClick={onMessageSend}>send</button>
        </div>
        </>
    )
}

export default AddMessagesForm