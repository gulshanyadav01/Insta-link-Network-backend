const express = require("express"); 
const router = express.Router();
const auth = require("../../middleware/auth")
const {check, validationResult} = require("express-validator");
const upload  = require('../../middleware/file');  

const postController = require("../../controller/Post");
// const { route } = require("./auth");

// @ route Post  api/post/
// @ desc  create a post
// @ accesss Private  
router.post("/",[ auth ,  [
    check("text", "text is required").not().isEmpty()

]
], postController.postCreatePost)


// @ route Get   api/post/
// @ desc  Get all posts 
// @ accesss Private  
router.get("/", auth, postController.getAllPosts); 


// @ route Get   api/post/:post_id
// @ desc  Get single post by id
// @ accesss Private  
router.get('/:post_id',auth, postController.getPostById); 



// @ route DELETE   api/post/:post_id
// @ desc  delete a  post by id
// @ accesss Private
router.delete("/:post_id", auth, postController.deletePostById); 


// @ route Put    api/post/like/:id
// @ desc  like  a  post by id
// @ accesss Private
router.put("/like/:id",auth,  postController.likePostById); 


// @ route Put    api/post/unlike/:id
// @ desc  unlike  a  post by id
// @ accesss Private
router.put("/unlike/:id", auth, postController.unlikePostById); 


// @ route Post  api/post/comment
// @ desc  comment post by id 
// @ accesss Private
router.post("/comment/:id", [
    auth, [
        check("text", "text is required").not().isEmpty()
    ]
], postController.postCommentById); 


// @ route DELETE   api/post/comment/:id/:comment_id
// @ desc  delete comment by comment id  of  post by id 
// @ accesss Private
router.delete("/comment/:id/:comment_id", auth, postController.deleteCommentById);

module.exports = router;