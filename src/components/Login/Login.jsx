import React from "react";
import { Field, reduxForm } from "redux-form";
import { requiredField } from "../../utils/validators/validator";
import { Input } from "../../components/common/FormControls";
import { connect } from "react-redux";
import { login } from "../../reducers/authReducer";
import { Navigate } from "react-router-dom";
import s from '../common/FormControls.module.css'



const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    
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

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)


const Login = (props) => {

    const onSubmit = (formData) => {
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

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login })(Login)