import * as React from "react";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User/User";
import Preloader from "../Common/Preloader/Preloader";
import {usersType} from "../../Types/types";
import {FC} from "react";

type PropsType = {
    isFetching: boolean
    totalCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<usersType>
    followingProgress: Array<number>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}

const Users: FC<PropsType> = (props) => {
    return <>
        <div>
            {props.isFetching ? <Preloader/> : null}
        </div>
        <Paginator totalCount={props.totalCount} pageSize={props.pageSize}
                   currentPage={props.currentPage} onPageChanged={props.onPageChanged}/>
        {props.users.map(u => <User user={u} key={u.id} followingProgress={props.followingProgress}
                              unfollow={props.unfollow} follow={props.follow}/>
        )}
    </>
}

export default Users