import {connect} from "react-redux";
import * as React from "react";
import {follow, requestUsers, setCurrentPage, unfollow} from "../../Redux/Users-reducer";
import Users from "./Users";
import {currentPage, followingProgress, getUsers, isFetching, pageSize, totalCount} from "../../Redux/users-selectors";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <Users onPageChanged={this.onPageChanged} totalCount={this.props.totalCount}
                      pageSize={this.props.pageSize} currentPage={this.props.currentPage} users={this.props.users}
                      isFetching={this.props.isFetching}
                      followingProgress={this.props.followingProgress} unfollow={this.props.unfollow}
                      follow={this.props.follow}/>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        totalCount: totalCount(state),
        pageSize: pageSize(state),
        currentPage: currentPage(state),
        isFetching: isFetching(state),
        followingProgress: followingProgress(state)
    }
}

export default connect(mapStateToProps, {
    unfollow, setCurrentPage, requestUsers,
    follow
})(UsersContainer)

