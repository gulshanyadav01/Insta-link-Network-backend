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
// @ accesss Private 

router.delete("/", auth ,  profileController.deleteProfile); 

// @ route Put    api/profile/experience 
// @ desc  Add profile experience 
// @ accesss Private 

router.put("/experience", [
    auth, [
        check("title", "Title is required").not().isEmpty(),
        check("company", "company is required").not().isEmpty(),
        check("from", "from date is required").not().isEmpty()
    ]
], profileController.putExperience )

// @ route DELETE api/profile/experience/:exp_id
// @ desc  delete  experience from profile
// @ accesss Private 

router.delete("/experience/:exp_id", auth, profileController.deleteExperience);

// @ route PUT api/profile/education
// @ desc  ADD  Education  to  profile
// @ accesss Private 
router.put("/education", [auth,[
    check("school", "school is required").not().isEmpty(),
    check("degree", "degree is required").not().isEmpty(),
    check("fieldOfStudy", "field of Study is required").not().isEmpty(),
    check("from", "from is required").not().isEmpty()

]], profileController.putEducation);

// @ route delete  api/profile/education/:edu_id
// @ desc  delete   Education  from   profile
// @ accesss Private 

router.delete("/education/:edu_id", auth, profileController.deleteEducation); 

module.exports = router;