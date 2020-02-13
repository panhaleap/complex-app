const express = require('express')
const app = express()

//we tell express to make public folder accessible 
app.use(express.static('public'))

//1st argument must be views, 
//2nd argument is the folder which contain view and in our code our folder is views
app.set('views', 'views')

//we tell what view engine we gonna use, in here our view engine is ejs
app.set('view engine', 'ejs')

app.get('/', function(req, res){
   //we can use res.render casue we use ejs view engine. 
   //home-guest.ejs actually but in here we don't have to write .ejs
    res.render('home-guest')
})

app.listen(3000)