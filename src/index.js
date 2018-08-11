/*
入口JS
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Switch, Route} from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import Main from './container/main/main'


// 渲染组件标签到页面
ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <Route component={Main}/>
    </Switch>
  </HashRouter>
), document.getElementById('root'))


/*
路由是什么?
  就是一个key:value的映射关系
路由的分类?
  1. 后台路由: path---callback
  2. 前台路由: path---component
作用?
  后台路由: 当服务器接收到请求时, 根据请求的path找到对应的路由, 由路由的回调函数来处理请求, 返回响应
  前台路由: 当请求某个路由地址时, 根据请求的path找到对应的路由, 显示路由对应的组件界面
 */


