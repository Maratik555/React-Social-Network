import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
      'API-KEY': 'edd97c3e-6ef9-403d-940e-8d13240c1ede'
    }
  })

export const usersAPI = {
 async getUsers(currentPage = 1, pageSize = 5) {
  let response = await instance.get(`users?page=${currentPage}&count=${pageSize}`)
      return response.data
  },
  follow(userId){
    return instance.post(`follow/${userId}`)
  },
  unfollow(userId){
    return instance.delete(`follow/${userId}`)
  },
  getProfile(userId){
    return profileAPI.getProfile(userId)
  }
}


export const profileAPI = {
  getProfile(userId){
    return instance.get(`profile/`+ userId)
  },
  getStatus(userId){
    return instance.get(`profile/status/`+ userId)
  },
  updateStatus(status){
    return instance.put(`profile/status/`,{status})
  },
  savePhoto(photoFile){
    let formData = new FormData()
    formData.append('image',photoFile)
    return instance.put(`profile/photo`, formData)
  },
  saveProfile(profile) {
    return instance.put(`profile`, profile)
  }
}

export const authMe = {
  me () {
    return instance.get(`auth/me`)
  },
  login(email, password,rememberMe=false, captcha=null) {
    return instance.post(`auth/login`, {email,password,rememberMe,captcha})
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