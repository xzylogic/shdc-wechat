import { all } from 'redux-saga/effects'
import es6promise from 'es6-promise'

import { loginSaga } from './login/login.saga'

es6promise.polyfill()

function* rootSaga() {
  yield all([
    ...loginSaga
  ])
}

export default rootSaga
