var fs = require('fs')
fs.readFile('./resource/resource.json', 'utf-8', function(err, data) {
    console.log('data, ', data)
})

// var a = require('./resource/resource.json')
// console.log('a', a)