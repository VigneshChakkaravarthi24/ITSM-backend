const jwt=require("jsonwebtoken")
module.exports =generateJWT=(email)=>{
const token = jwt.sign({
    email:email
},'itsm',{expiresIn:'4h'})
return token
}