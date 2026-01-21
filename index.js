const express=require('express');
const app=express();
require('dotenv').config();
const cors=require('cors');
const authRouter=require('./routes/authRouter');
const productRouter=require('./routes/productRouter');

//mongoDB connection
require('./models/connection_db');

const PORT=process.env.PORT || 8080;

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use('/auth',authRouter);
app.use('/products',productRouter); 

app.listen(PORT ,()=>{
    console.log(`server started at port ${PORT}`);
});