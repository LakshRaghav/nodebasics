const express = require("express");
const auth = require("./routes/Auth")
const product = require("./routes/Product")
const crud = require("./routes/Crud")
const AuthMiddleware = require('./middleware/AuthMiddleware');
const app = express();
var cors = require('cors')
 app.use(express.json());
 app.use(cors())
// middle ware
 app.use((req,res,next)=>{
 res.setHeader('Access-Control-Allow-Origin','*')
 res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
 res.setHeader("Access-Control-Allow-Headers","X-Requested-Width,Content-type")
 res.setHeader("Access-Control-Allow-Credentials",true)
//  res.writeHead(200,{'Content-Type':'application/json'})
 next();
})


app.use("/auth",auth);
app.use("/product",AuthMiddleware.isValidToken,product);
app.use("/crud" , AuthMiddleware.isValidToken,crud);


module.exports = app;