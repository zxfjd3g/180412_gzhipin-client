// 引入客户端io
import io from 'socket.io-client'

// 连接服务器, 得到代表连接的socket对象
const socket = io('ws://localhost:4000')

// 绑定'receiveMessage'的监听, 来接收服务器发送的消息
socket.on('receiveMsg', function (data) {
  console.log('浏览器端接收到消息:', data)
})

// 向服务器发送消息
socket.emit('sendMsg', {name: 'Tom', date: Date.now()})
console.log('浏览器端向服务器发送消息:', {name: 'Tom', date: Date.now()})


/*
事件处理
0. 事件分类
  1). 原生DOM事件
  2). 自定义事件

1. 绑定事件监听
  1). 目标
  2). 事件名/类型
  3). 回调函数

2. 触发/分发事件
  1). 事件名
  2). 数据: 传递给监听回调函数
 */
/*
PubSub.subscribe(msgName, function(msgName, data){}): 相当于绑定事件监听
PubSub.publish(msgName, data)

socket.on()
socket.emit()

div.onclick = function (event){}
*/
