/*
包含n个action的模块(本质是创建action的action creator)
1. 同步action
2. 异步action
 */
// 引入客户端io
import io from 'socket.io-client'

import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqMsgList,
  reqReadMsg
} from '../api'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RESET_USER,
  RECEIVE_USER,
  RECEIVE_USER_LIST,
  RECEIVE_CHAT_MSGS,
  RECEIVE_CHAT_MSG
} from './action-types'   // 有几个type就会有几个同步action

// 注册/登陆成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
// 显示错误信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
// 接收用户信息的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
// 重置用户信息
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
// 接收用户列表的同步action
const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})

// 接收消息列表的同步action
const receiveChatMsgs = ({users, chatMsgs}) => ({type: RECEIVE_CHAT_MSGS, data: {users, chatMsgs}})
// 接收一个消息的同步action
const receiveChatMsg = (chatMsg) => ({type: RECEIVE_CHAT_MSG, data: chatMsg})

/*
注册的异步action
 */
export function register({username, password,password2, type}) {
  // 进行前台表单验证
  if(!username) {
    return errorMsg('用户名必须指定')
  } else if(!password) {
    return errorMsg('密码必须指定')
  } else if(password2!==password) {
    return errorMsg('2次密码必须一致')
  } else if(!type) {
    return errorMsg('类型必须指定')
  }

  return async dispatch => {

    // 执行异步(发送ajax请求)
    const response = await reqRegister({username, password, type})
    // 异步得到结果,
    const result = response.data // {code: 0, data: user} | {code: 1, msg: 'xxx'}
    if(result.code===0) { // 成功
      const user = result.data
      // 异步获取消息列表
      getChatMsgs(dispatch, user._id)
      // 分发同步action(成功)
      debugger
      dispatch(authSuccess(user))
    } else { // 失败
      // 分发同步action(成功)
      const msg = result.msg
      dispatch(errorMsg(msg))
    }
  }
}

/*
登陆的异步action
 */
export function login({username, password}) {
  return async dispatch => {
    // 进行前台表单验证
    if(!username) {
      return dispatch(errorMsg('用户名必须指定'))
    } else if(!password) {
      return dispatch(errorMsg('密码必须指定'))
    }

    const response = await reqLogin(username, password)
    const result = response.data // {code: 0, data: user} | {code: 1, msg: 'xxx'}
    if(result.code===0) { // 成功
      // 异步获取消息列表
      const user = result.data
      // 异步获取消息列表
      getChatMsgs(dispatch, user._id)
      // 分发同步action(成功)
      dispatch(authSuccess(user))
    } else { // 失败
      // 分发同步action(成功)
      const msg = result.msg
      dispatch(errorMsg(msg))
    }
  }
}

/*
完善更新用户信息
 */
export function updateUser (user) {
  return async dispatch => {
    // 1. 发送异步ajax请求
    const response = await reqUpdateUser(user)
    const result = response.data
    // 2. 根据结果分发同步action
    if(result.code===0) {
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}

/*
异步获取户信息
 */
export function getUser () {
  return async dispatch => {
    // 1. 发送异步ajax请求
    const response = await reqUser()
    const result = response.data
    // 2. 根据结果分发同步action
    if(result.code===0) {
      const user = result.data
      // 异步获取消息列表
      getChatMsgs(dispatch, user._id)
      dispatch(receiveUser(user))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}

/*
获取指定类型用户列表的异步action
 */
export function getUserList(type) {
  return async dispatch => {
    const response = await reqUserList(type)
    const result = response.data
    if(result.code===0) {
      const userList = result.data
      dispatch(receiveUserList(userList))
    }
  }
}

/*
初始化客户端的socketIO
只有当登陆成功后才能调用
只用执行一次
 */
function initSocketIO(dispatch, meId) {

  /*
      单例对象: 只有一个实例(socket)
      1. 创建对象前: 判断对象不存在
      2. 创建对象后: 保存对象
   */

  if(!io.socket) {
    // 连接服务器, 得到代表连接的socket对象
    io.socket = io('ws://localhost:4000')
    // 接收服务器发送过来的消息
    io.socket.on('recieveMsg', (chatMsg) => {
      console.log('浏览器接收到服务发送的消息', chatMsg)

      // 只有当是我发的或者是发给我的消息, 分发一个接收chatMsg的同步action
      if(chatMsg.from===meId || chatMsg.to===meId) {
        dispatch(receiveChatMsg(chatMsg))
      }
    })
  }


}

/*
发聊天消息的异步action
 */
export function sendMsg({content, from, to}) {
  return dispatch => {
    // 浏览器向服务器发消息
    io.socket.emit('sendMsg', {content, from, to})
    console.log('浏览器向服务器发消息', {content, from, to})
  }
}

/*
异步获取消息列表
要求: 必须在登陆成功后才能执行
 */
async function getChatMsgs(dispatch, meId) {
  initSocketIO(dispatch, meId)
  const response = await reqMsgList()
  const result = response.data
  if(result.code===0) {
    const {users, chatMsgs} = result.data
    dispatch(receiveChatMsgs({users, chatMsgs}))
  }
}



/*
async/await?
1. 作用?
    简化pormise的使用(不用再使用then()来指定成功或失败的回调函数)
    以同步编码的方式实现异步流程(没有回调函数)
2. 哪里使用await?(在某条语句的左侧加)
    返回promise对象的语句, 为了直接得到异步返回的结果, 而不是promsie对象
3. 哪里使用async? (在某个函数定义左侧)
    使用了await的函数
 */