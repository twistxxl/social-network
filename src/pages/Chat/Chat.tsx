import React, { useEffect } from "react";
import Messages from "./Messages.tsx";
import AddMessageForm from "./AddMessagesForm.tsx";

const Chat = () => {
    const [ws, setWs] = React.useState<WebSocket | null>(null)

    

    useEffect(() => {
        let ws: WebSocket | null = null
        const closeHandler = () => {
            setTimeout(() => createChannel(), 3000)
        }
        const createChannel = () => {
            if(ws !== null) {
                ws.removeEventListener('close', closeHandler)
                ws.close()
            }
            let wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            wsChannel?.addEventListener('close', closeHandler)
            setWs(wsChannel)
        }
        createChannel()

        //зачситка при выходе -> componentDidUnmount
        return () => {  
            if (ws) { 
                ws.removeEventListener('close', closeHandler);  
                ws.close();  
            }  
        }; 
    }, [])
    


    return (
        <div>
            <Messages ws={ws}/>
            <AddMessageForm ws={ws} />
        </div>
    )
}

export default Chat