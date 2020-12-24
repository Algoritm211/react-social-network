import {ProfileType} from "../types/types";
import {instanceAxios, ISetPhoto, ISetStatus, ISetUserProfile} from "./api";

export const profileAPI = {
  getProfile(userId: number | null) {
    return instanceAxios.get<ProfileType>(`profile/${userId}`)
      .then(response => {
        return response.data
      })
  },

  getStatus(userId: number) {
    return instanceAxios.get(`/profile/status/${userId}`)
  },

  setStatus(status: string) {
    return instanceAxios.put<ISetStatus>('profile/status', {status: status})
      .then(response => {
        return response.data
      })
  },
  setPhoto(photoFile: File) {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instanceAxios.put<ISetPhoto>('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  setUserProfile(userData: any) {
    return instanceAxios.put<ISetUserProfile>('profile', userData)
  }
}