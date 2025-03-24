const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required : true,
            minlength: [3, 'First Name Must be 3 Character Long '],
        },
        lastname:{
            type:String,
            minlength: [3, 'Last Name Must be 3 Character Long '],
        }
    },
    sap_id:{
        type:String,
        required : true,
        unique : true,
        minlength: [10, 'First Name Must be 10 Character Long '],
    },
    password:{
        type:String,
        required : true,
        select:false,
    },
    socketId:{
        type: String,                        // For live tracking 
    },
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);    //TOKEN GENERATION 
    return token ;
}


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password);                 // COMAPRE PASSWORD 
}

userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model('user', userSchema);


module.exports = userModel