import s from'./ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import idPhoto from "../../../assets/images/1.jpg"

const ProfileInfo = (props) => {
  if(!props.profile){return <Preloader/>}

    return (
    <div>
      <div className={s.proImg}>
        <img src={idPhoto} alt='auto' />
      </div>
      <div className={s.desBloc}>
          <img src={props.profile.photos.large} alt="profile"/>
      ava + description
      </div>
    </div>
  );
};
          
export default ProfileInfo;
