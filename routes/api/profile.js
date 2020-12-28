const express = require("express"); 
const router = express.Router();
const auth = require("../../middleware/auth")
const profileController = require("../../controller/Profile"); 
// @ route get  api/profile/me
// @ desc  get current users profile 
// @ accesss private 
router.get("/me", auth, profileController.getProfileMe)


module.exports = router;