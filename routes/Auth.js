const express = require("express");
const user = require("../model/user");
const router = express.Router();

router.post("/signup",async (request,response)=>{
   const data = request.body;
   const  result = await user.signUp(data);
   response.json(result)
})
router.post("/login",async (request,response)=>{
    const data = request.body;
    const  result = await user.login(data);
    response.json(result)
 })
 router.get("/users",async (request,response)=>{
   console.log(request.headers)
   
      const  result = await user.getAlluser();
      if(result && result)
      {
      response.json(result)
      }
   
   else{
      response.json({staus:'failed',message:"token invaid"})
   }
 })

module.exports = router;