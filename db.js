const mongodb = require('mongodb')
const connectString = 'mongodb+srv://UserTodoApp:xBHBrUCaGcZeCIL2@cluster0-loifk.mongodb.net/ComplexApp?retryWrites=true&w=majority'
mongodb.connect(connectString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    //this will return the actual database object that we can work with
    module.exports = client.db()

    //casue we want to connect with db first, and after connect successfully and database is ready, 
    //then we will run our app
    const app = require('./app')
    app.listen(3000)
})