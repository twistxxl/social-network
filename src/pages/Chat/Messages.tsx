import React, { useEffect } from "react";
import Message from "./Message.tsx";
//@ts-ignore
import style from "./ChatStyle.module.css";
import { ChatMessageType } from "./ChatPage.tsx";
import { useSelector } from "react-redux";



const ContentStyles = {
    height: '500px',
    overflow: 'auto',
    padding: '10px',
}

export type WebSocketType = {
    ws: WebSocket | null
}


const Messages: React.FC = () => {
    const messages = useSelector((state: any) => state.chat.messages)
    const messagesAnchorRef = React.useRef<HTMLDivElement>(null)
    const [autoScrollIsActive, setAutoScrollIsActive] = React.useState(true)

    useEffect(() => {
        if (autoScrollIsActive) {
            messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let el = e.currentTarget
        if(Math.abs((el.scrollHeight - el.scrollTop) - el.clientHeight) < 300) {
            setAutoScrollIsActive(true)
        } else {
            setAutoScrollIsActive(false)
        }
    }

    return (
        <div className={style.content} style={ContentStyles} onScroll={scrollHandler} >
            {messages.map((m, index) => <Message key={m.id} messages={m} />)}
            <div ref = {messagesAnchorRef} ></div>
        </div>
    )
}

export default Messages