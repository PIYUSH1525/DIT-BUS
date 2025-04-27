const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];  // Get token from cookies or authorization header
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });       // If no token is provided, return 401 Unauthorized
    }

    const isBlacklisted = await userModel.findOne({ token: token });  // Check if the token is blacklisted
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });  // If token is blacklisted, return 401 Unauthorized
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token using JWT secret
        const user = await userModel.findById(decoded._id);           // Find the user by ID from the token
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });  // If user not found, return 401 Unauthorized
        }
        req.user = user;                                             // Attach user to request object
        return next();                                                      // Proceed to the next middleware or route handler
    }
    catch (err){
        return res.status(401).json({message:'Unauthorized'});  // If token is invalid, return 401 Unauthorized
    }
}