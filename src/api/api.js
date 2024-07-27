import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    headers: { 'API-KEY': "aff6b558-6641-499c-9426-43166041ced1" }
})


export const getUsers = (pageNumber = 1, pageSize = 10) => {

    return (
        instance.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${pageSize}`)
            .then(response => { return response.data }
            )
    )
}

export const follow = (userId) => {
    return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
}
export const unfollow = (userId) => {
    return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
}

export const getProfile = (userId) => {
    return profileAPI.getProfile(userId)
}
export const authAPI = {
    me() {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/auth/me`)
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/auth/login`, { email, password, rememberMe, captcha })
    },
    logout() {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/auth/login`)
    },

}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
    },
    getStatus(userId) {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/profile/status/` + userId)
    },
    updateStatus(status) {
        return instance.put(`https://social-network.samuraijs.com/api/1.0/profile/status/`, { status: status })
    },
    savePhoto(file) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put(`https://social-network.samuraijs.com/api/1.0/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    saveProfile(profile) {
        return instance.put(`https://social-network.samuraijs.com/api/1.0/profile`, profile)
    },


}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/security/get-captcha-url`)
    },

}



