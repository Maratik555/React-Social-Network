import React from 'react';
// import styles from "./users.module.css";
import User from "./User";
import Paginator from "./Paginator";

let Users = ({...props}) => {
    // let pagesCount = Math.ceil(props.totalUsersCount / 700)
    //
    // let pages = []
    // for (let i = 1; i <= pagesCount; i++) pages.push(i)

    return <div>
        <Paginator totalItemCount={props.totalItemCount}  pageSize={props.pageSize}
                   onPageChanged={props.onPageChanged} currentPage={props.currentPage}/>
        <div>
            {/*<div>*/}
            {/*    {pages.map(p =>*/}
            {/*        <span key={p} className={props.currentPage === p && styles.selectedPage}*/}
            {/*              onClick={() => {*/}
            {/*                  props.onPageChanged(p)*/}
            {/*              }}>{p}</span>)}*/}
            {/*</div>*/}
            {props.users.map(u => <User user={u}
              following={props.following}
              follow={props.follow} unfollow={props.unfollow}
               key={u.id}
              />
            )}
            </div>
        </div>
}

export default Users
