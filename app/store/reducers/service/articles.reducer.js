import { actionTypes } from '../../actions/service/articles.action'
import { initialArticlesState } from '../../states/service/articles.state'

export const articlesReducer = (state = initialArticlesState, action = {}) => {
  switch (action.type) {
    case actionTypes.UPDATE_ARTICLES:
      return {
        ...state,
        ...{ articles: action.data }
      }
    default:
      return state
  }
}

export const articlesState = {
  articlesReducer: initialArticlesState
}
