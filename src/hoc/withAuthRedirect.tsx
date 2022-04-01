import React, {ComponentType} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {AppStateType} from '../redux/redux-store'

let mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
})

export function withAuthRedirect(Component:ComponentType) {
  class RedirectComponent extends React.Component{
    render () {
      //@ts-ignore
      if(!this.props.isAuth) return <Redirect to='/login'/>

      return <Component {...this.props}/>
    }
  }

  return connect(mapStateToPropsForRedirect)(RedirectComponent)
}