import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import userPhoto from '../../assets/images/userPhoto.png'

const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={s.loginBlock}>
                <span>
                    {props.isAuth
                        ? <div>{props.login} </div>
                        : <NavLink to='/login'>Login</NavLink>}
                </span>
                <span>
                    {props.isAuth
                        ? <div>
                            <button onClick={props.authLogout}>Log out</button>
                        </div>
                        : null}
                </span>
                <span>
                    {(props.isAuth)
                        ? props.userPhoto !== null ? <div><img src={props.userPhoto}/></div> : <img src={userPhoto}/>
                        : null}
                </span>
            </div>
        </header>
    )
}

export default Header

































