import React, {Component} from 'react'
import {NavBar, List, WingBlank, WhiteSpace, InputItem, Radio, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {login} from '../../redux/actions'
/*
登陆路由组件
 */

class Login extends Component {

  // 初始化状态
  state = {
    username: '',
    password: '',
  }

  // 跳转到注册
  toRegister = () => {
    // 编程式路由导航(通过纯js实现路由跳转)
    this.props.history.replace('/register')
  }

  // 请求登陆
  login = () => {
    console.log(this.state)
    this.props.login(this.state)
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  render () {

    const {type} = this.state
    const {msg, redirectTo} = this.props.user
    // 判断是否需要自动跳转
    if(redirectTo) {
      return <Redirect to={redirectTo}/>  // 在render()中实现自动跳转指定路由
    }

    return (
      <div>
        <NavBar>用户登陆</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            <p>{msg}</p>

            <InputItem type='text' placeholder='请输入用户名'
                       onChange={(val) => this.handleChange('username', val)}>用户名: </InputItem>
            <WhiteSpace/>
            <InputItem type='password' placeholder='请输入密码'
                       onChange={(val) => this.handleChange('password', val)}>密码: </InputItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;陆</Button>
            <WhiteSpace/>
            <Button onClick={this.toRegister}>没有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),  // 向UI组件Login中传入哪些一般属性
  {login} // 向UI组件Login中传入哪些函数属性
  // 传给UI组件不是异步action函数本身, 而是包含分发异步action的一个新的函数
)(Login)
