import React from 'react';
import s from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";

let User = (props) => {
    return (
            <div>
                  <span>
                      <div>
                          <NavLink to={'/profile/' + props.user.id}>
                          <img src={props.user.photos.small != null ? props.user.photos.small : userPhoto} className={s.userPhoto} alt={userPhoto}/>
                          </NavLink>
                      </div>
                      <div className={s.btn}>
                          {props.user.followed
                            ? <button  disabled={props.following.some(id=>id===props.user.id)} onClick={() => {
                              props.unfollow(props.user.id)

                            }}>Unfollow</button>

                            : <button disabled={props.following.some(id=>id===props.user.id)} onClick={() => {
                              props.follow(props.user.id)

                            }}>Follow</button>}
                      </div>
                  </span>
                <div className={s.nameSt}>{props.user.name}<br />{props.user.status}</div>
                <div className={s.loc}>{'u.location.country'} <br/> {'u.location.city'}</div>
            </div>
)
}

export default User
