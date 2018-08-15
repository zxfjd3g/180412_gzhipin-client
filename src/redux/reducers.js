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
  RECEIVE_USER_LIST
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


export default combineReducers({
  user,
  userList
})
/*
1. 向外暴露是一个整合后的reducer函数: function (state, action)
2. state的结构为: {user: user(), userList: userList()}
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