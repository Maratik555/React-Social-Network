import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileHooks from "./ProfileHooks";

const ProfileInfo = (props) => {
  if(!props.profile){return <Preloader/>}

    return (
    <div>
      <div className={s.proImg}>
        {/*<img src={idPhoto} alt='auto' />*/}
      </div>
      <div className={s.desBloc}>
          <img src={props.profile.photos.large} alt="profile"/>
      <ProfileHooks status={props.status} updateStatus={props.updateStatus}/>
      </div>
    </div>
  );
};
          
export default ProfileInfo;
