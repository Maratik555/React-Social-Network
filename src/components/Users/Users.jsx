import React from 'react';
// import styles from "./users.module.css";
import User from "./User";
import Paginator from "./Paginator";

let Users = ({...props}) => {
    return <div>
        <Paginator totalItemCount={props.totalItemCount}  pageSize={props.pageSize}
                   onPageChanged={props.onPageChanged} currentPage={props.currentPage}/>
        <div>
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
