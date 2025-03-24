const express = require('express');
const router = express.Router();
const {body} = require("express-validator");   //for input validation
const userController = require('../controllers/user.controllers');


router.post('/register', [
    //Used SAP ID for Validation with Constrains
    body('sap_id')
    .isNumeric().withMessage('SAP ID must be a number')                                         
    .isLength({ min: 10, max: 10 }).withMessage('SAP ID must be exactly 10 digits'),
    // User name with Constrains  
    body('fullname.firstname').isLength({min:3}).withMessage('First Name Must be 3 Character Long'),
    // Paassword with Constrains
    body('password').isLength({min:6}).withMessage('Password Must be 6 Character Long')
],
    userController.registerUser
)




module.exports = router;