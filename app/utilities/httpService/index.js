import getConfig from 'next/config'
import { HttpHandler } from './httpHandler'
import { HttpStrategy } from './httpStrategy'
import { CatchError } from './errorStrategy'

const {publicRuntimeConfig} = getConfig()
const configUrl = publicRuntimeConfig.appConfig.apiUrl

export const HttpHostService = new HttpHandler(HttpStrategy, CatchError)
export const HttpService = new HttpHandler(HttpStrategy, CatchError, configUrl)
