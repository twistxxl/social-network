import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { requiredField } from "../../utils/validators/validator.ts";
import { Input } from "../common/FormControls.tsx";
import { connect } from "react-redux";
import { login } from "../../reducers/authReducer.ts";
import { Navigate } from "react-router-dom";
//@ts-ignore
import s from '../common/FormControls.module.css'





type LoginForOwnProps = {
    captchaUrl: string | null
}


const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginForOwnProps> & LoginForOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <Field type="text" placeholder="email" component={Input} validate={[requiredField]} name={'email'} />
                </div>
                <div>
                    <Field type="password" placeholder="password" component={Input} validate={[requiredField]} name={'password'} />
                </div>
                <div>
                    <Field type="checkbox" component={Input} name={'rememberMe'} /> remember me
                </div>

                {captchaUrl && <div>
                    <img src={captchaUrl} />
                    <div>
                        <Field type="text" placeholder="Символы с картинки" component={Input} validate={[requiredField]} name={'captcha'} />
                    </div>
                </div>}
                    { error && <div className={s.formSummaryError}>
                        {error}
                    </div>}
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>

        </div>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginForOwnProps >({
    form: 'login'
})(LoginForm)


type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}


const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Navigate to={'/profile'} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login })(Login)