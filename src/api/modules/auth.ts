import { instance } from '@/api/https'

const AUTH = {
  POST_REGISTER: (data: { account: string; password: string }) =>
    instance.post('/users', { ...data }),
  POST_UPDATE_PASSWORD: (data: { id: string; password: string }) =>
    instance.post(`/users/updatePassword`, { ...data }),
  POST_LOGIN: (data: { account: string; password: string }) =>
    instance.post('/auth/login', { ...data }),
}

export default AUTH
