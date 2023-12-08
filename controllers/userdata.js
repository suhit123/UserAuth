const jwt=require('jsonwebtoken');
const userschema=require('../models/usermodel.js');
require('dotenv').config();
exports.authorize=async(req,res)=>{
    try{
        const token=req.body.token;
    if(token){
        const decode=await jwt.verify(token,"secretKey");
        const userdata=await userschema.findOne({username:decode.username});
        res.status(200).json({id:userdata._id,Name:userdata.Name,Email:userdata.Email});
    }
    else{
        res.status(500).json({message:"Session expired!"})
    }}
    catch(err){
        res.status(501).json({"message":"something gone wrong!"})
    }
};