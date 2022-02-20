import React, {useEffect, useState} from "react";
import s from './ProfileInfo.module.css'

const ProfileHooks = (props) => {
  const [editMode,setEditMode] = useState(false)
  const [status,setStatus] = useState(props.status)

  useEffect(() => {
    setStatus(props.status)
  },[props.status])

  let onStatusChange = (e) => {
    if (e.target.value.length <= 300)
      setStatus(e.target.value)
  }

   const deactivateMode = () => {
    setEditMode( false)
    props.updateStatus(status)
  }

  return (
    <div className={s.status}>
      {!editMode &&
        <div>
         <b>Статус :</b> <span onClick={()=> setEditMode(true)}>{props.status || 'Нет статуса'}</span>
        </div>
      }
      {editMode &&
        <div>
          <input autoFocus={true} onBlur={deactivateMode} onChange={onStatusChange} value={status} />
          <div style={{color: 'white'}}>{props.status.length}/300</div>
        </div>
      }
    </div>
  )
}

export default ProfileHooks