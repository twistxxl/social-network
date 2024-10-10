import { Avatar } from "antd";
import React, { useEffect } from "react";
//@ts-ignore
import style from "./ChatStyle.module.css"
import { ChatMessageType } from "./ChatPage.tsx";



const Message: React.FC<{messages: ChatMessageType}> = ({messages}) => {
    //@ts-ignore
    const avatarStyle = {
        width: '45px',
        height: '45px',
        objectFit: 'cover',
        borderRadius: '50%',
        cursor: 'pointer',
        border: '3px solid pink',

    }


    return (
        <div>
            {/*@ts-ignore*/} 
            <img src={messages?.photo} alt="avatar" style={avatarStyle} />
            <b>{messages?.userName}</b><br />
            <p>{messages?.message}</p>
            <span>{messages?.userId}</span>
            <hr/> 
        </div>
    );
};  

export default Message