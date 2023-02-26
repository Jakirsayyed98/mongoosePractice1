const  mongoose = require('mongoose');
const express = require('express');
const app =express();
const PORT = 5000;
const dbURL = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.0/E-commerceDB";
mongoose.set({strictQuery:true})
const Userrouter = require('./RoutesData/UserRoutes')

app.use(express.json());

app.use("/user",Userrouter)


mongoose.connect(dbURL).then(()=>{
    app.listen(PORT,()=>{
        console.log("Server was started on port number "+PORT);
    })
}).catch((error)=>{
    console.log("Connection Error "+error);
})
