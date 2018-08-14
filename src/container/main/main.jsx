import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import Cookies from 'js-cookie'

import {getUser} from '../../redux/actions'

/*
主界面路由组件
 */
class Main extends Component {



  componentDidMount() {
    // 只有当前面登陆过, 但当前还没有登陆, 才去发请求获取用户信息
    const userid = Cookies.get('userid')
    const {user} = this.props
    if(userid && !user._id) {
      this.props.getUser()
    }
  }

  render () {

    // 1). 如果cookie中没有userid, 直接跳转到登陆页面
    const userid = Cookies.get('userid')
    if(!userid) {
      return <Redirect to='/login'/>
    }
    // 2). state中的user中没有_id, 发请求获取当前用户信息
    const {user} = this.props
    if(!user._id) { // 不能在render中发送ajax请求
      return <div>LOADING...</div>
    }

    return (
      <div>
        <Switch>
          <Route path='/laobaninfo' component={LaobanInfo}/>
          <Route path='/dasheninfo' component={DashenInfo}/>
        </Switch>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {getUser}
)(Main)

/*
1. 实现自动登陆
  1). 如果cookie中没有userid, 直接跳转到登陆页面
  2). state中的user中没有_id, 发请求获取当前用户信息
 */