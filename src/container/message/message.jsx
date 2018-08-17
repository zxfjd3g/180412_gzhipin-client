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
  2. 遍历chatMsgs, 取出msg, 并判断msg是否是所属分组最后一条, 如果是保存到lastMsgObjs中
  3. 得到lastMsgObjs的所有value组成的数组(lastMsgs)
  4. 对lastMsgs数组进行排序
   */
  getLastMsgs = (chatMsgs, meId) => {
    // 1. 创建一个对象容器(lastMsgObjs): 用来存储每个分组的lastMsg, key是chat_id, value是msg
    const lastMsgObjs = {}

    // 2. 遍历chatMsgs, 取出msg, 并判断msg是否是所属分组最后一条, 如果是保存到lastMsgObjs中
    chatMsgs.forEach(msg => {

      // 未读消息: !msg.read && msg.to===meId
      // 对当前msg进行统计
      if(!msg.read && msg.to===meId) {
        msg.unReadCount = 1
      } else {
        msg.unReadCount = 0
      }

      const chatId = msg.chat_id
      // 获取当前组的lastMsg
      const lastMsg = lastMsgObjs[chatId]
      if(!lastMsg) {// 当前msg就是所属组的lastMsg
        lastMsgObjs[chatId] = msg

      } else {// 有同组2条msg, 只有当当前msg更晚, 保存当前msg

        // 在确定lastMsg之前: 统计新的unReadCount
        const unReadCount = msg.unReadCount + lastMsg.unReadCount

        if(msg.create_time>lastMsg.create_time) {
          lastMsgObjs[chatId] = msg
        }

        // 已经确定了lastMsg: 给当前组lastMsg指定unReadCount
        lastMsgObjs[chatId].unReadCount = unReadCount
      }
    })

    // 3. 得到lastMsgObjs的所有value组成的数组(lastMsgs)
    const lastMsgs = Object.values(lastMsgObjs)

    // 4. 对lastMsgs数组进行排序
    lastMsgs.sort((msg1, msg2) => { // 如果结果大于0, 后面的排到前面去
      return msg2.create_time - msg1.create_time  // 降序
      // return msg1.create_time - msg2.create_time // 升序
    })

    return lastMsgs
  }

  render() {
    const {user} = this.props
    const meId = user._id
    const {users, chatMsgs} = this.props.chat

    const lastMsgs = this.getLastMsgs(chatMsgs, meId)

    return (
      <List style={{marginTop: 50, marginBottom: 50}}>
        {
          lastMsgs.map(msg => {
            // 得到目标用户的id
            const targetId =  meId===msg.from ? msg.to : msg.from
            // 得到目标用户的信息
            const targetUser = users[targetId]

            return (
              <Item
                key={msg._id}
                extra={<Badge text={msg.unReadCount}/>}
                thumb={require(`../../assets/images/${targetUser.header}.png`)}
                arrow='horizontal'
                onClick={() => this.props.history.push(`/chat/${targetId}`)}
              >
                {msg.content}
                <Brief>{targetUser.username}</Brief>
              </Item>
            )
          })
        }
      </List>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {}
)(Message)