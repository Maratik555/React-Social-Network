import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Element} from '../common/FormsControl/FormControls'
import {maxCreatorLength, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import s from "./../common/FormsControl/FormsControl.module.css"


const Input = Element("input");
const maxLength8 =  maxCreatorLength(15)
const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder={"Email"} name={'email'} component={Input} validate={[required,maxLength8]}/>
      </div>
      <div>
        <Field placeholder={"password"} name={'password'} type={'password'} component={Input} validate={[required,maxLength8]} />
      </div>
      <div>
        <Field type={"checkbox"} name={'rememberMe'} component={Input}/> remember me
      </div>
      { props.error && <div className={s.formError}>
        {props.error}
      </div> }
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm ({form: 'login'})(LoginForm)


const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email,formData.password,formData.rememberMe)
  }

  if(props.isAuth){
    return <Redirect to={'/profile'} />
  }

  return <div>
    <h1>Login</h1>
    <LoginReduxForm onSubmit={onSubmit} />
  </div>
}

const mapStateToProps = (state) => ({
  isAuth:state.auth.isAuth
})

export default connect(mapStateToProps,{login}) (Login)