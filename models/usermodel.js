const mongoose=require('mongoose');
const createuser=mongoose.Schema({
    "Name":{type:String},
    "Email":{type:String, unique:true},
    "Password":{type:String},
    "OTP":{type:String}
})
const createmodel=mongoose.model('user',createuser);
module.exports=createmodel;