const express = require("express");
const router = express.Router();
router.get("/product",async (request,response)=>{
   response.json({status:"success"})
})
module.exports = router;