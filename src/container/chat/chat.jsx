/*
对话聊天的路由组件
 */

import React, {Component} from 'react'
import {NavBar, List, InputItem} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends Component {

  state = {
    content: ''
  }

  send = () => {

    // 内容
    const {content} = this.state

    if(!content.trim()) {
      return
    }
    // 当前用户id: from
    const from = this.props.user._id
    // 目标用户的id: to
    const to = this.props.match.params.userid
    this.props.sendMsg({content, from, to})
    // 清空输入
    this.setState({content: ''})
  }

  render() {
    const {user} = this.props
    const meId = user._id  // 我的id
    const targetId = this.props.match.params.userid // 目标用户id
    const chatId = [meId, targetId].sort().join('_') // 当前聊天的ID
    const {users, chatMsgs} = this.props.chat
    // users数据还没有获取到, 只能显示loading
    if(!users[meId]) {
      return <div>Loading...</div>
    }

    // 从chatMsgs中过滤出我与当前目标用户的聊天
    const msgs = chatMsgs.filter(msg => msg.chat_id===chatId)

    // 目标用户的头像图片对象
    const targetIcon = require(`../../assets/images/${users[targetId].header}.png`)

    return (
      <div id='chat-page'>
        <NavBar>{users[targetId].username}</NavBar>
        <List>
          {
            msgs.map((msg, index) => {
              if(msg.to===meId) { // 别人发给我的
                return (
                  <Item
                    key={msg._id}
                    thumb={targetIcon}
                  >
                    {msg.content}
                  </Item>
                )
              } else { // 我发给别人的
                return (
                  <Item
                    key={msg._id}
                    className='chat-me'
                    extra='我'
                  >
                    {msg.content}
                  </Item>
                )
              }
            })
          }
        </List>

        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            onChange={val => {this.setState({content: val})}}
            value={this.state.content}
            extra={
              <span onClick={this.send}>发送</span>
            }
          />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {sendMsg}
)(Chat)