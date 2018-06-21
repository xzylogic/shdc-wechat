import getConfig from 'next/config'
import { HttpHandler } from './httpHandler'
import { HttpStrategy } from './httpStrategy'
import { ToastError, CatchError } from './errorStrategy'

const {publicRuntimeConfig} = getConfig()
const configUrl = publicRuntimeConfig.appConfig.apiUrl

export const HttpToastService = new HttpHandler(HttpStrategy, ToastError, configUrl)
export const HttpService = new HttpHandler(HttpStrategy, CatchError, configUrl)
