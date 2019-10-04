var http = require('http')
var fs = require('fs')
var path = require('path')
var mime = require('mime')
var cache = {}

var log = console.log.bind(console)

const send404 = (response) => {
  response.writeHead(404, {'Content-type': 'text/plain'})
  response.write('Error 404: resource not found.')
  response.end()
}

const sendFile = (response, filePath, fileContents) => {
  response.writeHead(
    200,
    {'Content-type': mime.lookup(path.basename(filePath))}
  )
  response.end(fileContents)
}

const serverStatic = (response, cache, absPath) => {
  if (cache[absPath]) {
    sendFile(response, absPath, cache[absPath])
  } else {
    fs.exists(absPath, (exists) => {
      if (exists) {
        fs.readFile(absPath, (err, data) => {
          if (err) {
            send404(response)
          } else {
            cache[absPath] = data
            sendFile(response, absPath, data)
          }
        })
      } else {
        send404(response)
      }
    })
  }
}

const server = http.createServer((request, response) => {
  var filePath = false
  if (request.url == '/') {
    filePath = 'public/index.html'
  } else {
    filePath = `public/${request.url}`
  }
  var absPath = `./${filePath}`
  serverStatic(response, cache, absPath)
})



server.listen(3000, () => {
  log('Server listening on port 3000.')
})


var chatServer = require('./lib/chat_server')
chatServer.listen(server)