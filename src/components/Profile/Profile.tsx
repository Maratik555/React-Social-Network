import ProfileInfo, {PropsType} from './ProfileInfo/ProfileInfo'
import {FC} from 'react'
import MyPosts from './My posts/MyPosts'

const Profile: FC<PropsType> = (props) => {

    return (
    <div>
        <ProfileInfo savePhoto={props.savePhoto}
                     isOwner={props.isOwner}
                     profile={props.profile}
                     status={props.status}
                     updateStatus={props.updateStatus}
                     saveProfile={props.saveProfile}
        />
        {/*@ts-ignore*/}
        <MyPosts handleSubmit={undefined} />
    </div>
  )
}
          
export default Profile
