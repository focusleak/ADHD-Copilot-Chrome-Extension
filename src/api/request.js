import axios from 'axios'
import { toast } from "sonner"

// 创建axios实例
const request = axios.create({
    // baseURL: , // 环境变量配置
    timeout: 10000, // 请求超时
    // responseType: 'json',
    // headers: { 'Content-Type': 'application/json' },
    // withCredentials: true,
})

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        // 携带token示例
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        // const { data } = response
        // // 根据后端约定判断请求是否成功
        // if (data.code !== 0) {
        //     toast.error(data.message || '请求失败')
        //     return Promise.reject(data)
        // }
        return response
    },
    (error) => {
        toast.error(error.message || '网络错误')
        return Promise.reject(error)
    }
)

export default request
