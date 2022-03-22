import './App.css'
import React, {Component, Suspense} from 'react'
import Navbar from './components/Navbar/Navbar'
import {Route, withRouter} from "react-router-dom"
import UsersContainer from "./components/Users/UsersContainer"
import HeaderContainer from "./components/Header/HeaderContainer"
import Login from "./components/Login/Login"
import {connect} from "react-redux"
import {compose} from "redux"
import {initializeApp} from "./redux/app-reducer"
import Preloader from "./components/common/Preloader/Preloader"
import FrContainer from "./components/Friends/FrContainer"

const DialogsContainer = React.lazy(() => import ("./components/Dialogs/Message/DialogsContainer"))
const ProfileContainer = React.lazy(() => import ("./components/Profile/ProfileContainer"))

class App extends Component {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialize) {
      return <Preloader/>
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer/>
        <Navbar/>
        <div className="app-wrapper-content">
          <Suspense fallback={<Preloader/>}>
          <Route path="/friends"
                   render={() => <FrContainer/>}/>

          <Route path="/dialogs"
                 render={() => <DialogsContainer/>}/>

          <Route path="/profile/:userId?"
                 render={() => <ProfileContainer/>}/>

          <Route path="/users"
                 render={() => <UsersContainer pageTitle={'Samurai'}/>}/>

          <Route exact path="/login"
                 render={() => <Login/>}/>
          </Suspense>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialize: state.app.initialize
})

export default compose(withRouter,connect(mapStateToProps,{initializeApp}))(App)
