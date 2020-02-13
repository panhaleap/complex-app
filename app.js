//to load the package express
const express = require('express')
const app = express()

// ./ is to look for file in current directory
//require: in node it does 2 things.
//1: it execute set file
//2: it also return whatever that file export, 
// and whatever we export is going to get store in const router
const router = require('./router')
//console.log(router), this will show what we write in module.exports in file router.js = "I am the export for the router file"
//it will show "I am the export for the router file"
//console.log(router.species)



//we tell express to make public folder accessible
app.use(express.static('public'))

//1st argument must be views, 
//2nd argument is the folder which contain view and in our code our folder is views
app.set('views', 'views')

//we tell what view engine we gonna use, in here our view engine is ejs
app.set('view engine', 'ejs')

/*
app.get('/', function(req, res){
   //we can use res.render casue we use ejs view engine. 
   //home-guest.ejs actually but in here we don't have to write .ejs
    res.render('home-guest')
})
*/

// / this sign is for base server side
app.use('/', router)

app.listen(3000)