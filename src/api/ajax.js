/*
使用axios封装ajax请求的函数模块
函数的返回值是promise
 */
import axios from 'axios'

export default function ajax(url, data={}, type='GET') {
  // get请求
  if(type==='GET') {
    // 根据data来拼query参数串
    let queryStr = ''
    //Object.keys(data) : 得到指定对象自身所有属性名组成的数组   ['username', 'password']
    Object.keys(data).forEach(key => {
      const value = data[key]
      queryStr += `${key}=${value}&`
    })
    if(queryStr) {// 有参数   username=tom&password=123&
      queryStr = queryStr.substring(0, queryStr.length-1)  // username=tom&password=123
      url += '?' + queryStr  // /login?username=tom&password=123
    }
    return axios.get(url)
  } else {// post请求
    return axios.post(url, data)
  }
}