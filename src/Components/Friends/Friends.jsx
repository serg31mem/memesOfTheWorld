import s from './Friends.module.css'
import Friend from './Friend/Friend'

const Friends = (props) => {
    let friendsElement = props.profileData
        .map(friend => <Friend avatar={friend.avatar} name={friend.name} homeLink={friend.homeLink} key={friend.id}/>)

    return (
        <div className={s.friends}>
            <div className={s.friendsItem}>
                {friendsElement}
            </div>
        </div>
    )
}

export default Friends