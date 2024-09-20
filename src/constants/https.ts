import axios from 'axios'
import { toast } from 'sonner'
import { MESSAGES } from './messages'
import parse from 'html-react-parser'

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
      toast.error(
        parse(
          `<div className="relative border border-transparent bg-black p-3 xs:p-4 font-geist flex items-center text-sm xs:text-[15px] 2xs:text-base !leading-[18px] xs:!leading-[20px] w-full before:content-[''] before:!scale-y-1 before:!translate-y-0 before:bottom-0 before:absolute before:left-0 before:[--shape:_2px] xs:before:[--shape:_4px] before:w-12 xs:before:w-16 before:h-0.5 xs:before:h-1 before:[clip-path:_polygon(0_0,calc(100%_-_var(--shape))_0%,100%_100%,0%_100%)] before:overflow-hidden after:content-[''] after:bottom-0 after:absolute after:right-0 after:left-auto after:[--shape:_2px] xs:after:[--shape:_4px] after:w-12 xs:after:w-16 after:overflow-hidden after:h-0.5 xs:after:h-1  after:[clip-path:_polygon(var(--shape)_0,100%_0%,100%_100%,0%_100%)] justify-center shadow-[inset_0_0_40px_rgba(229,57,53,0.45)] !border-error before:bg-error after:bg-error">
            <div className="flex items-center space-x-1 xs:space-x-1.5 2xs:space-x-2">
              <img className="size-5 xs:size-6" src="/assets/images/icons/icon-error-hexagon-red.svg" alt="DePIN Alliance"/>
              <p className="text-title tracking-[-1px]">${MESSAGES[response.data.message] || response.data.message}</p>
            </div>
          </div>`
        )
      )
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
