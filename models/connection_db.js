const mongoose=require('mongoose');
require('dotenv').config();

const mongoUrl=process.env.MONGO_URL;

mongoose.connect(mongoUrl).then(()=>{
    console.log("mongoDB connected!");
})