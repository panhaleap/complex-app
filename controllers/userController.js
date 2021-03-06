/*
//we can write like this or exports.login = function() {...}... and then write module.exports
module.exports = {
    login: function() {},
    logout: function() {}
}
*/

// ../ this sign mean we move up to one upper level folder
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
         req.session.user = {avatar: user.avatar, username: user.data.username}

         //if we restart our server, the session will be cleared
        //so instead of storing session data in memory, we store it in mongoDB
        //so we use npm install connect-mongo
        // res.send(result)
        req.session.save(function() {
            res.redirect('/')
        })
    }).catch(function(e) {
        // res.send(err)
        // first agurment is collection
        req.flash('errors', e)
        // res.redirect('/')
        req.session.save(function() {
            res.redirect('/')
        })
    })
}

exports.logout = function(req, res) {
    // if the current incoming request from a browser has a cookie with a valid or a matching
    // session id, so this is going to find session in Database and destroy that session.
    req.session.destroy(function() {
        res.redirect('/')
    })
    // res.send("You are now logged out.")
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

    user.register().then(() => {
        req.session.user = {username: user.data.username, avatar: user.avatar}
        req.session.save(function() {
            res.redirect('/')
        })
    }).catch((regErrors) => {
        // res.send(user.errors)
        regErrors.forEach(function(error) {
            // we add error to collection regErrors
            req.flash('regErrors', error)
        })
        req.session.save(function() {
            res.redirect('/')
        })
    })
    //res.send("Thank for trying to register")
    
}

// exports.home = function(req, res) {
//     res.render('home-guest')
// }

exports.home = function(req, res) {
    if (req.session.user) {
        // res.send("Welcome to the actual application!!!")
        console.log(req.session.user.avatar);
        
        res.render('home-dashboard', {username: req.session.user.username, avatar: req.session.user.avatar})
    } else {
        res.render('home-guest', {errors: req.flash('errors'), regErrors: req.flash('regErrors')})
    }
}