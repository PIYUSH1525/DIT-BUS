const userModel = require('../models/user.model');
const userService = require('../services/user.service')
const {validationResult} = require('express-validator')
const blackListTokenModel = require('../models/blackListToken.model'); // Import the blacklist token model


// If any errors occurs in thr rout this will handel esle the process will continue
module.exports.registerUser = async(req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const{fullname,sap_id,password} = req.body;

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname : fullname.lastname,
        sap_id,
        password:hashedPassword
    });

    const token = user.generateAuthToken();
    res.cookie('token', token); // Set the token in a cookie for authentication
    res.status(201).json({token,user});

}


module.exports.loginUser = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {sap_id,password} = req.body;
    const user = await userModel.findOne({sap_id}).select('+password');    //For finding User in the Database   // +password because select: false so we need to acquire it 

    if(!user){
        return res.status(401).json({message:'Invalid Sap Id or password'});
    }

    const isMatch = await user.comparePassword(password);  // For password Check
    
    if(!isMatch){
        return res.status(401).json({message:'Invalid Sap Id or Password'});
    }

    const token = user.generateAuthToken();    // if everything is correct then generate a token 

    res.status(200).json({token , user});   // after token gen send token and res 
}

module.exports.getUserProfile = async(req,res,next)=>{
    res.status(200).json(req.user); 
 } // req.user is set in the auth middleware

 module.exports.logoutUser = async(req,res,next)=>{
    res.clearCookie('token'); // Clear the token cookie to log out the user
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ]; // Get the token from cookies or authorization header

    await blackListTokenModel.create({ token }); // Add the token to the blacklist

    res.status(200).json({message:'Logout Successful'}); // Send a success message
    }