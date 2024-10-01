import React from "react";
//@ts-ignore
import style from "./Post.module.css";  

type PropsType = {message: string, likesCount: number}


const Post: React.FC<PropsType> = (props) => {
    return (
        <div>
           <div className={style.item}>
                <img src="https://sun6-20.userapi.com/s/v1/if1/IFjPpkEm081-xeNkBHWhVs9HnmtmBLxh0yB3MpmvuhroVCBPJ5w8aaMXKi7-ooVywyjoIuCE.jpg?size=900x900&quality=96&crop=0,0,900,900&ava=1" alt=""/>
           </div>
           <div>
            {props.message}
           </div>
           <div>
           like:  {props.likesCount}
           </div>
        </div>
    );
};

export default Post;