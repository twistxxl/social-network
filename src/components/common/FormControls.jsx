import React from "react"
import s from './FormControls.module.css'


export const Textarea = ({ input, meta, ...props }) => {

    const hasError = meta.touched && meta.error

    return (
        <>
            <div className={s.formControl + ' ' + (hasError ? s.error : "")}>
                <textarea {...props} {...input} />
            </div>
            <div className={s.formControl + ' ' + s.error}>
                {hasError ? <span>{meta.error}</span> : "   "}
            </div>
        </>
    )
}
export const Input = ({ input, meta, ...props }) => {

    const hasError = meta.touched && meta.error

    return (
        <>
            <div className={s.formControl + ' ' + (hasError ? s.error : "")}>
                <input {...props} {...input} />
            </div>
            <div className={s.formControl + ' ' + s.error}>
                {hasError ? <span>{meta.error}</span> : "   "}
            </div>
        </>
    )
}

