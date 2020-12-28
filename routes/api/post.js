const express = require("express"); 
const router = express.Router();


// @ route GET api/post/
// @ desc  Test routes
// @ accesss Public 
router.get("/", (req, res, next ) =>{
    res.send("post routes");
})


module.exports = router;