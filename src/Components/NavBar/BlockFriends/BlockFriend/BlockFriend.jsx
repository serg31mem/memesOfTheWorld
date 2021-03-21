import s from './../BlockFriends.module.css'
import {NavLink} from "react-router-dom";

const BlockFriend = (props) => {
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

export default BlockFriend