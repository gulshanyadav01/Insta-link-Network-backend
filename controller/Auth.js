const User = require("../model/User")
const jwt = require("jsonwebtoken"); 
const config = require('config');
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator"); 



// @ route Post api/auth
// @ desc  Authenticate user and get token 
// @ accesss Public 


exports.postLoginUser = async (req, res) =>{
    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}); 
    }
    
    const { email, password } = req.body; 

    // see if user exists 
    try{
        let user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({errors: [{msg:"User is not  exists"}]}); 
        }

    // get users gravatar 

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({errors:[{msg:"invalid Credentials"}]}); 
    }
    

   
    const payload = {
        user:{
            id:user.id
        }
    } 
    jwt.sign(
        payload, 
        config.get("jwtSecret"),
        {expiresIn: 360000 }, (err, token )=>{
            if(err) throw err; 
            res.json({token});

        }) 
    

    // return json web token 

    }catch(err){
        console.log(err.message); 
        res.status(500).send("server error")
    } 
}





