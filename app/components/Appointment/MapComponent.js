import React from 'react'
import { connect } from 'react-redux'
import { BaiduMap, Marker, InfoWindow, Label, Circle } from 'react-baidu-maps'

class Index extends React.Component {

  render() { 
    const { hosOrgName, address, latitude, longitude } = this.props
    console.log(address, latitude, longitude)
    return (
      <div style={{height: '100vh', width: '100%'}}>
        <BaiduMap
          loadingElement={<div>Loading.....</div>}
          mapContainer={<div style={{ height: '100%' }} />}
          defaultZoom={15}
          defaultCenter={{ lng: Number(longitude), lat: Number(latitude) }}
          enableScrollWheelZoom
          enableDragging
        >
          <Marker position={{ lng: Number(longitude), lat: Number(latitude) }}>
            <InfoWindow
              position={{ lng: Number(longitude), lat: Number(latitude) }}
              content={`<div><h2>${hosOrgName}</h2><br/><p>${address}</p></div>`} offset={{ width: 0, height: -30 }} />
          </Marker>
          <InfoWindow
            position={{ lng: Number(longitude), lat: Number(latitude) }}
            content={`<div><h2>${hosOrgName}</h2><br/><p>地址：${address}</p></div>`} offset={{ width: 0, height: -30 }} />
        </BaiduMap>
      </div>
    )
  }
}

export default connect(state => state)(Index)
