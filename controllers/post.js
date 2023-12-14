const postSchema=require('../models/post');
exports.allPosts=async(req,res)=>{
    try{
        const data=await postSchema.find();
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json({message:"Something gone wrong!"});
    }
}
exports.getUserPost=async(req,res)=>{
    try{
        let UserId=req.params.UserId;
        const data=await postSchema.find({UserId:UserId});
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json({message:"Something gone wrong!"});
    }
}
exports.getPost=async(req,res)=>{
    try{
        let id=req.params.id;
        const data=await postSchema.findById(id);
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json({message:"Something gone wrong!"});
    }
}
exports.postPost=async(req,res)=>{
    try{
        const data={
            "Image":req.body.Image,
            "Caption":req.body.Caption,
            "UserId":req.body.UserId
        }
        await postSchema.create(data).then(()=>{
            console.log("successfully added")
        })
        .catch((err)=>{
            console.log(err);
        })
        res.status(201).json({message:"Posted successfully"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Something gone wrong!"});
    }
}
exports.updatePost=async(req,res)=>{
    try{
        let id=req.params.id;
        const data=await postSchema.findOne({_id:id})
        if(req.body.Caption){
            data.Caption=req.body.Caption
        }
        if(req.body.Image){
            data.Image=req.body.Image
        }
        await data.save();
        res.status(201).json({message:"Updated successfully",data:data}); 
    }
    catch(err){
        res.status(500).json({message:"Something gone wrong!"});
    }
}
exports.postCommentPost=async(req,res)=>{
    try{
        let id=req.params.id;
        const data=await postSchema.findOne({_id:id})
        data.Comments.push({UserId:req.body.UserId,Comment:req.body.Comment});
        await data.save();
        res.status(201).json({message:"Comment posted successfully",data:data});
    }
    catch(err){
        res.status(500).json({message:"Something gone wrong!"});
    }
}
exports.postLike=async(req,res)=>{
    try{
        let id=req.params.id;
        const data=await postSchema.findOne({_id:id})
        data.Likes.push(req.body.UserId);
        await data.save();
        res.status(201).json({message:"Like posted successfully",data:data});
    }
    catch(err){
        res.status(500).json({message:"Something gone wrong!"});
    }
}
exports.deletePost=async(req,res)=>{
    try{
        let id=req.params.id;
        const response=await postSchema.findByIdAndDelete(id);
        res.status(200).json({message:"Deleted successfully"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Something gone wrong!"});
    }
}