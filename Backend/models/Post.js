const mogoose= require('mongoose');

const postSchema=new mongoose.Schema({
    username: {type:String, required:true},
    branch: {type:[String], required:true,default:[user]},
    description: {type:[String], required:true}
})
