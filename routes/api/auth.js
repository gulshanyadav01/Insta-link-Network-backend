const express = require("express"); 
const router = express.Router();
const User = require("../../model/User")
const jwt = require("jsonwebtoken"); 
const config = require('config');
const {validationResult} = require("express-validator"); 
const authController = require("../../controller/Auth"); 
const {check} = require("express-validator");

// @ route GET api/auth
// @ desc  Test routes
// @ accesss Public 
const auth = require("../../middleware/auth"); 
router.get("/",auth,  async (req, res, next ) =>{
    try{
        const user = await User.findById(req.user.id).select("-password");
        return res.json(user); 

    }catch(err){
        console.log(err);
        res.status(500).json({msg:serverError});
    }
})


// @ route Post api/auth
// @ desc  Authenticate the user
// @ accesss Public 

router.post("/",
[
    check("email", "please include a valid email")
        .isEmail(),
    check("password", "password is required")
        .exists()

], authController.postLoginUser);


module.exports = router;