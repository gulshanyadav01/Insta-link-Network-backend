const express = require("express"); 
const router = express.Router();
const {check, validationResult} = require("express-validator"); 

// @ route GET api/users/
// @ desc  Test routes
// @ accesss Public 
const userController = require("../../controller/User")
router.post("/",[
    check("name", "Name is required")
        .not()
        .isEmpty(),
    check("email", "please include a valid email")
        .isEmail(),
    check("password", "pleas enter a password with 6 or more characters")
        .isLength({min:6})

], userController.postUser);


module.exports = router;