import s from './Header.module.css'
import fb from "../../assets/images/fb.jpg"
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
      <header className={s.header}>
        <img src={fb} alt='fb' />
          <div className={s.loginBlock}>
              {props.isAuth ? props.login
              : <NavLink to={'/Login'}>Login</NavLink>}
          </div>
      </header>
    );
}

export default Header