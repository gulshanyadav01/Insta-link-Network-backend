const express = require("express"); 
const router = express.Router();


// @ route GET api/profile/
// @ desc  Test routes
// @ accesss Public 
router.get("/", (req, res, next ) =>{
    res.send("profile routes");
})


module.exports = router;