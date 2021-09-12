import s from './../Friends.module.css'
import {NavLink} from "react-router-dom";
import { FC } from 'react';

type PropsType = {
    homeLink: string
    avatar: string
    name: string
}

const Friend: FC<PropsType> = (props) => {
    return (
        <div className={s.friends}>
            <div>
                <NavLink to={props.homeLink}><img src={props.avatar}/></NavLink>
            </div>
            <div className={s.friendsName}>
                <NavLink to={props.homeLink}>{props.name}</NavLink>
            </div>
        </div>
    )
}

export default Friend