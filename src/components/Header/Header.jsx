import s from './Header.module.css'
import logo from "../../assets/images/logo.png"
import {NavLink} from "react-router-dom"

const Header = (props) => {
    return (
      <header className={s.header}>
        <img src={logo} alt='fb' />
        <h1><b>REACT NETWORK</b></h1>
          <div className={s.loginBlock}>
              {props.isAuth
                ? <div>{props.login} <button style={{width:'50%'}}
                                             onClick={props.logout}>Logout</button></div>
                : <NavLink style={{marginRight:20,backgroundColor:"secondary"}} to={'/Login'}>Login</NavLink>}
          </div>
      </header>
    )
}

export default Header