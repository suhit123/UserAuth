const express=require('express');
const router=express.Router();
const controllers=require('../controllers/userdata');
router.post('/userdetails',controllers.authorize);
exports.route=router;