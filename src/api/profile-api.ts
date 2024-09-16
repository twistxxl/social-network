import { photosType, ProfileType } from '../types/types.ts'
import {instance, ResponseType} from './api.ts'

type SavePhotoResponseDataType = {
    photos: photosType
}


export const profileAPI = {
    async getProfile(userId: number) {
        return instance.get<ProfileType>(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
        .then(res => res.data)
    },
    async getStatus(userId: number) {
        return instance.get<string>(`https://social-network.samuraijs.com/api/1.0/profile/status/` + userId)
        .then(res => res.data)
    },
    async updateStatus(status: string) {
        return instance.put(`https://social-network.samuraijs.com/api/1.0/profile/status/`, { status: status })
        .then(res => res.data)
    },
    async savePhoto(file: any) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put<ResponseType<SavePhotoResponseDataType>>(`https://social-network.samuraijs.com/api/1.0/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },

   async saveProfile(profile) {
        return instance.put<ResponseType>(`https://social-network.samuraijs.com/api/1.0/profile`, profile)
        .then(res => res.data)
    },


}
