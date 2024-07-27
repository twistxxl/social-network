import React from "react";


const Contact = ({ contactTitle, contactValue }) => {

    return <div><b>{contactTitle}</b>: {contactValue}</div>
}


const ProfileDescription = ({  goToEditMode, isOwner, ...props }) => {
    return (
        <>
        {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
            <div>
                {props.profile.fullName}
            </div>
            <div>
                Ищу работу: {props.profile.lookingForAJob ? "да" : "нет"}
            </div>
            <div>
                О себе: {props.profile.aboutMe}
            </div>
            <div>
                Мои навыки: {props.profile.lookingForAJobDescription}
            </div>
            <div>
                Мои контакты: {Object.keys(props.profile.contacts).map(key => { return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]} /> })}

            </div>
        </>
    )
}

export default ProfileDescription