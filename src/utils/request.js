import axios from 'axios'
import qs from 'qs'
import { ElMessage, ElLoading } from 'element-plus'

let loadingInstance

// 创建一个axios实例
const service = axios.create({
  baseURL: '/mock',
  timeout: 30000,
  transformRequest: [(data) => qs.stringify(data)],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

// 设置请求拦截
service.interceptors.request.use(
  (config) => {
    if (config.loading) {
      loadingInstance = ElLoading.service({
        text: '加载中',
        target: 'document.body',
      })
      console.log(loadingInstance, 'loadingInstance')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 设置响应拦截
service.interceptors.response.use(
  (res) => {
    setTimeout(() => {
      loadingInstance?.close()
    }, 3000)

    const { code, data, msg } = res.data
    if (code == 200) {
      return data
    } else {
      ElMessage({
        type: 'error',
        message: msg,
      })
      return Promise.reject(msg)
    }
  },
  (err) => {
    loadingInstance?.close()
    ElMessage({
      type: 'error',
      message: err,
    })
    return Promise.reject(err)
  }
)

export default service