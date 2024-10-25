require("dotenv").config();

const config = require("./config.json")
const mongoose = require("mongoose")

mongoose.connect(config.connectionString)

const User = require("./Models/user.model");

const express = require("express");
const cors = require("cors")
const app = express();

const jwt = require("jsonwebtoken")
const {authenticateToken} = require("./utilities")

app.use(express.json());

app.use(
    cors({
        origin: "*"
    })
);

app.get('/',(req,resp)=>{
    resp.json({data:"Hello"})
})

//Create Account

app.post("/create-account", async (req,res)=>{
    const {fullName,email,password}=req.body

    if(!fullName){
        return res
        .status(400)
        .json({error:true, message: "Full name is quired"})
    }

    if(!email){
        return res
        .status(400)
        .json({error:true, message: "Email  is quired"})
    }

    if(!password){
        return res
        .status(400)
        .json({error:true, message: "Password is quired"})
    }

    const isUser = await User.findOne({email:email})

    if(isUser){
        return res.json({
            error:true,
            message:"User Already exist"
        })
    }
    const user = new User ({
        fullName,
        email,
        password,
    })
    await user.save()

    const accessToken = jwt.sign( {user}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: "3600m"
    })

    return res.json({
        error:false,
        user,
        accessToken,
        message:"Registration Successfull"
    })
})



app.listen(8000)

module.exports = app