const mongo = require('../db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports.signup = async(req,res,next) => {
    // Email ID Validation
    const existUser = await mongo.db.collection("login").findOne({email: req.body.email})
    if(existUser) return res.status(400).send({msg: "Email already exists"})

    // Encrypt Password
    const salt = await bcrypt.genSalt(5);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    // Save in Database
    var data = await mongo.db.collection("login").insertOne(req.body);
    res.send(data);
}

module.exports.signin = async(req,res,next) => {
   // Is Registered user validation
   const existUser = await mongo.db.collection("login").findOne({email: req.body.email})
   if(!existUser) return res.status(400).send({msg: "Email is not exists"})

   // Password Validation
   const isValid = await bcrypt.compare(req.body.password, existUser.password)
   if(!isValid) return res.status(400).send({msg: "Incorrect Password"})

   // Generate Token
   const token = jwt.sign(existUser, 'ABCD', {expiresIn: '365d'})
   res.send(token);
}
