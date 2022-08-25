const { ObjectId } = require("mongodb");
const connectDB = require("../config/db")
const validation = require("../constant/Constant");
const message = require("../constant/Message");

module.exports = {
   getAllusers:async function(page=0)
   {
        const database =  await connectDB.getempDB()
        return database.collection("employee").find().toArray();
   },  
   
   
   getAllEmployee:async function(pageObj)
   {
        let {limit,offset,page} = {...pageObj};
        const res = {};
        const database =  await connectDB.getempDB()
        const total = await database.collection("employee").count();
        const totalPage =  Math.ceil(total/limit);
        if(page <=totalPage && page >= 1)
        {
                const data =  await database.collection("employee").aggregate([
                {$skip:parseInt((page -1)*limit)},
                {$limit: parseInt(limit)},
               
            ]).toArray()
            res.status = true;
            res.limit = limit;
            res.totalPage = totalPage;
            res.currentPage = page;
            res.data = data;
           
        }
        else{
            res.status = false;
        }
        return res;
   },  

   addemployee:async function(data)
   {    
        const database = await connectDB.getempDB()
            try{
             const result =    database.collection("employee").insertOne(
                    {employee_name:`${data.employee_name}` , employee_age:data.employee_age , 
                    employee_email:data.employee_email , employee_salary:data.employee_salary})
                   return result;
            }catch(error){
                return error;
            }
    },
    updateemployee:async function(data,id){
        const database = await connectDB.getempDB()
        console.log(id)
        try{
          return  database.collection("employee").updateOne(
                {_id: ObjectId(id)},
                {
                    $set: data,
                }
            )
        }catch(error){
            return {
                message:"error in mongo db"
            }
        }
    },
   deletedata:async function(id)
   {
       const database =  await connectDB.getempDB()
       try{
           return database.collection("employee").deleteOne({"_id":ObjectId(id)});
       }
       catch(err){
            return err;
       }
   }
}


