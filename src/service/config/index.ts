import axios from 'axios'
import type { AxiosInstance } from 'axios'
import {
  ArRequestConfig,
  ArReuqestInterceptors
} from './types'

class ArRequest {
  instance: AxiosInstance
  interceptors?: ArReuqestInterceptors

  constructor(config: ArRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 请求拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor
    )
    // 响应拦截
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCache
    )
  }

  request<T = any>(
    config: ArRequestConfig
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  get<T = any>(
    config: ArRequestConfig
  ): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'GET'
    })
  }

  post<T = any>(
    config: ArRequestConfig
  ): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'POST'
    })
  }

  patch<T = any>(
    config: ArRequestConfig
  ): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'PATCH'
    })
  }

  delete<T = any>(
    config: ArRequestConfig
  ): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'DELETE'
    })
  }
}

export default ArRequest
