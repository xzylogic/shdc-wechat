import { all } from 'redux-saga/effects'
import es6promise from 'es6-promise'

import { loginSaga } from './login/login.saga'
import { hospitalsSaga } from './appointment/hospitals.saga'
import { departmentsSaga } from './appointment/departments.saga'
import { doctorSaga } from './appointment/doctor.saga'
import { doctorsSaga } from './appointment/doctors.saga'
import { consultationSaga } from './appointment/consultation.saga'
import { detailSaga } from './appointment/detail.saga'
import { successSaga } from './appointment/success.saga'
import { accountSaga } from './personal/account.saga'
import { appointmentSaga } from './personal/appointment.saga'
import { reportsSaga } from './personal/reports.saga'
import { balanceSaga } from './personal/balance.saga'
import { waitingSaga } from './personal/waiting.saga'
import { articlesSaga } from './service/articles.saga'

es6promise.polyfill()

function* rootSaga() {
  yield all([
    ...loginSaga,
    ...hospitalsSaga,
    ...departmentsSaga,
    ...doctorSaga,
    ...doctorsSaga,
    ...consultationSaga,
    ...detailSaga,
    ...successSaga,
    ...accountSaga,
    ...appointmentSaga,
    ...reportsSaga,
    ...balanceSaga,
    ...waitingSaga,
    ...articlesSaga,
  ])
}

export default rootSaga
