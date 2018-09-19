import React from 'react'
import { connect } from 'react-redux'
import { List } from 'antd-mobile'
import * as momnet from 'moment'

import './articles.scss'

import { checkNotNullArr } from '../../utilities/common'

class Index extends React.Component {
  render() {
    const { articlesReducer } = this.props
    const { articles } = articlesReducer

    return (
      <React.Fragment>
        <List style={{background: '#fff'}}>{
          articles && checkNotNullArr(articles) && articles.map((article, i) => (
            <a href={article.newsUrl} referrer='origin' target='_blank' key={i} >
              <List.Item 
                extra={article.pubdate ? momnet(article.pubdate).format('YYYY-MM-DD') : ''}
                style={{height: '55px'}}
                className={article.pubdate ? '' : 'article__content'}
              >{article.title}</List.Item>
            </a>
          ))
        }</List>
      </React.Fragment>
    )
  }
}

export default connect(state => state)(Index)