import React from "react";
import { connect } from "react-redux";
import { followAC, unfollowAC, setCurrentPageAC, toggleFollowingInProgress } from "../../reducers/usersReducer";
import Users from "./Users";
import {getUsersThunkCreator} from "../../reducers/usersReducer";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../reducers/usersSelectors'


class UserAPIComponent extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <> 
        {this.props.isFetching ? <div>Идет загрузка...</div> : null}
        <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            setCurrentPage={this.props.setCurrentPage}
            toggleFollowingInProgress={this.props.toggleFollowingInProgress}
            followingInProgress={this.props.followingInProgress}

        />
        </>
    }

}


const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         toggleIsFetchingAC: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         },
        
//     }
// }    




export default withAuthRedirect(connect(mapStateToProps, {
        follow: followAC,
        unfollow: unfollowAC,
        setCurrentPage: setCurrentPageAC,
        toggleFollowingInProgress:  toggleFollowingInProgress,
        getUsers: getUsersThunkCreator
    }
)(UserAPIComponent))