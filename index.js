const express = require("express");
const cors = require("cors");
const mongo = require('./shared/connect');
const {Studentsignin,signup} = require('./modules/registermodule');

const authorizeModule = require('./modules/authorize');

const app = express();

app.use(cors());
app.use(express.json());
mongo.connect();

app.get('/',(req,res)=>{
    res.send('Home')
})
app.post('/signin',Studentsignin);
app.post('/signup',signup); 
app.use(authorizeModule.AuthenticateUser);



app.listen(process.env.PORT || 8000,function()

{

console.log("Started")

});;