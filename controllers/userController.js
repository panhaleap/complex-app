/*
//we can write like this or exports.login = function() {...}... and then write module.exports
module.exports = {
    login: function() {},
    logout: function() {}
}
*/

exports.login = function() {

}

exports.logout = function() {
    
}

exports.register = function(req, res) {
    res.send("Thank for trying to register")
}

exports.home = function(req, res) {
    res.render('home-guest')
}