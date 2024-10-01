import React, { useEffect, useState } from "react";
import style from "./ProfileInfo.module.css";


//не стал типизировать, 11 урок (1:52:00) он типизурет этот файл
const ProfileStatusWithHooks = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect (() => {
        setStatus(props.status)
    }, [props.status])

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }
    


        return (
            <div>
                {!editMode &&
                    <div>
                        <span onDoubleClick={() => { setEditMode(true) }}>{status || "----"}</span>
                    </div>
                }

                {editMode &&
                    <div>
                        <input onChange={onStatusChange} autoFocus onBlur={deactivateEditMode} value={status} />
                    </div>
                }
            </div>
        );
    };


export default ProfileStatusWithHooks