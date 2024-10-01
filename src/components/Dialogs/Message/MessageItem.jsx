import React from "react";
import style from "./../Dialogs.module.css";



//не стал типизировать, 11 урок (2:06:00) он типизурет этот файл

const MessageItem = (props) => {
    return (
        <div className={style.message}>
            {props.message}
        </div>
    );
};


export default MessageItem;