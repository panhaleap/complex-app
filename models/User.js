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
    if (this.data.password.length > 100) {this.errors.push("Password can not exceed 100 characters.")}

    if (this.data.username.length > 0 && this.data.password.length < 3) {this.errors.push("Username must be at least 3 characters.")}
    if (this.data.username.length > 30) {this.errors.push("username can not exceed 30 characters.")}
}

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

User.prototype.register = function() {
    //Step #1: Validate user data
    this.cleanUp()
    this.validate()

    //Step #2: Only if there are no validation errors
    //then save user data into a database
    if (!this.errors.length) {
        userCollection.insertOne(this.data)
    }
}

module.exports = User