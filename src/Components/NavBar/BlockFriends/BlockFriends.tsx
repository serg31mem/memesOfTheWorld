import s from './BlockFriends.module.css'
import BlockFriend from "./BlockFriend/BlockFriend";
import {profileDataType} from "../../../Types/types";
import { FC } from 'react';

type PropsType = {
    profileData: Array<profileDataType>
}

const BlockFriends: FC<PropsType> = (props) => {
    let friendsElement = props.profileData
        .map(friend => <BlockFriend avatar={friend.avatar} name={friend.name} homeLink={friend.homeLink}
                                    key={friend.id}/>)

    return (
        <div className={s.friends}>
            <div className={s.friendsItem}>
                {friendsElement}
            </div>
        </div>
    )
}

export default BlockFriends