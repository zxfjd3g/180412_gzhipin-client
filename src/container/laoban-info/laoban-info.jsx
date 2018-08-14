import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, List, WingBlank, InputItem, TextareaItem, Button} from 'antd-mobile'

import HeaderSelector from '../../components/header-selector/header-selector'

/*
老板信息完善路由组件
 */
class LaobanInfo extends Component {

  render () {
    return (
      <div>
        <NavBar>老板信息完善</NavBar>
        <HeaderSelector/>
        <WingBlank>
          <List>
            <InputItem>招聘职位: </InputItem>
            <InputItem>公司名称: </InputItem>
            <InputItem>职位薪资: </InputItem>
            <TextareaItem
              title="职位要求:"
              rows={3}/>
            <Button type='primary'>保存</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({}),
  {}
)(LaobanInfo)
