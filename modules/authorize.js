const jwt = require("jsonwebtoken");

exports.AuthenticateUser = async (req,res,next) => {
    // Check whether token exists in req.headers
    if(!req.headers['access-token'])
        return res.status(400).send({msg : "Token Not Found"})

    // Verify Token
    try{
        req.body.user = await jwt.verify(req.headers['access-token'], 'ABCD')
        next();
    }catch(err) {
        res.send(401).send({msg : "Unauthorised"})
    }
}

exports.isAdmin = async (req,res,next) => {
    if(req.body.user.role === "Admin") 
        next()
    else 
        res.status(403).send({msg : "You are not Admin"})
}