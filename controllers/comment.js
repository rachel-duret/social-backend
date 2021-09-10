const Comment= require('../models/Comment');
const User = require('../models/User');



exports.createOneComment = async (req, res)=>{
    console.log(req.body)
    const newComment = new Comment({
        ...req.body,
        img:`${req.protocol}://${req.get('host')}/images/${req.body.img}`
    });
    try{
        const savedComment = await newComment.save();
        res.status(201).json(savedComment); 

    } catch(err){
        res.status(500).json(err);
        console.log(err)

    }
};




exports.deleteOneComment = async(req, res)=>{
    try{
        const comment = await Comment.findOne({userId:req.params.id});
        console.log(req.body.userId)
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json('Your post has been deleted !')
        }else{
            res.status(403).json('You can only delete your own post !')
        }
    } catch(err){
        res.status(500).json(err);
        console.log(err)
    }
}


exports.likeOneComent = async (req, res)=>{
    try{
        const comment = await Post.findById(req.params.id);
      
        if( !post.likes.includes(req.body.userId) ){
            await comment.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json('Comment has been liked !')
        }else{
            await comment.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json('Post has been unliked !')
        }

    } catch(err){
        res.status(500).json(err)
        console.log(err)
    }
}


exports.getOneComment = async (req, res)=>{
    try{
        const comments = await Comment.find({postId:req.params.id});
        console.log(comments)
        res.status(200).json(comments);

    } catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}





