import getConfig from 'next/config'
import { HttpHandler } from './httpHandler'
import { HttpStrategy } from './httpStrategy'
import { ToastError, CatchError } from './errorStrategy'

const {publicRuntimeConfig} = getConfig()
const domainUrl = publicRuntimeConfig.appConfig.domain + '/'
const configUrl = publicRuntimeConfig.appConfig.apiMicro

export const HttpService = new HttpHandler(HttpStrategy, ToastError, domainUrl)
export const HttpReduxService = new HttpHandler(HttpStrategy, CatchError)
export const HttpMicroService = new HttpHandler(HttpStrategy, ToastError, configUrl)
