require('dotenv').config();
const express=require('express');


const app=express();
app.use(express.json());

const PORT=process.env.PORT || 3080;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});
