const userModel = require('../models/user.model');
const usermodel = require('../models/user.model');

// THIS WHOLE FUNCTION WILL CREATE A USER AND PERFORM SOME CHECKS 
module.exports.createUser = async({
    firstname, lastname , sap_id, password
}) =>{
    if (!firstname || !sap_id || !password){
        throw new Error('All fields are required')                              // Check For all parameter are there 
    }
    const user = userModel.create({
        fullname:{
            firstname,
            lastname
        },
        sap_id,
        password
    })
    return user;
}