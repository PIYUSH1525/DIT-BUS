const express = require('express');
const router = express.Router();
const {body} = require("express-validator");   //for input validation
const userController = require('../controllers/user.controllers');
const authMiddleware = require('../middlewares/auth.middleware'); // for authentication

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
router.post('/login',[
    body('sap_id')
    .isNumeric().withMessage('SAP ID must be a number')              
    .isLength({ min: 10, max: 10 }).withMessage('SAP ID must be exactly 10 digits'),
    body('password').isLength({min:6}).withMessage('Password Invalid')
],
    userController.loginUser
)

router.get('/profile', authMiddleware.authUser, userController.getUserProfile)

router.get('/logout', authMiddleware.authUser, userController.logoutUser) // Logout route

module.exports = router;
