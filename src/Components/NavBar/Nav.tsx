import s from './Nav.module.css'
import {NavLink} from "react-router-dom";
import BlockFriends from "./BlockFriends/BlockFriends";
import {profileDataType} from "../../Types/types";
import {FC} from "react";

const linkCreator = (to: string, linkName: string,) => {
    return (
        <div className={s.item}>
            <NavLink to={`/${to}`} activeClassName={s.activeLink}>{linkName}</NavLink>
        </div>
    )
}

type PropsType = {
    profileData: Array<profileDataType>
    isAuth: boolean
}

const Nav: FC<PropsType> = (props) => {
    return (
        <nav className={s.nav}>
            {linkCreator('profile', 'Profile')}

            {linkCreator('friends', 'Friends')}

            {linkCreator('dialogs', 'Messages')}

            {linkCreator('users', 'Users')}

            {props.isAuth &&
            <div>
                <div className={s.itemFriends}>
                    Friends
                </div>
                <div>
                    <BlockFriends profileData={props.profileData}/>
                </div>
            </div>}

        </nav>
    )
}

export default Nav