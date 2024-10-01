
import { AxiosPromise } from 'axios'
import { GetUsersItems, ResponseType, instance } from './api.ts'

export const usersAPI = {
    getUsers(pageNumber = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        return (
            instance.get<GetUsersItems>(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${pageSize}&term=${term}`+ 
            (friend === null ? '' : `&friend=${friend}`)
            )
                .then(res => res.data )
        )
    },
    async follow(userId: number) {
        return instance.post<ResponseType>(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
        .then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`).then(res => res.data) as AxiosPromise<ResponseType>
    },

}