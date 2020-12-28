const Profile = require("../model/Profile")
const User = require("../model/User")

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