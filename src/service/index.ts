import ArRequest from './config'
import {
  BASE_URL,
  TIME_OUT
} from './config/config'

const arRequest = new ArRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    responseInterceptor(response) {
      console.log('响应成功拦截')
      console.log(response.data)

      return response.data
    },
    responseInterceptorCache(config) {
      console.log(config.response)

      return Promise.reject(new Error(config))
    }
  }
})

export { arRequest }

export * from './module/songs'