import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";

let User = (props) => {
    return (
            <div>
                  <span>
                      <div>
                          <NavLink to={'/profile/' + props.user.id}>
                          <img src={props.user.photos.small != null ? props.user.photos.small : userPhoto} className={styles.userPhoto} alt={userPhoto}/>
                          </NavLink>
                      </div>
                      <div>
                          {props.user.followed
                            ? <button disabled={props.following.some(id=>id===props.user.id)} onClick={() => {
                              props.unfollow(props.user.id)

                            }}>Unfollow</button>

                            : <button disabled={props.following.some(id=>id===props.user.id)} onClick={() => {
                              props.follow(props.user.id)

                            }}>Follow</button>}
                      </div>
                  </span>
                <div className={styles.nameSt}>{props.user.name}<br />{props.user.status}</div>
                <div className={styles.loc}>{'u.location.country'} <br/> {'u.location.city'}</div>
            </div>
)
}

export default User
