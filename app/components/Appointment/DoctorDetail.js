import React from 'react'

const DoctorDetail = (doctor) => (
  <div>
    <div className='mylist doctor__detail'>
      <div className='list__main'>
        <div className='list__content'>
          <p>五月平</p>
          <p>副主任医师</p>
        </div>
      </div>
      <div className='list__left'>
        <div className='doctor__avatar'>
          <img src='https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png' />
        </div>
      </div>
    </div>
    <div className='doctor__detail__desc'>专家简介：专家简介专家简介专家简介专家简介专家简介专家简介专家简介专家简介专家简介专家简介</div>
    <div className='doctor__detail__desc'>门诊时间：专家简介专家简介专家简介专家简介专家简介专家简介专家简介专家简介专家简介专家简介</div>
  </div>
)

export default DoctorDetail