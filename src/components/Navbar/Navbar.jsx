import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";


const Navbar = () => {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to='/Profile' activeClassName={s.active}>Profile</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/Friends'>Friends</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/Dialogs' activeClassName={s.active}>Messages</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/Users' activeClassName={s.active}>Users</NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <NavLink to='/News'>News</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/Music'>Music</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/Settings'>Settings</NavLink>
      </div>


    </nav>
  );
};

export default Navbar;
