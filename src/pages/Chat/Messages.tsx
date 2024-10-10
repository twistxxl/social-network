import React, { useEffect } from "react";
import Message from "./Message.tsx";
//@ts-ignore
import style from "./ChatStyle.module.css";
import { ChatMessageType } from "./ChatPage.tsx";



const ContentStyles = {
    height: '500px',
    overflow: 'auto',
    padding: '10px',
}

export type WebSocketType = {
    ws: WebSocket | null
}


const Messages: React.FC<WebSocketType> = ({ws}) => {

const [messages, setMessages] = React.useState<ChatMessageType[]>([])

useEffect(() => {
    let messageHandler = (e: MessageEvent) => {
        let newMessages = JSON.parse(e.data)
        setMessages((prevMessages) => [...prevMessages, ...newMessages])
        
    }
    ws?.addEventListener('message', messageHandler)
    //не забывать по cleanUp фу-ию!!!
    return () => {
        ws?.removeEventListener('message', messageHandler)
    }
}, [ws])

    return (
        <div className={style.content} style={ContentStyles} >
            {messages.map((m, index) => <Message key={messages[index].userId} messages={m} />)}
        </div>
    )
}

export default Messages