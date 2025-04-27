const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token : {
        type:String,
        required:true,
        unique:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:86400 // Token will expire after 24 hour 
    }
});
module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema); // Export the model for use in other parts of the application
// This model is used to store blacklisted tokens in the database. The token field is unique, and the createdAt field is set to expire after 24 hours.