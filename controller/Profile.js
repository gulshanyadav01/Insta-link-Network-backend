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
    if(!errors.isEmpty()){

        return res.status(400).json({errors: errors.array() });
    }
    const {
        company, 
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body; 
    // console.log(skills);
    
    // build profile object; 

    const profileFields = {};
    profileFields.user = req.user.id; 
    if(company) profileFields.company = company; 
    if(website) profileFields.website = website; 
    if(location) profileFields.location = location; 
    if(bio) profileFields.bio = bio; 
    if(status) profileFields.status = status; 
    if(githubusername) profileFields.githubusername = githubusername; 
    if(skills){
        profileFields.skills = skills.split(",").map(skill => skill.trim()); 
    }
    console.log(profileFields.skills); 
    
    // build social object 

    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube; 
    if(twitter) profileFields.social.twitter = twitter; 
    if(facebook) profileFields.social.facebook = facebook; 
    if(linkedin) profileFields.social.linkedin = linkedin; 
    if(instagram) profileFields.social.instagram = instagram; 

    try{
        let profile = await Profile.findOne({user: req.user.id})
        console.log(req.user.id)
        // console.log(profile)
        if(profile){
            // update 
            profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set:profileFields}, {new: true});
           return res.status(200).json(profile); 
        }
        // create a new one 
        profile = new Profile(profileFields); 
        await profile.save(); 
        return res.status(200).json(profile); 


    }catch(err) {
        console.log(err.message);
        res.status(500).send("server error");
    }


}


// to get the all users profile

exports.getProfile = async(req, res, next) =>{
    try {
        const profiles = await Profile.find().populate("user", ["name", "email", "avatar"]);
        res.status(200).json(profiles)
        
    } catch (error) {
        console.log(error.message); 
        res.status(500).send("server error"); 
    }
}
