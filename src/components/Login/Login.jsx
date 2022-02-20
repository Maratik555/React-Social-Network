import React from 'react'
import {Field, reduxForm} from "redux-form"
import {Element} from '../common/FormsControls/FormControls'
import {maxCreatorLength, required} from "../../utils/validators/validators"
import {connect} from "react-redux"
import {login} from "../../redux/auth-reducer"
import {Redirect} from "react-router-dom"
import s from "../common/FormsControls/FormsControl.module.css"


const Input = Element("input")
const maxLength15 =  maxCreatorLength(15)

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder={"Email"} name={'email'} component={Input} validate={[required,maxLength15]}/>
      </div>
      <div>
        <Field placeholder={"Password"} name={'password'} type={'password'}
               component={Input} validate={[required,maxLength15]} />
      </div>
      <div>
        <Field type={"checkbox"} name={'rememberMe'} component={Input}/> remember me
      </div>
      { props.captchaUrl &&  <img src={props.captchaUrl} alt='captcha'/>}
      { props.captchaUrl &&  <Field placeholder={"Captcha"} name={'captcha'}
                                    component={Input} validate={[required]} />}

      { props.error && <div className={s.formError}>{props.error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm ({form:'login'})(LoginForm)


const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email,formData.password,formData.rememberMe,formData.captcha)
  }

  if(props.isAuth){
    return <Redirect to={'/profile'} />
  }

  return <div>
    <h1>Login</h1>
    <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
  </div>
}

const mapStateToProps = (state) => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth:state.auth.isAuth
})

export default connect(mapStateToProps,{login}) (Login)