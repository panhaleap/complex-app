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
    /*
    user.login(function(result) {
        res.send(result)
    })
    */
   //Now we use promise instead of callback function
   /*
   user.login(function(result) {
    res.send(result)
  })
  */

    //then: mean say what we want to do if the promise run successfully. Mean our promise call Resolve instead of Reject
    //catch: mean say what we want to do if the promise fail
    user.login().then(function(result) {
        //we just add session.user to req
        //this session is uniqe per browser visitor
        //when we write this here, there're 2 things happen. 
        //#1 server is going to store this session data in memory
        //#2 session package sends the instruction to the web browser to create the cookies.

        //if we restart our server, the session will be cleared
        //so instead of storing session data in memory, we store it in mongoDB
         req.session.user = {favColor: "blue", username: user.data.username}
        res.send(result)
    }).catch(function(err) {
        res.send(err)
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

// exports.home = function(req, res) {
//     res.render('home-guest')
// }

exports.home = function(req, res) {
    if (req.session.user) {
        res.send("Welcome to the actual application!!!")
    } else {
        res.render('home-guest')
    }
}