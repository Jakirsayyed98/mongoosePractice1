const mongoose = require('mongoose');

const UserShemas = mongoose.Schema({
    username :{
        type : String,
        require : true
    },
    email :{
        type:String,
        require:false
    },
    password:{
        type:String,
        require : true
    },

},{timestamps:true})


module.exports = mongoose.model('User',UserShemas)