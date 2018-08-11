/*
包含n个reducer函数的模块
 */
import {combineReducers} from 'redux'

// 管理xxx状态的reducer
const initXxx = []
function xxx(state = initXxx, action) {
  console.log('xxx()', action)
  switch (action.type) {

    default:
      return state
  }
}

const initYyy = {}
function yyy(state = initYyy, action) {
  console.log('yyy()', action)
  switch (action.type) {

    default:
      return state
  }
}

export default combineReducers({
  xxx,
  yyy
})
/*
1. 向外暴露是一个整合后的reducer函数: function (state, action)
2. state的结构为: {xxx: xxx(), yyy: yyy()}
 */