import s from './Dialogs.module.css'
import DialogItem from "./Dialogitem/Dialogitem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import React from "react";
import {maxCreatorLength, required} from "../../utils/validators/validators";
import {Element} from '../common/FormsControl/FormControls'

const Dialogs = (props) => {
    let state = props.dialogsPage
    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messagesEl = state.messages.map(m => <Message message={m.message} key={m.id}/>)

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    }

    if(!props.isAuth) return <Redirect to={'/login'}/>

    return (
      <div className={s.dialogs}>
          <div className={s.dialogItems}>
              {dialogsElements}
          </div>
          <div className={s.messages}>
              <div>{messagesEl}</div>
        </div>
        <AddMessageReduxForm onSubmit={addNewMessage} />
          </div>
    )
}
const Textarea = Element("textarea");
const maxLength50 = maxCreatorLength(50)

const AddMessage = (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
          <div>
              <Field placeholder={"Enter your message"} name={'newMessageBody'} component={Textarea}
              validate={[required,maxLength50]}/>
              <div><button>Send</button></div>
          </div>
      </form>
    )
}

const AddMessageReduxForm = reduxForm ({form: 'dialogs'})(AddMessage)

export default Dialogs