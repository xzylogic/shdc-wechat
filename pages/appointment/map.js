import React from 'react'
import { withRouter } from 'next/router'

import Head from '../../app/components/Common/Head'
import RenderError from '../../app/components/Common/RenderError'
import MapComponent from '../../app/components/Appointment/MapComponent'

class Index extends React.Component {

  render() {
    const { hosOrgName, address,  latitude, longitude } = this.props.router.query
    return (
      <div>
        <Head title='医院地图' />
        <RenderError>
          <MapComponent hosOrgName={hosOrgName} address={address} latitude={latitude} longitude={longitude} />
        </RenderError>
      </div>
    )
  }
}

export default withRouter(Index)
