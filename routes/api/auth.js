const express = require("express"); 
const router = express.Router();


// @ route GET api/auth/
// @ desc  Test routes
// @ accesss Public 
router.get("/", (req, res, next ) =>{
    res.send("auth routes");
})


module.exports = router;