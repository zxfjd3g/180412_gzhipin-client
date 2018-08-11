import React, {Component} from 'react'
import {NavBar, List, WingBlank, WhiteSpace, InputItem, Radio, Button} from 'antd-mobile'

import Logo from '../../components/logo/logo'


/*
注册路由组件
 */
export default class Register extends Component {

  toLogin = () => {
    // 编程式路由导航(通过纯js实现路由跳转)
    this.props.history.replace('/login')
  }

  render () {
    return (
      <div>
        <NavBar>用户注册</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            <InputItem type='text' placeholder='请输入用户名'>用户名: </InputItem>
            <WhiteSpace/>
            <InputItem type='password' placeholder='请输入密码'>密码: </InputItem>
            <WhiteSpace/>
            <InputItem type='password' placeholder='请输入确认密码'>确认密码: </InputItem>
            <WhiteSpace/>
            <List.Item>
              <span>用户类型: </span>&nbsp;&nbsp;&nbsp;
              <Radio>老板</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio>大神</Radio>
            </List.Item>
            <WhiteSpace/>
            <Button type='primary'>注&nbsp;&nbsp;册</Button>
            <WhiteSpace/>
            <Button onClick={this.toLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}
