const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    birthday:{
        type:String,
    },
    sex:{
        type:String,
        default:"female",
    },
    email:{
        type: String,
        required: true,
        max:200,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: 6
    },
    profilePicture:{
        type: String,
        default: ''
    },
    coverPicture:{
        type: String,
        default:''
    },
    followers:{
        type: Array,
        default: []
    },
    followings:{
        type: Array,
        default: []
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    desc:{
        type: String,
        max:50
    },
    race:{
        type: String,
        max:50
    },
    from:{
        type: String,
        max:50
    }
   

},
{
    timestamps: true
}
);

module.exports = mongoose.model('user', UserSchema);