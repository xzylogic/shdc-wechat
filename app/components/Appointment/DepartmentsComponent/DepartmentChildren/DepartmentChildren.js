import React from 'react'

import { NullContent} from '../../../Common/Null'
import { checkNotNullArr } from '../../../../utilities/common'

import classes from './DepartmentChildren.scss'

const departmentChildren = (props) => {
  let childrenContent = ''
  if (checkNotNullArr(props.departmentChildren)) {
    childrenContent = props.departmentChildren.map((dchildren) => (
      <div
        key={dchildren.hosDeptCode}
        className={classes.DepartmentList}
        onClick={(event) => props.onClick(event, dchildren)}>
        {dchildren.deptName}
      </div>
    ))
  } else {
    childrenContent = <NullContent msg='暂无子科室' /> 
  }
  return (
    <React.Fragment>
      {childrenContent}
    </React.Fragment>
  )
}

export default departmentChildren
