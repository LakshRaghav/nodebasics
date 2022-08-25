const express = require("express");
const employee = require("../model/employee");
const router = express.Router();

router.get("/employee/:page", async (request, response) => {
    const data = request.body;
    const page_no = request.params;
    employee.getAllusers(page_no.page).then((result) => {
        const res = {
            data: result.dat,
            page: result.lm
        }
        return response.json(res)
    });

})
router.get("/employee_all", async (request, response) => {
    employee.getAllusers().then((result) => {
        const res = {
            data: result
        }
        return response.json(res)
    });

})
router.post("/employee", async (request, response) => {
    const data= request.body;
    const result  = await employee.addemployee(data)
    return response.json(result);
})
router.put("/employee/:id", async (request, response) => {
    const data= request.body;
    const add = request.params;
//    // console.log(data);
//     console.log(add.id)
    employee.updateemployee(data,add.id).then((result) => {
        const res = {
            data: result
        }
            return response.json(res)
    });

})
router.delete("/employee/:id", async (request, response) => {
    const data = request.params;
    console.log(data.id)
    employee.deletedata(data.id).then((result) => {
        return response.json(result)
    })
})

router.get("/employee_page",async (request,response)=>{
    const res = {};
    try{
       res.status = true;
       res.data = request.query;
       employee.getAllEmployee(request.query).then((result)=>{
            return response.json(result);
       })
       
    }
    catch(err){
        res.status = false;
        res.message = "invalid url";
        return res;
    }
  
})



module.exports = router;