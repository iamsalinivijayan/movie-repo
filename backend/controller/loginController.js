const bcrypt = require('bcrypt'); // importing bcrypt for password hashing
const jwt = require('jsonwebtoken'); //importing jsonwebtoken for token generation
const User = require('../model/userModel'); // importing the User Model

const login = async (req, res, next) => {
    console.log(req.body)
    try {
        // Extracting data from the request body
        const { email, password } = req.body;
        // console.log(req.body);
        // fetching user with the particular email from db
        const user = await User.findOne({ email });
        // sending user not found if user doesn't exist
        if(!user){
            res.status(404).send("User doesn't exist ");;
            throw new Error("User not found")
        }
        // if user exists 
        // Matching and comparing password entered and the the passord saved in db
        const matchPassword = bcrypt.compareSync(password, user.password);
        // if passwords doesn't match sending unauthorised response
        if (!matchPassword) {
            res.status(401).send('Invalid credentials');
        } 
        // if passwords match token is generated
        else {
            const expTime = Date.now() + 1000 * 60 * 60 * 2;
            const token = jwt.sign({
                sub: user._id,
                email: user.email,
                exp: expTime
            },
            process.env.JWT_SECRET   
            );

            let isAdmin = user.is_admin

        // set the token as http-only cookie
        res.cookie("Authorization", token, {
            httpOnly: true,
            expires: new Date(expTime),
            sameSite: "lax",
        });
          // Respond with a success message
    res.status(200).json({ message: "Login successful", isAdmin: isAdmin });
    // console.log(token)
        }
    }
    // Handle errors and send an appropriate error response
     catch (err) {
        console.error('Error finding user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller for checking user authentication
const checkAuthController = async (req, res) => {
    try {
        console.log("inside check auth")
      const token = req.cookies?.Authorization;
  
      // If no token is found, respond with a 401 status and throw an error
      if (!token) {
        res.status(401);
        throw new Error("Token not found");
      }
  
      // Verify the JWT token using the secret key stored in the environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Check if the token has expired, respond with a 401 status, and throw an error
      if (Date.now() > decoded.exp) {
        res.status(401);
        throw new Error("Token expired");
      }
  
      // Retrieve the user information from the database using the user ID in the token
      const user = await User.findById(decoded.sub);
  
      // If no user is found, respond with a 401 status and throw an error
      if (!user) {
        res.status(401);
        throw new Error("Unauthorized user");
      }
  
      // Respond with the user ID
      res.status(200).json({ id: user._id , email: user.email, isAdmin: user.is_admin});
    } catch (error) {
      console.log(error);
    }
  };
  
  // Controller for user logout
  const logOutController = async (req, res) => {
    console.log("inside logout controller")
    // Clear the Authorization cookie
    res.cookie("Authorization", "");
    // Respond with an "ok" message
    res.status(200).json("Logout successful");
  };

module.exports = {login, checkAuthController, logOutController}
