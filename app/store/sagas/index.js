import { all } from 'redux-saga/effects'
import es6promise from 'es6-promise'

import { loginSaga } from './login/login.saga'
import { hospitalsSaga } from './appointment/hospitals.saga'
import { departmentsSaga } from './appointment/departments.saga'
import { doctorSaga } from './appointment/doctor.saga'
import { doctorsSaga } from './appointment/doctors.saga'
import { consultationSaga } from './appointment/consultation.saga'
import { accountSaga } from './personal/account.saga'

es6promise.polyfill()

function* rootSaga() {
  yield all([
    ...loginSaga,
    ...hospitalsSaga,
    ...departmentsSaga,
    ...doctorSaga,
    ...doctorsSaga,
    ...consultationSaga,
    ...accountSaga
  ])
}

export default rootSaga
