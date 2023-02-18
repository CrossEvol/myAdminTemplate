import request from '@/utils/request'

const reqLogin = (username: string, password: string) =>
  request.get<User>(`/login?username=${username}&password=${password}`)

export default {
  reqLogin
}
