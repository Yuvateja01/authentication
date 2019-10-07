const express=require('express');
const app=express();
const route=require('./routes/auth')
const mongoose=require('mongoose');
// want to connect via atlas copy the  link from connect from your cluster

//else contiinue using compass
mongoose.connect('mongodb://localhost:27017/admin',
    {useNewUrlParser:true},
);

app.use(express.json());
app.use('/route',route);
app.listen(3000,()=>{
console.log("running on port 3000");
});