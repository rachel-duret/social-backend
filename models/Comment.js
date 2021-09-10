const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    userId:{
        type: String,
        required:true
    },
    desc:{
        type: String,
        max:500
    },
    postId:{
        type: String,
        required:true
    },
    img:{
        type: String
    },
    likes:{
        type: Array,
        default: []
    }
},
{
    timestamps:true
});

module.exports = mongoose.model('Comment', CommentSchema)