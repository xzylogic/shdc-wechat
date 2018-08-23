import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderError from '../../app/components/Common/RenderError'
import ArticlesComponent from '../../app/components/Service/ArticlesComponent'

import { initGlobalQuery, checkNullArr } from '../../app/utilities/common'
import { loadArticlesAction } from '../../app/store/actions/service/articles.action'

class Index extends React.Component {
  state = {
    title: ''
  }

  static async getInitialProps(props) {
    const {store, query} = props.ctx
    await initGlobalQuery(store, query)
    if (store.getState().articlesReducer && checkNullArr(store.getState().articlesReducer.articles)) {
      await store.dispatch(loadArticlesAction(query.type))
    }
    return query
  }

  componentWillMount() {
    const { type } = this.props
    switch(type) {
      case '102':
        this.setState({title: '最新公告'})
        return
      case '103':
        this.setState({title: '新闻动态'})
        return
      case '107':
        this.setState({title: '常见问题'})
        return
      default:
        return
    }
  }

  render() {
    return (
      <div>
        <Head title={this.state.title} />
        <RenderError>
          <ArticlesComponent />
        </RenderError>
      </div>
    )
  }
}

export default connect(state => state)(Index)
