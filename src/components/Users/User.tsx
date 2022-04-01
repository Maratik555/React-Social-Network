import React, {FC} from 'react'
// @ts-ignore
import s from './users.module.css'
// @ts-ignore
import userPhoto from '../../assets/images/user.png'
import {NavLink} from 'react-router-dom'
import {UsersTypes} from '../../API/api'
import {BackTop, Button} from 'antd'

type PropsType = {
    user: UsersTypes
    following: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
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

let User: FC<PropsType> = (props) => {

    return <div>
                  <span>
                    <div className={s.nameSt}>{props.user.name}<br/>{props.user.status}</div>
                      <div>
                          <NavLink to={'/profile/' + props.user.id}>
                          <img src={props.user.photos.small != null ? props.user.photos.small : userPhoto}
                               className={s.userPhoto} alt={userPhoto}/>
                          </NavLink>
                      </div>
                      <div className={s.btn}>
                          {props.user.followed ?
                            <Button className='secondary' disabled={props.following.some((id: any) => id === props.user.id)} onClick={() => {
                              props.unfollow(props.user.id)

                            }}>Unfollow</Button>

                            : <Button disabled={props.following.some((id: any) => id === props.user.id)} onClick={() => {
                              props.follow(props.user.id)
                            }}>Follow</Button>}
                      </div>
                  </span>


      <BackTop>
          <div style={style}>UP</div>
      </BackTop>

    </div>
}

export default User
