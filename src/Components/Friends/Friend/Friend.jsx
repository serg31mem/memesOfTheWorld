import s from './../Friends.module.css'
import {NavLink} from "react-router-dom";

const Friend = (props) => {
    return (
        <div className={s.friends}>
            <div>
                <NavLink to={props.homeLink}>{props.avatar}</NavLink>
            </div>
            <div className={s.friendsName}>
                <NavLink to={props.homeLink}>{props.name}</NavLink>
            </div>
        </div>
    )
}

export default Friend