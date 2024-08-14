import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'
// const baseURL = 'http://127.0.0.1:3007'

const instance = axios.create({
  baseURL,
  timeout: 10000
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded',
  //   Accept: 'application/json'
  // }
})

instance.interceptors.request.use(
  (config) => {
    const useStore = useUserStore()
    if (useStore.token) {
      config.headers.Authorization = useStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 0) {
      return res
    }
    ElMessage.error(res.data.message || '伺服器異常')
    return Promise.reject(res.data)
  },
  (err) => {
    if (err.response?.status === 401) {
      router.push('/login')
    }
    console.log(111)

    ElMessage.error(err.response.data.message || '伺服器異常')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
