import { Toast } from 'antd-mobile'
import * as CODE from '../status-code'

export const ToastError = (error) => {
  console.log(error.message)
  Toast.info(error.message == CODE.NOT_LOGIN ? '未登录': error.message)
}

export const CatchError = (error) => {
  throw new Error(error.message)
}
