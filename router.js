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

router.get('/', function(req ,res) {
    res.render('home-guest')
})
 
router.get('/about', function(req ,res) {
    res.send('This is our about page')
})

module.exports = router
