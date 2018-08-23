import getConfig from 'next/config'
import { HttpHandler } from './httpHandler'
import { HttpStrategy, HttpHostStrategy } from './httpStrategy'
import { CatchError } from './errorStrategy'

const {publicRuntimeConfig} = getConfig()
const configUrl = publicRuntimeConfig.appConfig.apiUrl

export const HttpHostService = new HttpHandler(HttpHostStrategy, CatchError)
export const HttpService = new HttpHandler(HttpStrategy, CatchError, configUrl)
