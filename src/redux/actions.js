/*
包含n个action的模块(本质是创建action的action creator)
1. 同步action
2. 异步action
 */
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList
} from '../api'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RESET_USER,
  RECEIVE_USER,
  RECEIVE_USER_LIST
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
      // 分发同步action(成功)
      const user = result.data
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
      // 分发同步action(成功)
      const user = result.data
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
      dispatch(receiveUser(result.data))
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
async/await?
1. 作用?
    简化pormise的使用(不用再使用then()来指定成功或失败的回调函数)
    以同步编码的方式实现异步流程(没有回调函数)
2. 哪里使用await?(在某条语句的左侧加)
    返回promise对象的语句, 为了直接得到异步返回的结果, 而不是promsie对象
3. 哪里使用async? (在某个函数定义左侧)
    使用了await的函数
 */