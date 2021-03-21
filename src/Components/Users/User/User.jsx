import * as React from "react";
import s from '../Users.module.css'
import userPhoto from '../../../assets/images/userPhoto.png'
import {NavLink} from "react-router-dom";

const User = (props) => {

    return <div>
        <span>
            <div className={s.usersItem}>
                <NavLink to={`/profile/${props.user.id}`}>
                    <img src={props.user.photos.small != null ? props.user.photos.small : userPhoto}/>
                </NavLink>
            </div>
            <div>
                {props.user.followed
                    ? <button disabled={props.followingProgress.some(id => id === props.user.id)}
                              onClick={() => {
                                  props.unfollow(props.user.id)
                              }}>Unfollow</button>
                    : <button disabled={props.followingProgress.some(id => id === props.user.id)}
                              onClick={() => {
                                  props.follow(props.user.id)
                              }}>Follow</button>}
            </div>
        </span>
        <span>
            <span>
                <div>
                    {props.user.name}
                </div>
                <div>
                    {props.user.status}
                </div>
            </span>
            <span>
                <div>
                    {'u.location.country'}
                </div>
                <div>
                    {'u.location.city'}
                </div>
            </span>
        </span>
    </div>
}

export default User