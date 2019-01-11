var log = console.log.bind(console)
// var _ = require('./lodash.js')

var data = [
    {
        name: "a",
        value: 30,
    },
]

// _.groupBy(data, function(item){
//     return item.age > 20 ? 'old' : 'young';
// })
// var res = _.groupBy(data, 'name')
// log(res)

var res = JSON.stringify(data, null, 4)
// var res = JSON.stringify(data)
// log(res)
