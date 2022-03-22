import React from 'react';
import {useDispatch} from "react-redux";
import {actionFriends} from "../../redux/friends-reducer"
import s from './../Dialogs/Dialogs.module.css'
import {NavLink} from "react-router-dom"

function Friends(props) {
  const dispatch = useDispatch()
  let path = '/friend/'
  let state = props.friendsR
  let friend = state.friends.map(el => {
   return <div className={s.dialogs + ' ' + s.active} key={el.id}>
     <NavLink to={path}>{el.name}</NavLink>Online</div>
  })

  const toFriend = () => {
    dispatch(actionFriends())
  }

  return (
    <>
      <div className={s.dialogs + ' ' + s.active}>
        <NavLink to={path}>{props.name}</NavLink>
      </div>
    <div>{friend}</div>
  <button onClick={toFriend}>ADD</button>
   </>
  )
}

export default Friends;