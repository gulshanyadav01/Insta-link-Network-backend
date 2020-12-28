const express = require("express"); 
const router = express.Router();
const auth = require("../../middleware/auth")
const profileController = require("../../controller/Profile"); 
const {chech, validationResult} = require("express-validator"); 

// @ route get  api/profile/me
// @ desc  get current users profile 
// @ accesss private 
router.get("/me", auth, profileController.getProfileMe); 



// @ route get  api/profile/
// @ desc  create or update user profile
// @ accesss private 

router.post("/", [
    auth, 
    check("status", "status is required")
        .not()
        .isEmpty(),
    check("skills","skills is required")
        .not()
        .isEmpty()
]  )

module.exports = router;