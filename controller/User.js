const {validationResult} = require("express-validator"); 



exports.postUser = (req, res) =>{
    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}); 
    }
    
    res.send("this is your user"); 
}

