//to load the package express
const express = require('express')
//Use session for trust login and remember user who logged in sucessfully 
const session = require('express-session')
// to use flash message, we run command to install flash package: npm install connect-flash
const flash = require('connect-flash')
// since we store session in memory, so when we restart server or browser, our session will be cleared.
// To prevent this, we store our session in mongoDB instead. 
// To to session in mongoDB, we run command: npm install connect-mongo
// M in capital letter becasue MongoStore is going to be used as bluePrint, we used for creating new Obj
// (session) here is refer to express session package
//(session) is represion express-session package above
//after adding this, we can use it in sessionOptions below
const MongoStore = require('connect-mongo')(session)

const app = express()

// by default, this will store session in memory. But we could override it by using
// store: new MongoStore({we can put properties here})
//{client: ....} is mongoDB client
let sessionOptions = session({
    secret: "JavaScript is soooooooooooo cooool",
    store: new MongoStore({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    //maxAge : is how long for cookies session should be valid before it expires. 
    //1000 is 1000miliSecond = 1 second.
    // Multiply by 60 means convert to minute
    //Multiply by 60 again means convert to hour
    //24 is the hour of one day
    //all in all maxAge: 1000 * 60 * 60 * 24 : mean one day before expire
    cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
})

//after adding this one, our app could use session now
app.use(sessionOptions)
//we add flash feature to our application
app.use(flash())

// ./ is to look for file in current directory
//require: in node it does 2 things.
//1: it execute set file
//2: it also return whatever that file export, 
// and whatever we export is going to get store in const router
const router = require('./router')
//console.log(router), this will show what we write in module.exports in file router.js = "I am the export for the router file"
//it will show "I am the export for the router file"
//console.log(router.species)

//this tells the express to add the user submitted data onto our request obj
//so that we can access object using req.body
app.use(express.urlencoded({extended: false}))
app.use(express.json())

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

//app.listen(3000)
module.exports = app