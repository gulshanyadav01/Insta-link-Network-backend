const User = require("../model/User"); 
const Post = require("../model/Post"); 
const Profile = require("../model/Profile"); 
const {validationResult} = require("express-validator"); 
const config  = require("config");
const ACCESSKEY = config.get("ACCESSKEY")
const { response } = require("express");
// require("dotenv/config");


// create post 
exports.postCreatePost = async(req, res, next) =>{
    console.log(req.file);
    console.log(ACCESSKEY)
    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});

    }
    
    try{
    const user = await User.findById(req.user.id).select("-password");
    const newPost = new Post ( {
        text:req.body.text,
        name:user.name,
        avatar:user.avatar,
        image:req.file.location,
        user:req.user.id
    })

    const post = await newPost.save();
    return res.json(post); 
    }catch(error){
        console.log(error.message); 
        return res.status(500).send("server error"); 

    }

}

// get all posts 
exports.getAllPosts = async(req, res, next) =>{
    try {
        const post = await Post.find().sort({date: -1}).populate("users", ["name", "avatar"]);
        return res.status(200).json(post);  
    } catch (error) {
        console.log(error.message); 
        return res.status(500).send("server error"); 
    }
}

// get a single post by id 

exports.getPostById = async(req, res, next) => {
    try{
        const post = await Post.findById(req.params.post_id);
        if(!post){
            return res.status(404).json({msg:"post not found"}); 
        }

        return res.status(200).json(post);

    }catch(error){
        if(error.kind === "ObjectId"){
            return res.status(404).json({msg:"post not found"}); 
        }
        console.log(error.message); 
        return res.status(500).send("server error"); 
    }
}

// delete post by id 

exports.deletePostById = async(req, res, next) =>{
    try{
        const post = await Post.findById(req.params.post_id);

        // check user 
        if(post.user.toString() !== req.user.id){
            return res.status(400).send("not authorized"); 

        }
        await post.remove(); 
        return res.status(200).json({msg:"post removed"}); 

    }catch(error){
        if(error.kind === "ObjectId"){
            return res.status(404).json({msg:"Post not found "}); 
        }
        console.log(error.message); 
        return res.status(500).send("server error"); 
    }
}

// like a post by id 

exports.likePostById = async(req, res, next) =>{
    try{
        const post = await Post.findById(req.params.id); 

        // check if the post has already been liked by this user 
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg:"post already liked "}); 

        }
        post.likes.push({user:req.user.id}); 
        await post.save(); 
        return res.status(200).json(post.likes); 
    }catch(error){
        console.log(error.message);
        return res.status(500).send("server error"); 
    }
}

// unlike the post by id 

exports.unlikePostById = async(req, res , next) =>{
    try{
        const post = await Post.findById(req.params.id); 
        
        // check if the post has already been liked 
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(404).json({msg:"post has not been  liked  yet "});

        }
        // get the remove index 
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
        post.likes.splice(removeIndex, 1); 
        await post.save(); 
        return res.status(200).json(post.likes); 

    }catch(error){
        console.log(error.message); 
        return res.status(500).send("server error"); 
    }
}

// post the comment by id; 

exports.postCommentById = async(req, res, next) =>{
    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}); 

    }

    try {
        const user =  await User.findById(req.user.id).select("-password");
        const post = await Post.findById(req.params.id); 
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }
        post.comments.push(newComment); 
        await post.save(); 
        return res.status(200).json(post.comments); 

        
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('server error');  
        
    }
}


// delete the comment by id from a post by id 

exports.deleteCommentById = async(req, res, next) => {
    try{
        const post = await Post.findById(req.params.id);

        //pull out the comments 
        const comment = post.comments.find(comment => comment.id === req.params.comment_id); 

        // make sure comments exists 
        if(!comment){
            return res.status(404).json({msg: "Comments not exists"}); 

        }
        // check user 
        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({msg:"user not authorized"});   
        }
        // get remove index 
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id); 
        post.comments.splice(removeIndex, 1); 
        await post.save(); 
        return res.status(200).json(post.comments); 
    }catch(error){
        console.log(error.message); 
    }
}