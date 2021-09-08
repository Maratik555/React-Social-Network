import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";

const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / 1000);
    let pages = []
    for (let i = 1; i <= pagesCount; i++) pages.push(i)

    return (
        <div>
            <div>
                {pages.map(p =>
                    <span key={p} className={props.currentPage === p && styles.selectedPage}
                          onClick={() => {
                              props.onPageChanged(p)
                          }}>{p}</span>)}
            </div>
            {props.users.map(u => <div key={u.id}>
                  <span>
                      <div>
                          <NavLink to={'/profile/' + u.id}>
                          <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto} alt={userPhoto}/>
                          </NavLink>
                      </div>
                      <div>
                          {u.followed
                            ? <button disabled={props.following.some(id=>id===u.id)} onClick={() => {
                              props.unfollow(u.id)

                            }}>Unfollow</button>
                            : <button disabled={props.following.some(id=>id===u.id)} onClick={() => {
                              props.follow(u.id)
                            }}>Follow</button>}

                      </div>
                  </span>
                <div className={styles.nameSt}>{u.name}<br />{u.status}</div>
                <div className={styles.loc}>{'u.location.country'} <br/> {'u.location.city'}</div>
            </div>)}
        </div>
    );
};

export default Users;
