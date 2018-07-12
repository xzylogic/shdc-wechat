import { Toast } from 'antd-mobile'
import * as CODE from '../status-code'

export const ToastError = (error) => {
  console.log(error.message)
  if (error.message == CODE.NOT_LOGIN) {
    Toast.info('未登录')
  } else {
    Toast.info(error.message)
  }
}

export const CatchError = (error) => {
  throw new Error(error.message)
}
