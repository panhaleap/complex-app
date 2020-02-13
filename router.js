//console.log("I am executed immediately")
/*module.exports = {
    name: "Meowsalot",
    species: "cat",
    meow: function() {
        console.log("Meoooooooooooow!")
    }
}*/

const express = require('express')
//we use (), casue we calling it
//this will return many applications
const router = express.Router()
//when we requiring a file, we don't need to put .js
const userController = require('./controllers/userController')

/*
router.get('/', function(req ,res) {
    res.render('home-guest')
})
*/

router.get('/', userController.home)
 
router.post('/register', userController.register)

/*
router.post('/create-post', postController.create)
router.post('/login', postController.login)
*/

module.exports = router
