import React, {FC} from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {Element} from '../common/FormsControls/FormControls'
import {maxCreatorLength, required} from "../../utils/validators/validators"
import {connect} from "react-redux"
import {login} from "../../redux/auth-reducer"
import {Redirect} from "react-router-dom"
// @ts-ignore
import s from "../common/FormsControls/FormsControl.module.css"
import {AppStateType} from "../../redux/redux-store"


const Input = Element("input")
const maxLength15 =  maxCreatorLength(15)

interface OwnProps {
    captchaUrl: null | string
}

const LoginForm:FC<InjectedFormProps<LoginFormValuesType, OwnProps> & OwnProps> = (props) => {
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

const LoginReduxForm = reduxForm<LoginFormValuesType,OwnProps> ({form:'login'})(LoginForm)

interface MapStateTypeProps {
    captchaUrl: string | null
    isAuth: boolean
}

interface MapDispatchProps {
    login: (email:string,password:string,rememberMe:boolean,captcha:any) => void
}

interface LoginFormValuesType {
    email: string
    password:string
    captcha:string
    rememberMe:boolean
}


const Login:FC<MapStateTypeProps & MapDispatchProps> = (props) => {
  const onSubmit = (formData:LoginFormValuesType) => {
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

const mapStateToProps = (state:AppStateType):MapStateTypeProps => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth:state.auth.isAuth
})

export default connect(mapStateToProps,{login})(Login)