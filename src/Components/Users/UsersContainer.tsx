import {connect} from "react-redux";
import * as React from "react";
import {follow, requestUsers, unfollow} from "../../Redux/Users-reducer";
import Users from "./Users";
import {currentPage, followingProgress, getUsers, isFetching, pageSize, totalCount} from "../../Redux/users-selectors";
import {usersType} from "../../Types/types";
import {AppType} from "../../Redux/store-redux";

type mapStateToPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalCount: number
    users: Array<usersType>
    followingProgress: Array<number>
}
type mapDispatchToPropsType = {
    requestUsers: (currentPage: number, pageSize: number) => void
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}
type OwnPropsType = {
    title?: string
}
type PropsType = mapStateToPropsType & mapDispatchToPropsType & OwnPropsType


class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <Users onPageChanged={this.onPageChanged}
                      totalCount={this.props.totalCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      users={this.props.users}
                      isFetching={this.props.isFetching}
                      followingProgress={this.props.followingProgress}
                      unfollow={this.props.unfollow}
                      follow={this.props.follow}
        />;
    }
}

let mapStateToProps = (state: AppType): mapStateToPropsType => {
    return {
        users: getUsers(state),
        totalCount: totalCount(state),
        pageSize: pageSize(state),
        currentPage: currentPage(state),
        isFetching: isFetching(state),
        followingProgress: followingProgress(state)
    }
}

export default connect<mapStateToPropsType, mapDispatchToPropsType, OwnPropsType, AppType>(mapStateToProps,
    {
        unfollow, requestUsers,
        follow
    })(UsersContainer)

