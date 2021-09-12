import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import { FC } from 'react';

type PropsType = {
    homeLink: string
    avatar: string
    name: string
    id: number
}

const Dialog: FC<PropsType> = (props) => {
    return (
        <div className={s.dialog}>
            <NavLink to={props.homeLink}><img src={props.avatar}/></NavLink>
            <NavLink to={`/dialogs/${props.id}`} activeClassName={s.activeLink}>{props.name}</NavLink>
        </div>

    )
}

export default Dialog