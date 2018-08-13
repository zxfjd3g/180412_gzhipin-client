/*
包含n个reducer函数的模块
 */
import {combineReducers} from 'redux'

import {
  AUTH_SUCCESS,
  ERROR_MSG
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
      const user = action.data
      return {...user, redirectTo:'/'}
    case ERROR_MSG:
      const msg = action.data
      return {...state, msg}
    default:
      return state
  }
}


export default combineReducers({
  user
})
/*
1. 向外暴露是一个整合后的reducer函数: function (state, action)
2. state的结构为: {user: user()}
 */