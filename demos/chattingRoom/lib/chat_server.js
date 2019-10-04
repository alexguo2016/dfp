
var socketio = require('socket.io')
var io
var guestNumber = 1
var nickNames = {}
var namesUsed = []
var currentRoom = {}

exports.listen = (server) => {
  io = socketio.listen(server)
  io.set('log level', 1)
  io.sockets.on('connection', (socket) => {
    guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed)
    joinRoom(socket, 'Lobby')
    handleMessageBroadcasting(socket, nickNames)
    handleNameChangeAttempts(socket, nickNames, namesUsed)
    handleRoomJoining(socket)
    socket.on('rooms', () => {
      socket.emit('rooms', io.sockets.manager.rooms)
    })
    handleclientDisconnection(socket, nickNames, namesUsed)
  })
}

const assignGuestName = (socket, guestNumber, nickNames, namesUsed) => {
  var name = `Guest${guestNumber}`
  nickNames[socket.id] = name
  socket.emit('nameResult', {
    success: true,
    name: name
  })
  namesUsed.push(name)
  return guestNumber + 1
}

const joinRoom = (socket, room='Lobby') => {
  socket.join(room)
  currentRoom[socket.id] = room
  socket.emit('joinResult', {room: room})
  socket.broadcast.to(room).emit('message', {
    text: nickNames[socket.id] + ' has joined ' + room + '.'
  })
  var usersInRoom = io.sockets.clients(room)
  if (usersInRoom.length > 1) {
    var usersInRoomSummary = `Users currently in ${room} : `
    for(var i in usersInRoom) {
      var userSocketId = usersInRoom[i].id
      if (userSocketId != socket.id) {
        if (i > 0) {
          usersInRoomSummary += ', '
        }
      }
      usersInRoomSummary += nickNames[userSocketId]
    }
  }
  usersInRoomSummary += '.'
  socket.emit('message', {text: usersInRoomSummary})
}
