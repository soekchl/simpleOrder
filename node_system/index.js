
const fileServer=require('node-http-server');
const server = require('http').createServer();
const io = require('socket.io')(server, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 50, // 检测时间
  pingTimeout: 3000, // 超时时间
  cookie: false
});


let socketList = [] // websocket 列表
let selectId = [] // 选择id列表
let online = 0;

fileServer.deploy({
  port : 80,
  root : './www/',
  server : {
    index : '/test.html' // 默认打开
  }
})

server.listen(81);
console.log('已启动 http://localhost:81')

io.on('connection', (socket) => {
  online++
  console.log('new -> ', socket.id, ' online =',online)
  socket.emit('who', { name: '小白',online : online })

  socket.on('who', (data) => {
    console.log('who->', data)
    socketList[socket.id] = socket
    socket.emit('init_data', selectId) // 发送初始数据
  })

  socket.on('select', (data) => {
    console.log(data)
    // ctx.socket.emit('select', data)
    let item = selectId[data.id]
    if (item && item.length > 0) {
      // 清空
      data.name = ''
      selectId[data.id] = null
    } else {
      selectId[data.id] = data.name
      // 增加
    }
    sendAllToDate(data)
  })

  socket.on('disconnect', (data) => {
    online--
    console.log('disconnect->', socket.id, ' online =',online)
    delete socketList[socket.id]
  })
})


function sendAllToDate (data) {
  for (let i in socketList) {
    console.log('for->',i)
    if (i !== 'copy' && i !== 'unique') {
      const item = socketList[i]
      data.online = online
      item.emit('select', data)
    }
  }
}