const mongoose=require('mongoose');
require('dotenv').config();
const connectwithdb=()=>{
console.log(process.env.DB_URL)
mongoose.connect(`mongodb+srv://schaluva3:eC8BVMzJRqo7r6TU@cluster0.rscrk0h.mongodb.net/UserAuthenticater`)
.then(()=>{
    console.log("connect with db");
})
.catch((err)=>{
    console.log(err);
})
}
exports.connectwithdb=connectwithdb;