import * as React from "react";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User/User";
import Preloader from "../Common/Preloader/Preloader";

const Users = (props) => {

    return <>
        <div>
            {props.isFetching ? <Preloader/> : null}
        </div>
        {/*<Pagination count={props.totalCount} color="secondary" />*/}
        <Paginator totalCount={props.totalCount} pageSize={props.pageSize} isFetching={props.isFetching}
                   currentPage={props.currentPage} onPageChanged={props.onPageChanged}/>
        {props.users.map(u => <User user={u} key={u.id} followingProgress={props.followingProgress}
                                    unfollow={props.unfollow} follow={props.follow}/>
        )}
    </>
}

export default Users