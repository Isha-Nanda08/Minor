const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username: {type: String,required:true},
    institute_id: {type:Number,reuired: true, unique: true},
    password:{type: String,required: true},
    roles: {type: [String], default : ['user']}
});

module.exports=mongoose.model('User',userSchema);
