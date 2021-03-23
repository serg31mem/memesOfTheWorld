import s from './BlockFriends.module.css'
import BlockFriend from "./BlockFriend/BlockFriend";

const BlockFriends = (props) => {
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