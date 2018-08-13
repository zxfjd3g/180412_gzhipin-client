/*
包含n个action的模块(本质是创建action的action creator)
1. 同步action
2. 异步action
 */
import {
  reqRegister,
  reqLogin
} from '../api'

import {
  AUTH_SUCCESS,
  ERROR_MSG
} from './action-types'   // 有几个type就会有几个同步action

// 注册/登陆成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
// 显示错误信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})


/*
注册的异步action
 */
export function register({username, password, type}) {
  return dispatch => {
    // 执行异步(发送ajax请求)
    reqRegister({username, password, type}).then(response => {
      // 异步得到结果,
      const result = response.data // {code: 0, data: user} | {code: 1, msg: 'xxx'}
      if(result.code===0) { // 成功
        // 分发同步action(成功)
        const user = result.data
        dispatch(authSuccess(user))
      } else { // 失败
        // 分发同步action(成功)
        const msg = result.msg
        dispatch(errorMsg(msg))
      }
    })
  }
}

/*
登陆的异步action
 */
export function login({username, password}) {
  return dispatch => {
    // 执行异步(发送ajax请求)
    reqLogin(username, password).then(response => {
      // 异步得到结果,
      const result = response.data // {code: 0, data: user} | {code: 1, msg: 'xxx'}
      if(result.code===0) { // 成功
        // 分发同步action(成功)
        const user = result.data
        dispatch(authSuccess(user))
      } else { // 失败
        // 分发同步action(成功)
        const msg = result.msg
        dispatch(errorMsg(msg))
      }
    })
  }
}