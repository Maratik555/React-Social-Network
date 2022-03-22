import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
      'API-KEY': 'edd97c3e-6ef9-403d-940e-8d13240c1ede'
    }
  })
export const usersAPI = {
 async getUsers(currentPage = 1, pageSize = 5, friend = false) {
  let response = await instance.get(`users?page=${currentPage}&count=${pageSize}&friend=${friend}`)
      return response.data
  },
  follow(userId:number){
    return instance.post(`follow/${userId}`)
  },
  unfollow(userId:number){
    return instance.delete(`follow/${userId}`)
  },
  getProfile(userId:number){
    return profileAPI.getProfile(userId)
  }
}

export interface ProfileType {
    userId:string
    lookingForAJob:boolean
    lookingForAJobDescription:string
    fullName:string
    contacts:any
    photos: string | null
}

export const profileAPI = {
  getProfile(userId:number){
    return instance.get(`profile/`+ userId)
  },
  getStatus(userId:number){
    return instance.get(`profile/status/`+ userId)
  },
  updateStatus(status:string){
    return instance.put(`profile/status/`,{status})
  },
  savePhoto(photoFile:any){
    let formData = new FormData()
    formData.append('image',photoFile)
    return instance.put(`profile/photo`, formData)
  },
  saveProfile(profile:ProfileType) {
    return instance.put(`profile`, profile)
  }
}

export enum resultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum resultCodeForCapcha {
    captchaIsRequired = 10
}

type MeTypes = {
    data:{id:number,email:string,login:string}
    resultCode: resultCodeEnum
    messages:Array<string>
}

type LoginTypes = {
    data:{userId:number}
    resultCode: resultCodeEnum | resultCodeForCapcha
    messages:Array<string>
}

export const authMe = {
  me () {
    return instance.get<MeTypes>(`auth/me`).then(res => res.data)
  },
  login(email:string, password:string,rememberMe= false, captcha: null|string = null) {
    return instance.post<LoginTypes>(`auth/login`, {email,password,rememberMe,captcha})
      .then(res => res.data)
  },
  logout () {
    return instance.delete(`auth/login`)
  }
}

export const securityAPI = {
  getCaptchaUrl () {
    return instance.get(`security/get-captcha-url`)
}
}