import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import userPhoto from '../../assets/images/userPhoto.png'
import Button from "@material-ui/core/Button";
import * as React from "react";
import {FC} from "react";

type PropsType = {
    isAuth: boolean
    login: string | null
    userPhoto: string | null
    authLogout: () => void
}

const Header: FC<PropsType> = (props) => {
    return (
        <header className={s.header}>
            <div className={s.loginBlock}>
                <span>
                    {props.isAuth
                        ? <div className={s.existingUsername}>{props.login}</div>
                        : <NavLink to='/login'>Login</NavLink>}
                </span>
                <span>
                    {(props.isAuth)
                        ? props.userPhoto !== null ? <div><img src={props.userPhoto}/></div> : <img src={userPhoto}/>
                        : null}
                </span>
                <span>
                    {props.isAuth
                        ? <div>
                            <Button type="submit"
                                    onClick={props.authLogout}
                                    variant="contained"
                                    color="primary">Logout</Button>
                        </div>
                        : null}
                </span>
            </div>
        </header>
    )
}

export default Header

































