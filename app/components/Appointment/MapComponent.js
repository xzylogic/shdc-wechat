import React from 'react'
import { connect } from 'react-redux'

class Index extends React.Component {
  componentDidMount() {
    const { hospitalsReducer } = this.props
    const { hospitalsAll } = hospitalsReducer

    let hosNames = []
    Array.isArray(hospitalsAll) && hospitalsAll.map(hospital => {
      hosNames.push([hospital.longitude, hospital.latitude, hospital.hospitalAdd.split(',')[0]])
    })
    
    let map = new BMap.Map('container')
    map.centerAndZoom(new BMap.Point(121.535894, 31.316075), 10)
    map.addControl(new BMap.MapTypeControl()) //添加地图类型控件
    map.addControl(new BMap.NavigationControl())
    map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
    map.setCurrentCity('上海') // 设置地图显示的城市 此项是必须设置的

    let opts = {
      width: 250,     // 信息窗口宽度
      height: 80,     // 信息窗口高度
      title: "信息窗口", // 信息窗口标题
      enableMessage: true//设置允许信息窗发送短息
    }

    hosNames.map(data => {
      let marker = new BMap.Marker(new BMap.Point(data[0], data[1])) // 创建标注
      let content = data[2]
      map.addOverlay(marker) // 将标注添加到地图中
      this.addClickHandler(map, content, marker)
    })
  }

  addClickHandler = (map, content, marker) => {
    marker.addEventListener('click',  (e) => {
      var local = new BMap.LocalSearch(map, {
        renderOptions: { map: map, panel: "r-result" }
      })
      local.search(content)
    })
  }

  openInfo = (map, content, e) => {
    let p = e.target;
    let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
    let infoWindow = new BMap.InfoWindow(content, opts) // 创建信息窗口对象 
    map.openInfoWindow(infoWindow, point) //开启信息窗口
  }

  render() {
    return (
      <div id='container' style={{height: '100vh', width: '100%'}}></div>
    )
  }
}

export default connect(state => state)(Index)
