import axios from "axios";
import {photoFileType, userProfileType, usersType} from "../../Types/types";

const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '5764fe15-26d5-4a4f-ab4c-5db09136fe0a',
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export enum ResultCodeEnum {
    Success = 0,
    Error= 1,
    Captcha = 10
}
type getUsersType = {
    items: Array<usersType>
    totalCount: number
    error: string | null
}
type unfollowUserType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}
type followUserType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance
            .get<getUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    unfollowUser(userId: number) {
        return instance
            .delete<unfollowUserType>(`follow/${userId}`)
            .then(response => response.data)
    },
    followUser(userId: number) {
        return instance
            .post<followUserType>(`follow/${userId}`)
            .then(response => response.data)
    }
}

type authMeType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {id: number, email: string, login: string}
}
type authLoginType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {userId: number}
}
type authLogoutType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}

export const authAPI = {
    authMe() {
        return instance
            .get<authMeType>(`auth/me`)
            .then(response => response.data)

    },
    authLogin(email: string, password: string, rememberMe: boolean, captcha: string = '') {
        return instance
            .post<authLoginType>('auth/login', {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    authLogout() {
        return instance
            .delete<authLogoutType>('auth/login')
            .then(response => response.data)
    }
}

type updateProfileStatusType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}
type savePhotoType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {photos: {small: string, large: string}}
}
type saveProfileType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance
            .get<userProfileType>(`profile/${userId}`)
            .then(response => response.data)
    },
    getProfileStatus(userID: number) {
        return instance
            .get<string>(`profile/status/${userID}`)
            .then(response => response.data)
    },
    updateProfileStatus(status: string) {
        return instance
            .put<updateProfileStatusType>('profile/status', {status: status})
            .then(response => response.data)

    },
    savePhoto(photoFile: photoFileType) {
        const formData = new FormData()
        // @ts-ignore
        formData.append('image', photoFile)
        return instance
            .put<savePhotoType>('profile/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => response.data)
    },
    saveProfile(profile: userProfileType) {
        return instance
            .put<saveProfileType>('profile', profile)
            .then(response => response.data)
    }
}

export const securityAPI = {
    getCaptcha() {
        return instance
            .get<{url: string}>(`/security/get-captcha-url`)
            .then(response => response.data)
    }
}