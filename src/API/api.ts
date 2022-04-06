import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'edd97c3e-6ef9-403d-940e-8d13240c1ede'
    }
})

export enum ResultCodeForCapcha {
    captchaIsRequired = 10
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

interface ResponseType<D = {}, RS = ResultCodeEnum> {
    data: D
    messages: Array<string>
    resultCode: RS
}

type MeTypes = {
    id: number
    login: string
    email: string
}

type LoginTypes = {
    userId: number | null
}

type Photos = {
    small: string | null
    large: string | null
}

export interface UsersTypes {
    name: string
    id: number
    status: string
    photos: Photos
    followed: boolean
}

interface getItemsTypes {
    items: Array<UsersTypes>
    totalCount: number
    error: string | null
}

export interface ProfileType {
    userId: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: any
    photos: Photos
    aboutMe: string
}

export const usersAPI = {
    getUsers(currentPage = 1, term: string = '', friend: null | boolean  = null) {
        return instance.get<getItemsTypes>(`users?page=${currentPage}&term=${term}` +
            (friend === null ? '' : `&friend=${friend}`))
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`).then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(response => response.data) as Promise<ResponseType>
    },
    getProfile(userId: number | null) {
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get<ProfileType>(`profile/` + userId)
    },
    getStatus(userId: number | null) {
        return instance.get<string>(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status/`, {status})
    },
    savePhoto(photoFile: any) {
        let formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<ResponseType<UsersTypes>>(`profile/photo`, formData)
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile)
    }
}

export const authMe = {
    me() {
        return instance.get<ResponseType<MeTypes>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ResponseType<LoginTypes, ResultCodeEnum | ResultCodeForCapcha>>
        (`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

export const postsAPI = () => {
    return axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
        .then(response => response.data)
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}