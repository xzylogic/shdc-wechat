import React from 'react'
import { Card, Button, WhiteSpace } from 'antd-mobile'

export const AppointmentCard = ({data, handleCancel}) => (
  <div>
    <Card style={{height: data.orderStatus == '取消预约' ? '200px' : '165px'}}>
      <Card.Header title={data && data.scheduleDate && data.scheduleDate.split(' ')[0]}
        thumb={<i className='anticon icon-calendar user__tipicon' />} 
        extra={<span className='user__primary'>{data.orderStatus == '取消预约' ? '已预约' : data && data.orderStatus}</span>} 
      />
      <Card.Body className='user__resettips'>
        <p>预约时间： {data && data.scheduleDate}</p>
        <p>预约医院： {data && data.hosOrgName}</p>
        <p>预约科室： {data && data.deptName}</p>
        <p>预约编号： {data && data.hosNumSourceId}</p>
        <WhiteSpace />
        {
          data && data.orderStatus == '取消预约' ? (
            <div style={{float: 'right', overflow: 'hidden'}}>
              <Button size='small' type='ghost' style={{width: '80px'}} onClick={handleCancel}>取消</Button>
            </div>
          ) : ''
        }
      </Card.Body>
    </Card>
  </div>
)