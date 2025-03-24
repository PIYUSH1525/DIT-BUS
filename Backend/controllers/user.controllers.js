const userModel = require('../models/user.model');
const userService = require('../services/user.service')
const {validationResult} = require('express-validator')


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

    res.status(201).json({token,user});

}