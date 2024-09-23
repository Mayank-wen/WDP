const mongoose =require("mongoose")
const userschema = new mongoose.Schema({

    usernmae:{
        type:String,
        required:true,
        index:{unique:true}
    },
    email:{
        type:String,
        required:true,
        index:{unique:true}
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    }
},
{
    timestamps:true
});
const User =mongoose.model('User',userschema);
module.exports=User
