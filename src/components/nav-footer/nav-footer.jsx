import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

/*
主界面的底部导航
 */
class NavFooter extends Component {

  static propTypes = {
    navList: PropTypes.array.isRequired
  }

  render () {
    // 得到当前请求的path
    const path = this.props.location.pathname
    const navList = this.props.navList.filter(nav => !nav.hide)  // 过滤掉hide为true的nav

    return (
      <TabBar>
        {
          navList.map((nav, index) => (
            <TabBar.Item key={index}
                         icon={{uri: require(`./images/${nav.icon}.png`)}}
                         selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                         title={nav.title}
                         onPress={() =>{this.props.history.replace(nav.path)}}
                         selected={path===nav.path}
            />
          ))
        }

      </TabBar>
    )
  }
}


// 问题: 非路由组件如何能使用路由的API?
// 解决: 使用withRouter包装组件
// 向外暴露包装后的组件
// 向NavFooter传入3个路由属性: history/location/match
export default withRouter(NavFooter)