
const express=require('express');
const router=express.Router();
const image_utils=require('../utils/image_utils');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fileType = require('file-type');

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
//Post Method :/api/gemini/prompt
router.post('/prompt',async(req,res)=>{

        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const prompt = req.body.prompt;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        res.status(200).json({answer:text});
    }
);

router.post('/prompt-with-server-image',async(req,res)=>{
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = req.body.prompt;
    const image=await image_utils.loadImageFromStorage("assets/test.jpg");
    const imagebuffer=Buffer.from(image,'base64');
    const geminiImageData = image_utils.bufferToGeminiData(imagebuffer);
    
    const result = await model.generateContent([prompt, geminiImageData]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    res.status(200).json({answer:text});
})



router.post('/prompt-with-image-url',async(req,res)=>{
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = req.body.prompt;
    const url=req.body.url;
    const image_buffer=await image_utils.fetchImageFromUrl(url);
    const type=await fileType.fromBuffer(image_buffer)
    if(type==undefined){
        res.status(400).json({error:"Invalid Image URL"});
        return;
    }
    const geminiImageData = image_utils.bufferToGeminiData(image_buffer,type.mime);

    const result = await model.generateContent([prompt, geminiImageData]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    res.status(200).json({answer:text});
})
module.exports=router;