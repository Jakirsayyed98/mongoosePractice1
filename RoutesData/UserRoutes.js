const  mongoose = require('mongoose');
const express = require('express');
const Userrouter = express.Router()
const UserShemas = require('../Schemas/userscemas');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var SECRET_KEY = "JAKIRAPI"


Userrouter.post("/signup",async (req,res)=>{
    var exist =await UserShemas.findOne({username : req.body.username})

    const {username,email,password} =  req.body;

    if(exist){
        res.status(401).json({message:"User Already Exsist .."})
    }else{
        var pass =await bcrypt.hash(password,10)
        var result =await UserShemas.create({
            username:username,
            email:email,
            password : pass
        })

        var token = jwt.sign({id:result._id,username:result.username},SECRET_KEY)
    
        res.json({user:result,token:token})    
    }
})

Userrouter.post("/signin",async (req,res)=>{

    var {username,email,password} = req.body;

    var exist =await UserShemas.findOne({username : username})
    if(!exist){
       return res.status(401).json({message:"User Not Exsist .."})
    }

        var matchpassword =await bcrypt.compare(password,exist.password)

        if(!matchpassword){
            return res.status(401).json({message:"Wrong Credintials .."})
        }else{
            var jwtoken = jwt.sign({email:exist.email,username:exist.username,id:exist._id},SECRET_KEY)

            return res.status(401).json({message:"Success",user:exist,token:jwtoken})
        }
       
        
    
})


module.exports = Userrouter

