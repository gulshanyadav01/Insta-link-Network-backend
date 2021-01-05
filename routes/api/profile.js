const express = require("express"); 
const router = express.Router();
const profileController = require("../../controller/Profile"); 
const {check, validationResult} = require("express-validator"); 
const auth = require("../../middleware/auth");


// @ route get  api/profile/me
// @ desc  get current users profile 
// @ accesss private 
router.get("/me", auth, profileController.getProfileMe); 



// @ route POST  api/profile/
// @ desc  create or update user profile
// @ accesss Private 

router.post("/", [auth, [ 
    check("status", "status is required")
        .not()
        .isEmpty(),
    check("skills","skills is required")
        .not()
        .isEmpty()
    ]
], profileController.createProfile)

// @ route Get   api/profile/
// @ desc  get all  profile
// @ accesss Public 

router.get("/", profileController.getProfile); 


// @ route Get   api/profile/user/:user_id
// @ desc  get   profile by user id 
// @ accesss Private 

router.get("/user/:user_id", profileController.getProfileByUserId); 

// @ route Delete    api/profile
// @ desc  delete    profile by user id 
// @ accesss Public 

router.delete("/", auth ,  profileController.deleteProfile); 

module.exports = router;