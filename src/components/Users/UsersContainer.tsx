import React from "react";
import { connect } from "react-redux";
import {FilterType, getUsersThunkCreator } from "../../reducers/usersReducer.ts";
import Users from "./Users.tsx";
import withAuthRedirect from "../../HOC/withAuthRedirect.jsx";
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress, getUsersFilter } from '../../reducers/usersSelectors.ts'
import { userType } from "../../types/types";
import { AppStateType } from "../../reducers/reduxStore.ts";
import { compose } from "redux";
import { actions } from "../../reducers/usersReducer.ts";


//это просто данные
type MapStateToPropsType = {
    users: Array<userType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    pageTitle: string
    filter: FilterType
}
//это колбеки
type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (pageNumber: number) => void
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => void
    getUsers: (pageNumber: number, pageSize: number, filter: FilterType) => void
}
//через атрибуты передаются
type OwnPropsType = {
    pageTitle: string
}

//это 3в1
// type PropsType = {
//     users: Array<userType>
//     pageSize: number
//     totalUsersCount: number
//     currentPage: number
//     follow: (userId: number) => void
//     unfollow: (userId: number) => void
//     setCurrentPage: (pageNumber: number) => void
//     toggleFollowingInProgress: (isFetching: boolean, userId: number) => void
//     followingInProgress: Array<number>
//     getUsers: (pageNumber: number, pageSize: number) => void
//     isFetching: boolean
//     pageTitle: string
// }

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType


class UserAPIComponent extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize, filter} = this.props
        this.props.getUsers(currentPage, pageSize, filter)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize, filter} = this.props
        this.props.getUsers(pageNumber, pageSize, filter)
    }

    onFilterChanged = (filter: FilterType) => {
        const {pageSize, currentPage} = this.props
        this.props.getUsers(1, pageSize, filter)
    }

    render() {
        return <> 
        <h2>{this.props.pageTitle}</h2>
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
            onFilterChanged={this.onFilterChanged}
        />
        </>
    }

}


const mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state),
        
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


//нужно доделать диспатчПропсов
export default compose(
    //<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState>
//@ts-ignore
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        follow: actions.followAC,
        unfollow: actions.unfollowAC,
        setCurrentPage: actions.setCurrentPageAC,
        toggleFollowingInProgress:  actions.toggleFollowingInProgress,
        getUsers: getUsersThunkCreator
    })
)(UserAPIComponent)


// export default withAuthRedirect(connect(mapStateToProps, {
//         follow: followAC,
//         unfollow: unfollowAC,
//         setCurrentPage: setCurrentPageAC,
//         toggleFollowingInProgress:  toggleFollowingInProgress,
//         getUsers: getUsersThunkCreator
//     }
// )(UserAPIComponent))