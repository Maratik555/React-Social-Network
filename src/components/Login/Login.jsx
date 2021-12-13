import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Element} from '../common/FormsControl/FormControls'
import {maxCreatorLength, required} from "../../utils/validators/validators";

const Input = Element("input");
const maxLength8 =  maxCreatorLength(8)
const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder={"Login"} name={'Login'} component={Input} validate={[required,maxLength8]}/>
      </div>
      <div>
        <Field placeholder={"password"} name={'password'} component={Input} validate={[required,maxLength8]} />
      </div>
      <div>
        <Field type={"checkbox"} name={'rememberMe'} component={Input}/> remember me
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm ({form: 'Login'})(LoginForm)


const Login = (props) => {
  const onSubmit = (formData) => {}
  return <div>
    <h1>LOGIN</h1>
    <LoginReduxForm onSubmit={onSubmit} />
  </div>
}

export default Login;