const User = require('../models/User');
const bcrypt = require('bcrypt');
const {sign}= require('jsonwebtoken')

// Signup
exports.signup = async(req, res) =>{
    
    try{
        const hashPassword = await bcrypt.hash(req.body.password, 10)
      
        // create new user
        const newUser =  new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPassword
        });

        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
  
};


// login
exports.login = async(req, res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).json('user can not find !');
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json('wrong password !')

        const accessToken = sign({
            user: user
        },
        'RANDOM_TOKEN_SECRET'
        );

        res.status(200).json({
            token: accessToken,
            user:user
        });

    } catch(err){
        res.status(500).json(err);
    }
   
}


//update user
exports.updateUser = async(req, res)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                 req.body.password = await bcrypt.hash(req.body.password, 10)
            } catch(err){
                return res.status(500).json(err)
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            });
            res.status(200).json('Your account has been updated !')

        } catch(err){
            return res.status(500).json(err)
        }

    }else{
        return res.status(403).json('You can update only your account!')
    }

}

exports.updateProfile = async(req, res)=>{
   try{
       const user = await User.findById(req.params.id);
       console.log(req.body)
      
       if(user._id ===req.body.userId){
           await user.updateOne({$set:req.body});
           res.status(200).json('You profile has been updated.')
       }else{
           res.status(403).json('You only can updale your profile.')
       }

   }catch(err){
       res.status(500).json(err)

   }

}



exports.deleteUser = async (req, res)=>{
    if (req.body.userId=== req.params.id || req.body.isAdmin ){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Your account has been delete');

        }catch(err){
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json('You can delete only your account');
    }
}

exports.findOneUser = async (req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        console.log(user)

         // dont need retrun password and updateAt .user.doc = all the User information
        const { password,updatedAt, ...other }= user._doc
        res.status(200).json(other)
    } catch(err){
        res.status(500).json(err);
       

    }
}


exports.followOneUser = async (req, res)=>{
    if(req.params.id !== req.body.userId){ // check is the some user or not
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: {followers: req.body.userId}});
                await currentUser.updateOne({$push: {followings: req.params.id}});
                res.status(200).json('User has been followed !')
            } else {
                return res.status(403).json('You already follow this user! ')
            }

        } catch(err){
            res.status(500).json(err);
         
        }

    } else{
       return res.status(403).json('You can not follow yourself !');

    }
}


exports.unfollowOneUser = async (req, res)=>{
    if(req.params.id !== req.body.userId){ // check is the some user or not
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId)
            if (user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: {followers: req.body.userId}});
                await currentUser.updateOne({$pull: {followings: req.params.id}});
                res.status(200).json('User has been unfollowed !')
            } else {
                res.status(403).json('You already unfollow this user! ')
            }

        } catch(err){
            res.status(500).json(err);
          
        }

    } else{
       return res.status(403).json('You can not unfollow yourself !');

    }
}

exports.getOneUser = async (req, res)=>{
    const userId = req.query.userId;
  
    const username = req.query.username;
 
    try{
        const user = userId
        ? await User.findById(userId)
        : await User.findOne({username: username});
        const { password , updatedAt, ...other} = user.doc;
        res.status(200).json(other);
    } catch(err){
        res.status(500).json(err);
    }
}


exports.findFriends = async (req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map(friendId =>{
                return User.findById(friendId)
            })
        )
        let friendList = [];
        friends.map(friend =>{
            const {_id, username, profilePicture} = friend
            friendList.push({_id, username, profilePicture})
        });
        res.status(200).json(friendList);

    } catch(err) {
        res.status(500).json(err)
        console.log(err)

    }
}


exports.auth = (req, res)=>{
    const userToken = req.user
    console.log(userToken)
    res.status(200).json(userToken)
}