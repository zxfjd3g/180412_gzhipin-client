/*
对话聊天的路由组件
 */

import React, {Component} from 'react'
import {NavBar, List, InputItem, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg, readMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends Component {

  state = {
    content: '',
    isShow: false, // 是否显示表情列表
  }


  // 在第一次render()之前调用
  componentWillMount () {
    const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
    this.emojis = []
    emojis.forEach(emoji => {
      this.emojis.push({
        text: emoji
      })
    })
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
    this.setState({content: '', isShow: false})
  }

  // 初始化显示滚动到底部
  componentDidMount() {
    // 初始显示列表
    window.scrollTo(0, document.body.scrollHeight)
  }

  // 在退出当前组件界面前
  componentWillUnmount() {
    // 更新未读消息为已读
    // 当前用户id: from
    const meId = this.props.user._id
    // 目标用户的id: to
    const targetId = this.props.match.params.userid
    this.props.readMsg(targetId, meId)
  }

  // 更新显示时滚动到底部
  componentDidUpdate () {
    // 更新显示列表
    window.scrollTo(0, document.body.scrollHeight)
  }

  toggleEmojis = () => {
    const isShow = !this.state.isShow
    this.setState({isShow})
    if(isShow) {
      // 异步手动派发resize事件,解决表情列表显示的bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
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
        <NavBar
          className='fix-top'
          icon={<Icon type='left'/>}
          onLeftClick={() => this.props.history.goBack()}
        >
          {users[targetId].username}
        </NavBar>

        <List style={{marginBottom: 50, marginTop: 50}}>
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
            onFocus={() => this.setState({isShow: false})}
            value={this.state.content}
            extra={
              <span>
                <span onClick={this.toggleEmojis}>😊</span>
                <span onClick={this.send}>发送</span>
              </span>
            }
          />
          {
            this.state.isShow
              ? (
                  <Grid
                    data={this.emojis}
                    columnNum={8}
                    carouselMaxRow={4}
                    isCarousel={true}
                    onClick={(item) => {
                      this.setState({content: this.state.content + item.text})
                    }}
                  />
                )
              : null
          }

        </div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {sendMsg, readMsg}
)(Chat)