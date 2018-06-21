import { Toast } from 'antd-mobile'

export const ToastError = (error) => {
  console.log(error.message)
  Toast.info(error.message)
}

export const CatchError = (error) => {
  throw new Error(error.message)
}
