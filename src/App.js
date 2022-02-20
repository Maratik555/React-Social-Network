import './App.css'
import Navbar from './components/Navbar/Navbar'
import {Route, withRouter} from "react-router-dom"
import DialogsContainer from "./components/Dialogs/Message/DialogsContainer"
import UsersContainer from "./components/Users/UsersContainer"
import ProfileContainer from "./components/Profile/ProfileContainer"
import HeaderContainer from "./components/Header/HeaderContainer"
import Login from "./components/Login/Login"
import {Component, Suspense} from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {initializeApp} from "./redux/app-reducer"
import Preloader from "./components/common/Preloader/Preloader"
import FrContainer from "./components/Friends/FrContainer"


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
                 render={() => <UsersContainer/>}/>

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

export default compose(
  withRouter,
  connect(mapStateToProps,{initializeApp}))(App)
