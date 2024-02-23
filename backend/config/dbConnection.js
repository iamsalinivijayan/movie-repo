// importing mongoose library
const mongoose = require('mongoose')

// Creating an async connection function
const connectDb = async () => {
    try {
        // establing a connection by using the environment variable assigned in .env file
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        // if connection is successful console log the following else catch error
        console.log(
            "Database connected: ", 
            connect.connection.host, 
            connect.connection.name
            );

    }catch(err) {
        console.log(err);
        process.exit(1);
    }

};
// exporting the function
module.exports = connectDb