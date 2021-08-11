const Post = require('../models/Post');


exports.createOnePost = async (req, res)=>{
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(201).json(savedPost); 

    } catch(err){
        res.status(500).json(err);
        console.log(err)

    }
};


exports.updateOnePost = async (req, res) =>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json('Your post has been updated !')
        } else {
            res.status(403).json('You can only update your post !')
        }

    } catch(err){
        res.status(500).json(err);
        console.log(err)
    }
}



exports.deleteOnePost = async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        console.log(post)
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


exports.likeOnePost = async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if( !post.likes.includes(req.body.userId) ){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json('Post has been liked !')
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json('Post has been unliked !')
        }

    } catch(err){
        res.status(500).json(err)
        console.log(err)
    }
}


exports.getOnePost = async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);

    } catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}