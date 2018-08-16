/*
包含n个接口请求函数的对象模块
每个函数的返回值是promise
 */

import ajax from './ajax'
// const BASE = 'http://localhost:4000'
const BASE = ''

// ## 1、注册
/*export function reqRegister({username, password, type}) {
  return ajax('/register', {username, password, type}, 'POST')
}*/
export const reqRegister = ({username, password, type}) => ajax(BASE+'/register', {username, password, type}, 'POST')

// ## 2、登陆
export const reqLogin = (username, password) => ajax(BASE+'/login', {username, password}, 'POST')

// ## 3. 更新用户信息
export const reqUpdateUser = (user) => ajax(BASE+'/update', user, 'POST')

// ## 3. 获取当前用户信息
export const reqUser = () => ajax(BASE+'/user')

// ## 4. 获取指定类型的用户列表
export const reqUserList = (type) => ajax(BASE+'/userlist', {type})