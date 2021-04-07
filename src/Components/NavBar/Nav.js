import s from './Nav.module.css'
import {NavLink} from "react-router-dom";
import BlockFriends from "./BlockFriends/BlockFriends";

const linkCreator = (to, linkName) => {
    return (
        <div className={s.item}>
            <NavLink to={`/${to}`} activeClassName={s.activeLink}>{linkName}</NavLink>
        </div>
    )
}

const Nav = (props) => {
    return (
        <nav className={s.nav}>
            {linkCreator('profile', 'Profile')}

            {linkCreator('friends', 'Friends')}

            {linkCreator('dialogs', 'Messages')}

            {linkCreator('news', 'News')}

            {linkCreator('users', 'Users')}

            {linkCreator('music', 'Music')}

            {linkCreator('settings', 'Settings')}

            <div>
                <div className={s.itemFriends}>
                    Friends
                </div>
                <div>
                    <BlockFriends profileData={props.profileData}/>
                </div>
            </div>
        </nav>
    )
}

export default Nav