require('dotenv').config()
const express=require('express');
const app=express();
const port=8000;


app.use(express.json()); // For Parsing Json Body in Post Request
const geminiRouter=require('./router/gemini');
app.use('/api/gemini',geminiRouter);


app.listen(port,function(err){
    console.log("Server is running on port: ",port);
});
