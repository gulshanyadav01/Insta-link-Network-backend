const {validationResult} = require("express-validator"); 
const User = require("../model/User")
const bcrypt = require("bcryptjs"); 
const gravatar = require("gravatar");
const { use } = require("../routes/api/auth");
const jwt = require("jsonwebtoken"); 
const config = require('config'); 

exports.postRegisterUser = async (req, res) =>{
    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}); 
    }
    
    const {name, email, password } = req.body; 

    // see if user exists 
    try{
        let user = await User.findOne({email: email});
        if(user){
            return res.status(400).json({errors: [{msg:"User is already exists"}]}); 
        }

    // get users gravatar 

    const avatar = gravatar.url(email,{
        s:"200",
        r:"pg",
        d:"mm"
    })

    user = new User({
        name,
        email,
        avatar,
        password
    })

    // const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, 10);
    await user.save(); 
    const payload = {
        user:{
            id:user.id
        }
    } 
    const token = jwt.sign(
        payload, 
        config.get("jwtSecret"),
        {expiresIn: 360000 }); 
        return res.json({token});
    

    // return json web token 

    }catch(err){
        console.log(err.message); 
        return res.status(500).send("server error")
    } 
}



