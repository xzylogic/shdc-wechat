export const actionTypes = {
  LOAD_ARTICLES: 'LOAD_ARTICLES',
  UPDATE_ARTICLES: 'UPDATE_ARTICLES',
}

export const loadArticlesAction = (data) => {
  return {
    type: actionTypes.LOAD_ARTICLES,
    data: data
  }
}

export const updateArticlesAction = (data) => {
  return {
    type: actionTypes.UPDATE_ARTICLES,
    data: data
  }
}
