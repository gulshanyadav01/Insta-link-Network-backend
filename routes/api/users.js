const express = require("express"); 
const router = express.Router();


// @ route GET api/users/
// @ desc  Test routes
// @ accesss Public 
router.get("/", (req, res, next ) =>{
    res.send("user routes");
})


module.exports = router;