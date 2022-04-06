// @ts-ignore
import s from './Dialogs.module.css'
import DialogItem from './Dialogitem/Dialogitem'
import Message from './Message/Message'
import {Field, reduxForm} from 'redux-form'
import React, {FC} from 'react'
import {maxCreatorLength, required} from '../../utils/validators'
import {Element} from '../common/FormsControls/FormControls'
import {InitialStateType} from '../../redux/dialogs-reducer'
import {Button} from 'antd'


const Textarea = Element("textarea");
const maxLength50 = maxCreatorLength(50)

type OwnPropsType = {
   dialogsPage: InitialStateType
   sendMessage: (messageText: string) => void

}

const Dialogs: FC<OwnPropsType> = (props) => {
    let state = props.dialogsPage
    // @ts-ignore
    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messagesEl = state.messages.map(m => <Message message={m.message} key={m.id}/>)

    let addNewMessage = (values: {newMessageBody: string | any}) => {
        props.sendMessage(values.newMessageBody)
    }

    return (
      <div className={s.dialogs}>
          <div className={s.dialogItems}>
              {dialogsElements}
          </div>
        <div className={s.messages}>
              {messagesEl}
        </div>
        <AddMessageReduxForm onSubmit={addNewMessage}/>
      </div>
    )
}

function AddMessage(props:any) {
    return (
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field placeholder={"Enter your message"} name={'newMessageBody'} component={Textarea}
                 validate={[required, maxLength50]}/>
          <div className={s.btn}><Button
          > Отправить </Button>
          </div>
        </div>
      </form>
    )
}

const AddMessageReduxForm: any = reduxForm ({form: 'dialogs'})(AddMessage)

export default Dialogs