// @ts-ignore
import s from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import ProfileHooks from './ProfileHooks'
// @ts-ignore
import userPhoto from '../../../assets/images/user.png'
import React, {ChangeEvent, FC, useState} from 'react'
import ProfileDataForm from './ProfileDataForm'
import {ProfileType} from '../../../API/api'
import {BackTop, Button} from 'antd'

export interface PropsType {
  profile: ProfileType
  status: string
  updateStatus: any
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => void
}

const ProfileInfo:FC<PropsType> = (props) => {
  const [editMode,setEditMode] = useState(false)

  if(!props.profile){return <Preloader/>}

  const MainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData: ProfileType) => {
    props.saveProfile(formData)
    setEditMode(false)
  }

    return (
    <div>
      <div className={s.proImg}>
      </div>
      <div className={s.desBloc}>
          <img src={props.profile.photos.large || userPhoto } className={s.mainPhoto} alt="profile"/>
        { props.isOwner && <input type={"file"} onChange={MainPhotoSelected} className={s.Ph} />}
        <ProfileHooks status={props.status} updateStatus={props.updateStatus}/>
        {/*@ts-ignore*/}
        {editMode ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
                  : <ProfileData goEditMode={() => {setEditMode(true)}}
                       profile={props.profile}
                       isOwner={props.isOwner}
          />}
      </div>
    </div>
  )
}

interface ProfileData {
  profile: ProfileType
  isOwner: boolean
  goEditMode: () => void
}

const style: any = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
}

const ProfileData:FC<ProfileData> = (props) => {
  return <div>
    {props.isOwner && <div className={s.btn}><Button onClick={props.goEditMode}>Edit</Button></div>}
    <div>
      <b>Полное имя</b> : {props.profile.fullName}
    </div>
    <div>
      <b>Ищу работу</b> : {props.profile.lookingForAJob ? 'yes' : 'no'}
    </div>
    { props.profile.lookingForAJob &&
      <div>
        <b>Мои профессиональные навыки :</b> {props.profile.lookingForAJobDescription}
      </div>
    }
    <div>
      <b>Обо мне</b> : {props.profile.AboutMe}
    </div>
    <div>
      <b>Контакты</b> : {Object.keys(props.profile.contacts).map(key => {
      return  <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
    })}
    </div>

  <BackTop>
    <div style={style}>UP</div>
  </BackTop>
</div>
}

interface ContactType {
  contactTitle: string
  contactValue: string
}

const Contact:FC<ContactType> = ({contactTitle,contactValue}) => {
return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}
          
export default ProfileInfo
