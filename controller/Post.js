const User = require("../model/User"); 
const Post = require("../model/Post"); 
const Profile = require("../model/Profile"); 
const {validationResult} = require("express-validator"); 

exports.postCreatePost = async(req, res, next) =>{
    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});

    }
    
    try{
    const user = await (await User.findById(req.user.id)).isSelected("-password");
    const newPost = new Post ( {
        text:req.body.text,
        name:user.name,
        avatar:user.avatar,
        user:req.user.id
    })

    const post = await newPost.save();
    return res.json(post); 
    }catch(error){
        console.log(error.message); 
        return res.status(500).send("server error"); 

    }

}


exports.getAllPosts = async(req, res, next) =>{
    try {
        const post = await Post.find().sort({date: -1});
        return res.status(200).json(post);  
    } catch (error) {
        console.log(error.message); 
        return res.status(500).send("server error"); 
    }
}