import React from 'react'
import {useDispatch} from 'react-redux'
import {actionFriends} from '../../redux/friends-reducer'
// @ts-ignore
import s from './../Dialogs/Dialogs.module.css'
import {NavLink} from 'react-router-dom'
import {Button} from 'antd'
import {TypedUseSelector} from '../../redux/redux-store'


function Friends() {
  const dispatch = useDispatch()
  const {friends} = TypedUseSelector(state => state.friendsR)

  let path = '/friends/'
  let friend = friends.map((el: any) => {
   return <div className={s.dialogs + ' ' + s.active} key={el.id}>
     <NavLink to={path}>{el.name}</NavLink>Online</div>
  })

  const toFriend = () => {
    dispatch(actionFriends())
  }

  return (
    <>
      <div className={s.dialogs + ' ' + s.active}>
        {/*<NavLink to={path}>{props.name}</NavLink>*/}
      </div>
    <div>{friend}</div>
  <Button onClick={toFriend}>ADD</Button>
   </>
  )
}

export default Friends