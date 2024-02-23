// Importing express
const express = require('express')
// importing cors to enable cross origin requests
const cors = require('cors')
// importing connecting function of mongodb
const connectDb = require('./config/dbConnection')
// importing and configuring dotenv 
const dotenv = require('dotenv').config()
// importing cookie parser
const cookieParser = require('cookie-parser');
// importing authentication middleware
const authentication = require('./middleware/authentication');
// importing multer for file uploads
const multer = require('multer');
const adminauth = require('./middleware/adminauth');

const upload = multer({dest: "uploads/"})


// Created an instance of express
const app = express()

// loading environment variable from .env file and assigning it to a port variable
const port = process.env.PORT

// middleware to enable cross origin requests
app.use(cors({origin: true, credentials: true}));

// Middleware to parse json data in the request body
app.use(express.json())
// setting cookie parser
app.use(cookieParser())
// Setting up middleware to handle URL-encoded data
app.use(express.urlencoded({extended:true}))
// serve static files
app.use('/uploads', express.static(__dirname+'/uploads'))

// Route handlers
// route handler for signup and login
app.use('/', require('./routes/authRoutes'))

// admin route handlers
app.use('/admin', upload.single('file'), adminauth ,require('./routes/adminRoutes'))
// route handler for dashboard and movies section
app.use('/customer', authentication ,require('./routes/customerRoutes'))


// Function call to connect server with db
connectDb().then(()=>{
    // listen method is called to start the server 
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
})