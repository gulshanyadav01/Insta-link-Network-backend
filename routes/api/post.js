const express = require("express"); 
const router = express.Router();
const auth = require("../../middleware/auth")
const {check, validationResult} = require("express-validator"); 

const postController = require("../../controller/Post");

// @ route Post  api/post/
// @ desc  create a post
// @ accesss Private  
router.post("/",[ auth, [
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

module.exports = router;