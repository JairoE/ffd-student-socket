//Redis
const redis = require('redis')
const redisConn = redis.createClient();

//WSS

function writeTile(obj) {
  redisConn.set(`${obj.x}-${obj.y}`, obj.color)
}

function writeBoard(arr) {
  arr.forEach(tile => {
    writeTile(tile)
  })
}

function handleMsg(msg) {
  const action = msg.data.action
  const action = msg.data.payload
  dispatch[action](payload)
}

function requestBoard(ws) {
  ws.send(JSON.stringify({action: "getBoard", payload: null}))
}

const dispatch = {
  "board": writeBoard,
  "tile": writeTile,
}

const wsConn = new WebSocket("ws://localhost:8080")
wsConn.addEventListener('open', () => requestBoard(wsConn))
wsConn.addEventListener('message', (msg) => handleMsg(msg))
wsConn.addEventListener('close', () => console.log('ws closed'))
