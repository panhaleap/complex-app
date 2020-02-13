/*
//we can write like this or exports.login = function() {...}... and then write module.exports
module.exports = {
    login: function() {},
    logout: function() {}
}
*/

// ../ this sign mean we move up to one folder
const User = require('../models/User')

exports.login = function() {

}

exports.logout = function() {
    
}

exports.register = function(req, res) {
    //console.log(req.body)

    //new User() will create new object of User
    //Explain about keyword this: in here keyword new is gonna create new blank User object
    //and then it's gonna call homePlanet. So what call the homePlanet, it is new User().
    //so when we refer to this.homePlanet, 'this' refers to current object of User
    let user = new User(req.body)
    //user.homePlanet
    //user.jump()

    user.register()
    res.send("Thank for trying to register")
}

exports.home = function(req, res) {
    res.render('home-guest')
}