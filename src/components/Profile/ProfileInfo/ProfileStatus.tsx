import React, {ChangeEvent, FC, useState} from 'react'

type PropsType = {
    status: string
    updateStatus: (newStatus: string) => void
}

type StateType = {
    editMode: boolean
    status: string
}

const ProfileStatus: FC<PropsType & StateType> = (props) => {
    const [editMode,setEditMode] = useState(false)
    const [status,setStatus] = useState(props.status)

 const actMode = () => {
   setEditMode(true)
 }

 const deactivateMode = () => {
   setEditMode(false)
   props.updateStatus(status)
 }

 const onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
   if(e.target.value.length <= 300)
   setStatus(e.target.value)
 }

  return (
    <div>
        {!editMode &&
        <div>
          <span onClick={actMode}>{props.status || 'Нет статуса'}</span>
        </div>
      }
        {editMode &&
        <div>
          <input onChange={onStatusChange}
                 onBlur={deactivateMode}
                 autoFocus={true} value={status}/>
        <div style={{color: 'white'}}>
            {status.length}/300
        </div>
        </div>
      }
    </div>
  )
}

export default ProfileStatus