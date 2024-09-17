import axios from 'axios'
import { toast } from 'sonner'
import { MESSAGES } from './messages'

const https = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000 // Timeout if necessary
})

// Add a request interceptor
https.interceptors.request.use(
  function (config) {
    config.headers['Cache-Control'] = 'no-cache'
    config.headers['Expires'] = '0'
    config.headers['Pragma'] = 'no-cache'

    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.status === 200 && response.data.status === 'success') {
      return {
        ...response.data,
        data: response.data.data,
        status: true
      }
    }
    if (response.data.message) {
      toast.error(MESSAGES[response.data.message] || response.data.message)
    }
    return { ...response.data, data: response.data.data, status: false }
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)
export default https
