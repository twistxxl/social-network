import React from "react";
import { useSelector } from "react-redux"
import Users from "./Users.tsx";
import { getIsFetching } from "../../reducers/usersSelectors.ts"



//это просто данные
// type MapStateToPropsType = {
//     users: Array<userType>
//     pageSize: number
//     totalUsersCount: number
//     currentPage: number
//     isFetching: boolean
//     followingInProgress: Array<number>
//     pageTitle: string
//     filter: FilterType
// }
// //это колбеки
// type MapDispatchToPropsType = {
//     follow: (userId: number) => void
//     unfollow: (userId: number) => void
//     setCurrentPage: (pageNumber: number) => void
//     toggleFollowingInProgress: (isFetching: boolean, userId: number) => void
//     getUsers: (pageNumber: number, pageSize: number, filter: FilterType) => void
// }
// //через атрибуты передаются
// type OwnPropsType = {
//     pageTitle: string
// }


// type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

type UserPageType = {
    pageTitle: string
}


const UserPage: React.FC<UserPageType> = (props) => {

    const isFetching = useSelector(getIsFetching)


    return (
        <>
         <h2>{props.pageTitle}</h2>
        {isFetching ? <div>Идет загрузка...</div> : null}
        <Users
            // setCurrentPage={props.setCurrentPage}
            // toggleFollowingInProgress={props.toggleFollowingInProgress}
        /> 
        </>
    )
}

export default UserPage



// const mapStateToProps = (state: AppStateType) => {
//     return {
//         users: getUsers(state),
//         pageSize: getPageSize(state),
//         totalUsersCount: getTotalUsersCount(state),
//         currentPage: getCurrentPage(state),
//         isFetching: getIsFetching(state),
//         followingInProgress: getFollowingInProgress(state),
//         filter: getUsersFilter(state),
        
//     }
// }


//нужно доделать диспатчПропсов
// export default compose(
//     //<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState>
// //@ts-ignore
//     connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
//         follow: actions.followAC,
//         unfollow: actions.unfollowAC,
//         setCurrentPage: actions.setCurrentPageAC,
//         toggleFollowingInProgress:  actions.toggleFollowingInProgress,
//         getUsers: getUsersThunkCreator
//     })
// )(UserAPIComponent)


// export default withAuthRedirect(connect(mapStateToProps, {
//         follow: followAC,
//         unfollow: unfollowAC,
//         setCurrentPage: setCurrentPageAC,
//         toggleFollowingInProgress:  toggleFollowingInProgress,
//         getUsers: getUsersThunkCreator
//     }
// )(UserAPIComponent))