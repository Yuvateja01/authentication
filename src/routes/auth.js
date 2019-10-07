const router=require('express').Router();
const User=require('../models/user');
const { registrationValidate,loginValidate }=require('../routes/validation');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

router.post('/register', async (req,res)=>{
//validating using joi
const {error}=registrationValidate(req.body);
if(error) return res.send(error.details[0].message);
//checking if email already exsists
const email=await User.findOne({email:req.body.email});
if(email) return res.send("email already exsists");
//hashing
const algo=await bcrypt.genSalt(10);
const hash=await bcrypt.hash(req.body.password,algo);

    
try{
    const newuser=new User({
        name:req.body.name,
        email:req.body.email,
        password:hash
    });
    newuser.save();
    res.send("Welcome to Codeland");
    console.log(" 1 user pushed");
}
catch(err){
    res.statusCode=400;
    console.log(err);
}
});

router.post('/login',async (req,res)=>{
    const {error}=loginValidate(req.body);
if(error) return res.send(error.details[0].message);

const user=await User.findOne({email:req.body.email});
if(!user) return res.send("email or password is wrong");

const pass=await bcrypt.compare(req.body.password,user.password);
if(!pass) return res.send("invalid email or password");

const token=jwt.sign({_id:user._id},"CODELANDPROJECT");
res.header("auth-token",token).send(token);
})

module.exports=router;
