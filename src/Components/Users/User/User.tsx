import * as React from "react";
import s from '../Users.module.css'
import userPhoto from '../../../assets/images/userPhoto.png'
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {usersType} from "../../../Types/types";
import {FC} from "react";

type PropsType = {
    user: usersType
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    followingProgress: Array<number>
}

const User: FC<PropsType> = (props) => {

    return <div className={s.usersWrapper}>
        <div>
            <div className={s.usersAvatar}>
                <NavLink to={`/profile/${props.user.id}`}>
                    <img src={props.user.photos.small != null ? props.user.photos.small : userPhoto}/>
                </NavLink>
            </div>
            <div>
                {props.user.followed
                    ? <Button type="submit"
                              onClick={() => {
                                  props.unfollow(props.user.id)
                              }}
                              disabled={props.followingProgress.some(id => id === props.user.id)}
                              variant="contained"
                              color="primary">Unfollow</Button>
                    : <Button type="submit"
                              onClick={() => {
                                  props.follow(props.user.id)
                              }}
                              disabled={props.followingProgress.some(id => id === props.user.id)}
                              variant="contained"
                              color="primary">Follow</Button>}
            </div>
            <div className={s.userInfoBlock}>
                <div>
                    <b>Login: </b>{props.user.name}
                </div>
                <div>
                    {props.user.status && <div><b>Status: </b>{props.user.status}</div>}
                </div>
            </div>


        </div>
    </div>
}

export default User