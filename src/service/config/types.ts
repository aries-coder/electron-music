import type {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios'

export interface ArReuqestInterceptors<
  T = AxiosResponse
> {
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestInterceptorCache?: (config: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCache?: (config: any) => any
}

export interface ArRequestConfig<
  T = AxiosResponse
> extends AxiosRequestConfig {
  interceptors?: ArReuqestInterceptors<T>
}
