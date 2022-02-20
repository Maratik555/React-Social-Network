import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader"
import ProfileHooks from "./ProfileHooks"
import userPhoto from "../../../assets/images/user.png"
import React, {useState} from "react";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {
  const [editMode,setEditMode] = useState(false)

  if(!props.profile){return <Preloader/>}

  const MainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
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
        {editMode ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
                  : <ProfileData goEditMode={() => {setEditMode(true)}}
                       profile={props.profile}
                       isOwner={props.isOwner}
          />}
      </div>
    </div>
  )
}


const ProfileData = (props) => {
  return <div>
    {props.isOwner && <div className={s.btn}><button onClick={props.goEditMode}>Edit</button></div>}
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
  </div>
}


const Contact = ({contactTitle,contactValue}) => {
return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}
          
export default ProfileInfo
