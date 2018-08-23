import { put, takeLatest, call } from 'redux-saga/effects'

import { actionTypes, updateArticlesAction } from '../../actions/service/articles.action'
import { authError, authNotLogin } from '../../actions/global.action'
import { HttpService } from '../../../utilities/httpService'

import { startLoading, endLoading } from '../../../utilities/common'
import * as CODE from '../../../utilities/status-code'

const PATH = {
  getArticles: '/api/news/news-info',
}

const getArticlesService = (channelId) => {
  const query = `channelId=${channelId}`
  return HttpService.get(PATH.getArticles, query)
}

function* loadArticles(actions) {
  try {
    yield startLoading('Loading')

    const data = yield call(getArticlesService, actions.data)
    if (data) {
      yield put(updateArticlesAction(data))
      yield endLoading()
    }
    
  } catch (error) {
    if (error && error.message == CODE.NOT_LOGIN) {
      yield put(authNotLogin())
    } else {
      yield put(authError({errorMsg: error.message}))
    }
  }
}

export const articlesSaga = [
  takeLatest(actionTypes.LOAD_ARTICLES, loadArticles)
]
