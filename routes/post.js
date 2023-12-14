const express=require('express');
const router=express.Router();
const postController=require('../controllers/post');
router.get('/all',postController.allPosts)
.get('/getUser/:UserId',postController.getUserPost)
.get('/get/:id',postController.getPost)
.patch('/update/:id',postController.updatePost)
.post('/post',postController.postPost)
.post('/comment/:id',postController.postCommentPost)
.post('/like/:id',postController.postLike)
.delete('/delete/:id',postController.deletePost)
exports.route=router;