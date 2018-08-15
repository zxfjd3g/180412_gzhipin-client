import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getUserList} from '../../redux/actions'

import UserList from '../../components/user-list/user-list'

class Laoban extends Component {

  componentDidMount () {
    // 分发异步action, 获取指定类型的用户列表
    this.props.getUserList('dashen')
  }

  render () {
    return (
      <UserList userList={this.props.userList}/>
    )
  }
}

export default connect(
  state => ({userList: state.userList}),
  {getUserList}
)(Laoban)