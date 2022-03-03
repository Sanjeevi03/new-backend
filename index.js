const express = require('express')
const cors = require('cors')

const mongo = require('./db')
const { signup, signin,task,task1 } = require('./modules/modules')
const app =express()

app.use(cors())
app.use(express.json())

mongo.connect()
app.get('/',(req,res)=>{
   res.send("Home Page")
})
app.post('/signup',signup);
app.post('/task',task)
app.get('/task1',task1)
app.post('/signin',signin);
app.listen(process.env.PORT || 8000,()=>{
   console.log("Started");
})