var fa = (function f(num) {
    if (num <= 1) {
        return 1
    } else {
        return num * f(num - 1)
    }
})

var log = console.log.bind(console)

// log(fa(3))
var singleton = function() {
    var privateVariable = 10
    function privateFunction() {
        return false
    }

    return {
        publicProperty: true,
        publicMethod: function() {
            privateVariable++
            log('privateVariable-->', privateVariable)
            return privateFunction()
            // return privateVariable
        }
    }
}()

var bb = function() {
    var i = 2
    var c = function() {
        i++
        return i
    }
    return c
}
//闭包复习
