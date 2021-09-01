import s from './Dialogs.module.css'
import DialogItem from "./Dialogitem/Dialogitem";
import Message from "./Message/Message";

const Dialogs = (props) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messagesEl = state.messages.map(m => <Message message={m.message} key={m.id}/>)
    let newMessageBody = state.newMessageBody
    
    let onSendMessageClick = () => {
        props.sendMessage()
    }
    
    let onNewMessageChange = (e) => {
        let body = e.target.value
        props.updateNewMessageBody(body)
    }

    return (
      <div className={s.dialogs}>
          <div className={s.dialogItems}>
              {dialogsElements}
          </div>
          <div className={s.messages}>
              <div>{messagesEl}</div>
              <div>
                  <div>
                      <textarea value={newMessageBody} onChange={onNewMessageChange}
                                 placeholder='Enter your message'/>
                  </div>
                  <div>
                      <button onClick={onSendMessageClick}>Send</button>
                  </div>
              </div>
          </div>
      </div>
    )
}

export default Dialogs