var log = console.log.bind(console)
var _ = require('./lodash.js')

var data = [
    {
        name: "a",
        value: 30,
    },
    {
        name: "a",
        value: 40,
    },
    {
        name: "b",
        value: 20,
    },
    {
        name: "b",
        value: 11,
    },
    {
        name: "b",
        value: 14,
    },
]

// _.groupBy(data, function(item){
//     return item.age > 20 ? 'old' : 'young';
// })
var res = _.groupBy(data, 'name')
log(res)
