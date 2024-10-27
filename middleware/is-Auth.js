const jwt = require('jsonwebtoken');

const isAuth = (req,res,next)=>{
    const secretKey = 'itsm';
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1].replace('"','');

    if (!token) {
        return res.sendStatus(401); 
    }
    jwt.verify(token, secretKey, (err, decodedToken) => {
        if (err) {
        
            return res.status(403).json({errorMessage:"Unauthorized",error:err}); // Forbidden
        }

        // Destructure the payload to extract email and quizCode
        const { email } = decodedToken;
        req.email = email
        // Proceed to the next middleware or route handler
        next()
    });
    
}
module.exports  ={isAuth}