import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { WhiteSpace, List, Card, Button } from 'antd-mobile'
import * as moment from 'moment'

import UserCard from './UserCard'
import { NullContent } from '../Common/Null'
import { checkNotNullArr } from '../../utilities/common'
import { updateReportsParamAction, loadMyReportsAction } from '../../store/actions/personal/reports.action'

import './personal.scss'

class Index extends React.Component {
  state = {
    showJY: false,
    showJC: false,
  } 
  render() {
    const store = this.props
    const { router, reportsReducer } = this.props
    const { searchParam, reportsSurvey, reportsInspection } = reportsReducer
    return (
      <div>
        <UserCard ifKey value={searchParam} onChange={(value)=> {
            store.dispatch(updateReportsParamAction(value[0]))
            store.dispatch(loadMyReportsAction())
            this.setState({showJY: false, showJC: false})
          }
        } />
        <WhiteSpace size='lg' />
        <List>
          <List.Item
            style={{height: '80px'}}
            extra={<i className={`anticon icon-down ${this.state.showJY ? 'icon__reverse reverse': 'icon__reverse'}`} />}
            onClick={() => this.setState({showJY: !this.state.showJY})}
          >
            <img src='/static/images/icon-report-jy.png' style={{height: '50px', width: '50px', marginRight: '15px'}} />
            检验报告
          </List.Item>{
            this.state.showJY ? (
              <List.Item style={{background: '#f5f5f9'}}>
                <WhiteSpace />
                {
                  checkNotNullArr(reportsSurvey) ? reportsSurvey.map((obj, index) => (
                    <React.Fragment key={index}>
                      <Card>
                        <Card.Header
                          style={{background: '#fafafa'}}
                          title={obj.orgName}
                          thumb='/static/images/icon-hospital-s.png'
                          extra={<span>{moment(obj.repDate).format('YYYY-MM-DD')}</span>}
                        />
                        <Card.Body>
                          <div>
                            {obj.repType}
                            <Button 
                              type='ghost' 
                              size='small' 
                              style={{float: 'right', width: '80px'}}
                              onClick={() => router.push(`/personal/reportdetail?url=${encodeURI(obj.repUrl)}`, `/personal/reportdetail/${encodeURI(obj.repUrl)}`)}
                            >查看</Button>
                          </div>
                        </Card.Body>
                      </Card>
                      <WhiteSpace size='lg' />
                    </React.Fragment>
                  )) : <NullContent msg='没有查询到您的检验报告' />
                }
              </List.Item>
            ) : ''
          }
          <List.Item
            style={{height: '80px'}}
            extra={<i className={`anticon icon-down ${this.state.showJC ? 'icon__reverse reverse': 'icon__reverse'}`} />}
            onClick={() => this.setState({showJC: !this.state.showJC})}
          >
            <img src='/static/images/icon-report-jc.png' style={{height: '50px', width: '50px', marginRight: '15px'}} />
            检查报告
          </List.Item>{
            this.state.showJC ? (
              <List.Item style={{background: '#f5f5f9'}}>
                <WhiteSpace />
                {
                  checkNotNullArr(reportsInspection) ? reportsInspection.map((obj, index) => (
                    <React.Fragment key={index}>
                      <Card>
                        <Card.Header
                          style={{background: '#fafafa'}}
                          title={obj.orgName}
                          thumb='/static/images/icon-hospital-s.png'
                          extra={<span>{moment(obj.repDate).format('YYYY-MM-DD')}</span>}
                        />
                        <Card.Body>
                          <div>
                            {obj.repType}  
                            <Button 
                              type='ghost' 
                              size='small' 
                              style={{float: 'right', width: '80px'}}
                              onClick={() => router.push(`/personal/reportdetail?url=${encodeURI(obj.repUrl)}`, `/personal/reportdetail/${encodeURI(obj.repUrl)}`)}
                            >查看</Button>
                          </div>
                        </Card.Body>
                      </Card>
                      <WhiteSpace size='lg' />
                    </React.Fragment>
                  )) : <NullContent msg='没有查询到您的检验报告' />
                }
              </List.Item>
            ) : ''
          }
        </List>
      </div>
    )
  }
}

export default withRouter(connect(state => state)(Index))
