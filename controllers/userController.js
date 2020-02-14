/*
//we can write like this or exports.login = function() {...}... and then write module.exports
module.exports = {
    login: function() {},
    logout: function() {}
}
*/

// ../ this sign mean we move up to one folder
const User = require('../models/User')

exports.login = function(req, res) {
    let user = new User(req.body)
    //we don't know how long this login() will take, 
    //because it's working with database
    //so we have to wait until login have the chance to do its job 
    //and then send back a respond back to the browser
    //so we use the traditional function, it is callback. 
    //so we provide function as an argument
    //There are many other way beside using callback function
    user.login(function(result) {
        res.send(result)
    })
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
    //res.send("Thank for trying to register")
    if (user.errors.length) {
        res.send(user.errors)
    }else {
        res.send("Congrats, there are no errors.")
    }
}

exports.home = function(req, res) {
    res.render('home-guest')
}