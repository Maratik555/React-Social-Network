import s from './Header.module.css'
import fb from "../../assets/images/fb.jpg"
const Header = () => {
    return (
      <header className={s.header}>
        <img src={fb} alt='fb' />
      </header>
    );
}

export default Header