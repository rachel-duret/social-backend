const {verify} = require('jsonwebtoken');

const validateToken =async (req, res, next)=>{
    const accessToken = req.header('accessToken');
    console.log(req.header)

    if (!accessToken) {
        return res.status(401).json(' You are not logged in !');
    }

    try{
        const validToken = verify(accessToken, 'RANDOM_TOKEN_SECRET');
        req.user = validToken;

        if(validToken){
            return next();
        }

    }catch(err){
        res.status(500).json(err)

    }

}

module.exports = {validateToken};