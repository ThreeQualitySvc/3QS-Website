const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    firstName: String,
    title: String,
    titleNormal: String,
    lastName: String,
    email: String,
    mood: String,
    tags: [{type:String}],
    content: String,
    dayPhoto: String,
    profilePhoto: String,
    likeCount: {type:Number, default:0},
    dislikeCount: {type:Number, default:0},
    day: String,
    isSubmitted: {type:Boolean, default:false},
    isRemoved: {type:Boolean, default:false}
})

const Post = new mongoose.model("Post", postSchema);
module.exports = Post;