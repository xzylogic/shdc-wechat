import { all } from 'redux-saga/effects'
import es6promise from 'es6-promise'

import { loginSaga } from './login/login.saga'
import { hospitalsSaga } from './appointment/hospitals.saga'
import { departmentsSaga } from './appointment/departments.saga'

es6promise.polyfill()

function* rootSaga() {
  yield all([
    ...loginSaga,
    ...hospitalsSaga,
    ...departmentsSaga
  ])
}

export default rootSaga
