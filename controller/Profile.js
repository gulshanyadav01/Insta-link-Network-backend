const Profile = require("../model/Profile")
const User = require("../model/User")
const {check, validationResult}  = require("express-validator");

// for login user profile 
exports.getProfileMe = async (req, res, next) =>{
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate("user", ["name", 'avatar']);
        if(!profile){
            return res.status(400).json({msg:"there is no profile for this user"});

        }
        res.json(profile);

    }catch(err){
        console.log(err.message);
        res.status(500).send("server error"); 
    }
}


// create the user profile


exports.createProfile = async (req, res) =>{
    const errors = validationResult(req); 
    if(!errors){

        return res.status(400).json({errors: errors.array() });
    }
    const
    {
        company,
        bio,
        website
    } = req.body
}

