const bcrypt = require("bcryptjs");
require('dotenv').config({path:"../.env"});
const jwt = require('jsonwebtoken');
module.exports = {
    emailValidation:function(emailString)
    {
        return String(emailString)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    },
    encrypt:async function(body)
    {
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, salt);
        // user.save().then((doc) => res.status(201).send(doc));
        return body;
    },
    compPassword:async function(passString,dbString)
    {
        return bcrypt.compareSync(passString,dbString)
    }
    ,
    generateToken:function(bindData)
    {
        return jwt.sign(bindData,process.env.SECRET_KEY,{expiresIn:'30d'})

    }
}