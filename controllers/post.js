const Post = require('../models/Post');
const User = require('../models/User');



exports.createOnePost = async (req, res)=>{
    console.log(req.body)
    const newPost = new Post({
        ...req.body
        
    });
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
            await post.deleteOne();
            res.status(200).json('Your post has been deleted !')
       
    } catch(err){
        res.status(500).json(err);
        console.log(err)
    }
}


exports.likeOnePost = async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        console.log(req.body.userId)
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


exports.timeline = async(req, res) =>{
  
    try{
        //find the current userId from User database.
        const currentUser = await User.findById(req.params.userId);
        //find all the post from the current user
        const userPosts = await Post.find({userId: currentUser._id});

        // find all the post of the friends， Promise.all 的作用是计划所有的promise重新包装成一个新的promise
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
                return Post.find({ userId: friendId});
            })
        );
      
        //concat()方法用于连接2 个或者多个数组
        res.status(200).json(userPosts.concat(...friendPosts))

    } catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}

exports.userAllPost = async(req, res) =>{
  
    try{
        const user = await User.findById( req.params.userId);
      
        const posts = await Post.find({userId: user._id});
   
        const userFullList = await Promise.all(
            [user,posts]
        )
        res.status(200).json(userFullList)

    } catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}