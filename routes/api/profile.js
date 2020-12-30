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

module.exports = router;