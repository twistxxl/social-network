import React, { useEffect } from "react";
import Chat from "./Chat.tsx";


export type ChatMessageType = {
    message: any
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {

    

    return (
        <>
            <div>ChatPage</div>
            <Chat/>
        </>
    )
}


export default ChatPage