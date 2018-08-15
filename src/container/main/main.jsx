import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Personal from '../personal/personal'
import NavFooter from '../../components/nav-footer/nav-footer'
import NotFound from '../../components/not-found/not-found'
import Cookies from 'js-cookie'

import {getUser} from '../../redux/actions'
import {getRedirectPath} from '../../utils'

/*
主界面路由组件
 */
class Main extends Component {

  /*
  a = {}  // 给组件的实例对象添加属性,  后面访问: this.a
  static b = {}  给组件类对象添加属性, 后面访问: Main.b
   */


  // 给组件对象添加属性
  navList = [
    {
      path: '/laoban', // 路由路径
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen', // 路由路径
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]

  /*static propTypes = {

  }*/

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

    // 得到当前请求的path
    const path = this.props.location.pathname
    // 3). 判断请求的路径是否是/
    if(path==='/') {
      // 根据当前用户的相关信息, 自动跳转对应的界面
      return <Redirect to={getRedirectPath(user.type, user.header)}/>
    }

    // 保存一隐藏nav的标识数据: hide: true
    if(user.type==='laoban') {
      if(path==='/dashen') { // 如果是老板, 请求/dashen, 自动跳转到/laoban
        return <Redirect to='/laoban'/>
      }
      this.navList[1].hide = true
    } else {
      if(path==='/laoban') { // 如果是大神, 请求/laoban, 自动跳转到/dashen
        return <Redirect to='/dashen'/>
      }
      this.navList[0].hide = true
    }



    // 得到当前导航的信息对象
    // find()返回的是第一次回调函数返回true的对应的元素, 如果没有一匹配的, 返回undefined
    const currentNav = this.navList.find((nav, index) => nav.path===path)

    return (
      <div>
        {currentNav ? <NavBar>{currentNav.title}</NavBar> : null}

        <Switch>
          <Route path='/laobaninfo' component={LaobanInfo}/>
          <Route path='/dasheninfo' component={DashenInfo}/>

          <Route path='/laoban' component={Laoban}/>
          <Route path='/dashen' component={Dashen}/>
          <Route path='/message' component={Message}/>
          <Route path='/personal' component={Personal}/>
          <Route component={NotFound}/>
        </Switch>
        {currentNav ? <NavFooter navList={this.navList}/> : null}
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
2. 如果当前已经登陆, 且请求的是根路径 : /
  1). 根据当前用户的相关信息, 自动跳转对应的界面
 */