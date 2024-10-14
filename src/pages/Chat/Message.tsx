import { Avatar } from "antd";
import React, { useEffect } from "react";
//@ts-ignore
import style from "./ChatStyle.module.css"
import { ChatMessageType } from "./ChatPage.tsx";

type MessagePropsType = {
    messages: ChatMessageType
}

const Message: React.FC<MessagePropsType> = React.memo(({messages}) => {
    //@ts-ignore
    const avatarStyle = {
        width: '45px',
        height: '45px',
        objectFit: 'cover',
        borderRadius: '50%',
        cursor: 'pointer',
        border: '3px solid pink',

    }

console.log('renders');
    return (
        <div>
            <img src={messages?.photo} alt="avatar" style={avatarStyle} />
            <b>{messages?.userName}</b><br />
            <p>{messages?.message}</p>
            <span>{messages?.userId}</span>
            <hr/> 
        </div>
    );
})

export default Message