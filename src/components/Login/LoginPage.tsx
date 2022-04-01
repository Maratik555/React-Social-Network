import React, {FC} from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {Element} from '../common/FormsControls/FormControls'
import {maxCreatorLength, required} from '../../utils/validators/validators'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../redux/auth-reducer'
import {Redirect} from 'react-router-dom'
// @ts-ignore
import s from '../common/FormsControls/FormsControl.module.css'
import {AppStateType} from '../../redux/redux-store'


const Input = Element("input")
const maxLength15 =  maxCreatorLength(15)

interface OwnProps {
    captchaUrl: null | string
}

interface LoginFormValuesType {
    email: string
    password:string
    captcha:string
    rememberMe:boolean
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


export const LoginPage:FC = () => {
   const captchaUrl = useSelector((state : AppStateType) => state.auth.captchaUrl)
   const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
   const dispatch = useDispatch()

    const onSubmit = (formData:LoginFormValuesType) => {
    dispatch(login(formData.email,formData.password,formData.rememberMe,formData.captcha))
  }

  if(isAuth){
    return <Redirect to={'/profile'} />
  }

  return <div>
    <h1>Login</h1>
    <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
  </div>
}
