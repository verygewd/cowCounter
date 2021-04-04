const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const compress = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')


// create express server
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

// routes
app.use('/', userRoutes)
app.use('/', authRoutes)



app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({
            "error": err.name + ": " + err.message
        })
    } else if (err) {
        res.status(400).json({
            "error": err.name + ": " + err.message
        })
        console.log(err)
    }
})



//database set up
mongoose.Promise = global.Promise
const mongoDBName = "cowCounter"
const mongoURI = "mongodb://localhost:27017/" + mongoDBName
mongoose.connect(mongoURI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true} )
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoURI}`)
})


// listen to port
const port = process.env.PORT || 3001

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("App is listening on port " + port)
})
