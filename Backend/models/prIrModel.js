const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username: {type: String,required:true},
    institute_id: {type:Number,required: true, unique: true},
    branch:{type: String,required:true},
    role:{type:String,required:true},
});

module.exports=mongoose.model('User',roleSchema);
