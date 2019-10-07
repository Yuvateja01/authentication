const jwt=require('jsonwebtoken');

function verify(req,res,next){
    const token=req.header("auth-token");
    if(!token) res.send("you cant access this");

    try{
        const verify=jwt.verify(token,"CODELANDPROJECT");
        req.user=verified;
    }
    catch(err){
        res.status(400).send("invalid token");

    }
}