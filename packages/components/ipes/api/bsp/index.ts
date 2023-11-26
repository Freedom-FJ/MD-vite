import Request from '../../service/request'
import type { USER_CENTER_API_RESPONSE } from './types'

// 用户信息
export const userInfo = () => {
    return Request<USER_CENTER_API_RESPONSE.userInfo[]>({
        url: '/api/v1.0/user/login-user',
        server: 'userCenterServe',
        method: 'get',
    })
}
