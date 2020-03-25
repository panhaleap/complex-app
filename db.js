const dotenv = require('dotenv')

//as soon as we run config here, 
//dotevn package is going to load all of the value that we define whitin .env file
dotenv.config()

const mongodb = require('mongodb')

//process.env.NameOfVariable: this is how we access environment variable
mongodb.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    //this will return the actual database object that we can work with
    // module.exports = client.db()
    //we can write this becasue we wrote store: new MongoStore({client: require('./db')}) in app.js
    module.exports = client;

    //casue we want to connect with db first, and after connect successfully and database is ready, 
    //then we will run our app
    const app = require('./app')
    app.listen(process.env.PORT)
})