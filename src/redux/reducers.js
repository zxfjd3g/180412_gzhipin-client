/*
包含n个reducer函数的模块
 */
import {combineReducers} from 'redux'
import {getRedirectPath} from '../utils'
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RESET_USER,
  RECEIVE_USER,
  RECEIVE_USER_LIST,
  RECEIVE_CHAT_MSGS,
  RECEIVE_CHAT_MSG
} from './action-types'

const initUser = {
  username: '',
  type: '',
  msg: '', // 错误提示信息
  redirectTo: '', // 需要自动跳转的路径
}
function user (state=initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      debugger
      const user = action.data
      return {...user, redirectTo:getRedirectPath(user.type, user.header)}
    case ERROR_MSG:
      const msg = action.data
      return {...state, msg}
    case RECEIVE_USER:
      return action.data
    case RESET_USER:
      return {...initUser, msg: action.data}
    default:
      return state
  }
}

const initUserList = []
function userList(state=initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data
    default:
      return state
  }
}

const initChat = {
  users: {}, // 所有用户信息对象的对象容器: key是user的_id, value是{username, header}
  chatMsgs: [], // 当前用户相关的所有chatMsg的数组
  unReadCount: 0, // 总的未读数量
}
function chat(state=initChat, action) {

  switch (action.type) {
    case RECEIVE_CHAT_MSGS:
      const {users, chatMsgs} = action.data
      return {
        users,
        chatMsgs,
        unReadCount: 0,
      }
    case RECEIVE_CHAT_MSG:
      const chatMsg = action.data

      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
        unReadCount: 0,
      }
    default:
      return state
  }
}


export default combineReducers({
  user,
  userList,
  chat
})
/*
1. 向外暴露是一个整合后的reducer函数: function (state, action)
2. state的结构为: {user: user(), userList: userList(), chat: chat()}
 */


/*
... 三点运算符
作用: 打包/解包
1. 打包: 将多个数据包装到一个容器(数组/对象)中
    function fn (...args) {// args是数组

    }
    fn(1, 3)  args是: [1, 3]
    fn(1, 3, 5)  args是: [1, 3, 5]
2. 解包: 将容器中的多个数据拆解出来
    1). 解包数组
       const arr1 = [1, 3, 5]
       const arr2 = [8, ...arr1 ,10]
    2). 解包对象
      const obj1 = {a: 1, b: 'xxx'}
      const obj2 = {c: true, ...obj1}
    3. 解包对象(组件属性)
      const props = {a: 1, b: true}
      <MyComp {...props}>
 */