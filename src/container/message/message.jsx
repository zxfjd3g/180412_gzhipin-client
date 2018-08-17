import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief
/*
消息列表组件
 */
class Message extends Component {

  /*
  从chatMsgs中找出每个聊天中的最后一个msg组成的数组
  1. 创建一个对象容器(lastMsgObjs): 用来存储每个分组的lastMsg, key是chat_id, value是msg
  2. 遍历chatMsgs, 取出msg, 并判断msg是否是所属分组最后一条, 如果是保存到chatMsgObjs中
  3. 得到lastMsgObjs的所有value组成的数组(lastMsgs)
  4. 对lastMsgs数组进行排序
   */
  getLastMsgs = (chatMsgs) => {
    // 1. 创建一个对象容器(lastMsgObjs): 用来存储每个分组的lastMsg, key是chat_id, value是msg
    const lastMsgObjs = {}

    // 2. 遍历chatMsgs, 取出msg, 并判断msg是否是所属分组最后一条, 如果是保存到lastMsgObjs中
    chatMsgs.forEach(msg => {
      const chatId = msg.chat_id
      // 获取当前组的lastMsg
      const lastMsg = lastMsgObjs[chatId]
      if(!lastMsg) {// 当前msg就是所属组的lastMsg
        lastMsgObjs[chatId] = msg
      } else {// 有同组2条msg, 只有当当前msg更晚, 保存当前msg
        if(msg.create_time>lastMsg.create_time) {
          lastMsgObjs[chatId] = msg
        }
      }
    })

    // 3. 得到lastMsgObjs的所有value组成的数组(lastMsgs)
    const lastMsgs = Object.values(lastMsgObjs)

    // 4. 对lastMsgs数组进行排序
    lastMsgs.sort((msg1, msg2) => { // 如果结果大于0, 后面的排到前面去
      return msg2.create_time - msg1.create_time  // 降序
      // return msg1.create_time - msg2.create_time // 升序
    })
  }

  render() {
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat

    const lastMsgs = this.getLastMsgs(chatMsgs)

    return (
      <List style={{marginTop: 50, marginBottom: 50}}>
        <Item
          extra={<Badge text={3}/>}
          thumb={require(`../../assets/images/头像1.png`)}
          arrow='horizontal'
        >
          你好
          <Brief>nr1</Brief>
        </Item>
        <Item
          extra={<Badge text={0}/>}
          thumb={require(`../../assets/images/头像2.png`)}
          arrow='horizontal'
        >
          你好2
          <Brief>nr2</Brief>
        </Item>
      </List>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {}
)(Message)