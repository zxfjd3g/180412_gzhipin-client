import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Grid, List} from 'antd-mobile'

export default class HeaderSelector extends Component {

  static propTypes = {
    setHeader: PropTypes.func.isRequired
  }

  state = {
    icon: null, // 当前选择的头像图片对象
  }

  selectHeader = ({icon, text}) => { // item: {icon, text}
    // 设置当前头像图片对象
    this.setState({icon})
    // 设置头像名称
    this.props.setHeader(text)
  }

  constructor (props) {
    super(props)

    // 初始化需要显示列表数据
    this.headerList = []
    for (var i = 0; i < 20; i++) {
      const text = `头像${i+1}`
      const icon = require(`../../assets/images/${text}.png`)
      this.headerList.push({icon, text})
    }
  }

  render () {
    // 根据状态中的icon决定显示的头部界面
    const {icon} = this.state
    const head = icon ? <div>已选择头像:<img src={icon}/></div> : '请选择头像'

    return (
      <List renderHeader={() => head}>
        <Grid data={this.headerList}
              columnNum={5}
              onClick={this.selectHeader}/>
      </List>
    )
  }
}