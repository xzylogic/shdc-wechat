import { Toast } from 'antd-mobile'
import * as CODE from '../status-code'

export const CatchError = async (error) => {
  if (typeof window === 'undefined') {
    throw new Error(error.message)
  } else {
    console.log(error.message)
    await Toast.hide()
    await Toast.info(error.message == CODE.NOT_LOGIN ? '未登录': error.message)
  }
}
