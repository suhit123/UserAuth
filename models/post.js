const mongoose=require('mongoose')
const post=mongoose.Schema({
    "Image":[String],
    "Caption":{type:String},
    "UserId":{type:String},
    "Likes":[String],
    "Comments":[
        {
            "UserId":{type:String},
            "Comment":{type:String}
        }
    ]
})
const postSchema=mongoose.model('post',post)
module.exports=postSchema