
const express=require('express');
const router=express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

//Post Method :/api/gemini/prompt
router.post('/prompt',async(req,res)=>{


        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const prompt = req.body.prompt;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        res.status(200).json({answer:text});
    }
);
module.exports=router;