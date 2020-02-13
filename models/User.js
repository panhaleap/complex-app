//this is constructor of User
let User = function(data) {
    // keyword this is point to what is calling or executing the function
    //So when object which use new User(), will get homePlanet as property
    //this.homePlanet = "earth"

    this.data = data
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

User.prototype.register = function() {
    
}

module.exports = User