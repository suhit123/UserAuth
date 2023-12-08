const forgotpassword=require('../controllers/forgotpassword');
const express=require('express');
const router=express.Router();
router.post('/sendotp',forgotpassword.sendotp);
router.post('/verifyotp',forgotpassword.verifyotp);
exports.route=router;