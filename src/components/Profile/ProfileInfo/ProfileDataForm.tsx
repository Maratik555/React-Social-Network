import React, {FC} from 'react'
import {Field, reduxForm} from 'redux-form'
import {Element} from '../../common/FormsControls/FormControls'
// @ts-ignore
import s from './ProfileInfo.module.css'

const Input = Element("input")
const Textarea = Element("textarea")

const ProfileDataForm:FC<any> = (props) => {
  return <form onSubmit={props.handleSubmit}>
    <div><button>Save</button></div>
    <div>
      <b>Полное имя</b> : <Field placeholder={'Полное имя'} name={'fullName'} component={Input} />
    </div>
    <div>
      <b>Ищу работу</b> : <Field placeholder={''} name={'lookingForAJob'} component={Input} type={"checkbox"}/>
    </div>
      <div>
        <b>Мои профессиональные навыки </b> : <Field placeholder={'Мои профессиональные навыки'}
                                                     name={'lookingForAJobDescription'}
                                                     component={Textarea} />
      </div>
    <div>
      <b>Обо мне </b> : <Field placeholder={'Обо мне'} name={'aboutMe'} component={Textarea} />
    </div>
    <div>
      <b>Контакты</b> : {Object.keys(props.profile.contacts).map(key => {
      return <div className={s.contact} key={key}>
        <b>{key} : <Field placeholder={key} name={'contacts.' + key} component={Input} /></b>
      </div>})}
    </div>
  </form>


}

const ProfileDataFormReduxForm = reduxForm({form:'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm