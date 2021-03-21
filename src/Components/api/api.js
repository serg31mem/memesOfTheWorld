import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '5764fe15-26d5-4a4f-ab4c-5db09136fe0a'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance
            .get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    unfollowUser(userId) {
        return instance
            .delete(`follow/${userId}`)
            .then(response => response.data)
    },
    followUser(userId) {
        return instance
            .post(`follow/${userId}`)
            .then(response => response.data)
    }

}

export const authAPI = {
    authMe() {
        return instance
            .get(`auth/me`)

    },
    authLogin(email, password, rememberMe = false) {
        return instance
            .post('auth/login', {email, password, rememberMe})
    },
    authLogout() {
        return instance
            .delete('auth/login')
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance
            .get(`profile/${userId}`)
            .then(response => response.data)
    },
    getProfileStatus(userID) {
        return instance
            .get(`profile/status/${userID}`)
            .then(response => response.data)
    },
    updateProfileStatus(status) {
        return instance
            .put('profile/status', {status: status})

    },
    savePhoto(photoFile) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance
            .put('profile/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
    }
}