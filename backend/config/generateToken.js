const jwt = require ("jsonwebtoken");

const generateToken= (id)=>{

    const jwtSecret = 'harshika';

    return jwt.sign({id},jwtSecret,{
        expiresIn:"30d",
    });
};

module.exports = generateToken;