//using hash password
const bcrypt = require("bcryptjs")
const userCollection = require('../db').collection("users")
const validator = require("validator")

//this is constructor of User
let User = function(data) {
    // keyword this is point to what is calling or executing the function
    //So when object which use new User(), will get homePlanet as property
    //this.homePlanet = "earth"

    this.data = data
    this.errors = []
}

User.prototype.cleanUp = function() {
    if (typeof(this.data.username) != "string") {this.data.username = ""}
    if (typeof(this.data.email) != "string") {this.data.email = ""}
    if (typeof(this.data.password) != "string") {this.data.password = ""}

    // get rid of any bogus properties
    //this we cleanup data properties, and this.data must get only these 3 only
    this.data = {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password
    }
}

//Using this function, 
//javaScript doesn't have to copy jump function for each object of User.
//Simply, object of user will can access to this jump function.
//So even we create 100 object of User, 
//javaScript is not going to duplicate the jump function
/*
User.prototype.jump = function() {
    
}
*/

User.prototype.validate = function() {
    if (this.data.username == "") {this.errors.push("You must provide a username.")}
    //validator.isAlphanumeric(this.data.username): is true when user not input any special charactors like [, $%*^%#$...
    //By installing npm install validator, we can use validator
    if(this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {this.errors.push("Username can only contain letters and numbers.")}

    //if (this.data.email == "") {this.errors.push("You must provide a valid email address.")}
    if (!validator.isEmail(this.data.email)) {this.errors.push("You must provide a valid email address.")}
    if (this.data.password == "") {this.errors.push("You must provide a password.")}
    
    if (this.data.password.length > 0 && this.data.password.length < 12) {this.errors.push("Password must be at least 12 characters.")}
    // if (this.data.password.length > 100) {this.errors.push("Password can not exceed 100 characters.")}
    if (this.data.password.length > 50) {this.errors.push("Password can not exceed 50 characters.")}
    if (this.data.username.length > 0 && this.data.password.length < 3) {this.errors.push("Username must be at least 3 characters.")}
    if (this.data.username.length > 30) {this.errors.push("username can not exceed 30 characters.")}
}

/*
User.prototype.login = function(callback) {
    this.cleanUp()
    //if we can find document with this.data.username, and it will provide that document as second param (attemptedUser)
    userCollection.findOne({username: this.data.username}, (err, attemptedUser) => {
        if (attemptedUser && attemptedUser.password == this.data.password) {
            //console.log("Congrates!!!!!!!")
            callback("Congrats!")
        } else {
            //console.log("Invalid username / password")
            callback("Invalid username / password")
        }
    })
}
*/
/*
User.prototype.login = function() {
    return new Promise((resolve, reject) => {
        //this is asynchronous operation
        this.cleanUp()
        //if we can find document with this.data.username, and it will provide that document as second param (attemptedUser)
        userCollection.findOne({username: this.data.username}, (err, attemptedUser) => {
            if (attemptedUser && attemptedUser.password == this.data.password) {
                //console.log("Congrates!!!!!!!")
                // callback("Congrats!")
                resolve("Congrats!")
            } else {
                //console.log("Invalid username / password")
                //callback("Invalid username / password")
                reject("Invalid username / password")
            }
        })
    })
}
*/

User.prototype.login = function() {
    return new Promise((resolve, reject) => {
        //this is asynchronous operation
        this.cleanUp()
        //if we can find document with this.data.username, and it will provide that document as second param (attemptedUser)
        //becasue findOne(...) is a method of mongoDB which return a promise 
        userCollection.findOne({username: this.data.username}).then((attemptedUser) =>{
            // if (attemptedUser && attemptedUser.password == this.data.password) {
            //bcrypt.compareSync(a, b): a is password input by user, b is password hash value from DataBase
            if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
                //console.log("Congrates!!!!!!!")
                // callback("Congrats!")
                resolve("Congrats!")
            } else {
                //console.log("Invalid username / password")
                //callback("Invalid username / password")
                reject("Invalid username / password.")
            }
        }).catch(function() {
            //system error, our develper side error
            reject("Please try again later.")
        })
    })
}

User.prototype.register = function() {
    //Step #1: Validate user data
    this.cleanUp()
    this.validate()

    //Step #2: Only if there are no validation errors
    //then save user data into a database
    if (!this.errors.length) {
        // hash user password
        let salt = bcrypt.genSaltSync(10)
        //override user value
        //1st argument is the value we want to hash
        //2nd argument is the salt value
        this.data.password = bcrypt.hashSync(this.data.password, salt)
        userCollection.insertOne(this.data)
    }
}

/*
//This is promise
//Promise is the object that represent the eventual completion of asynchronous operation
async function runOurActions() {
    try {
        //await can be used in async function only.
        
        //this mean that, until eatBreakfast finish, then other function or action start after.
        await eatBreakfast()
        await eatLaunch()
        await eatDinner()
        
        //this mean that, until eatDessert finish it job, 
        //and then if it response reject the catch block will do its job after.
        await eatDessert()
    } catch(err) {
        console.log(err)
    }
}
*/

/*
//Hashing is difference from encript. encript can be decript
//, but Hash only can encript but can't decript to its original form
//To use hash password: go to command line and run 'npm install bcryptjs' 
*/

/*
We can trust or identify requests by:
1.Sessions:
we use 'npm install express-session'


2.Tokens
*/
module.exports = User