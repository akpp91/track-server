const jwt = require('jsonwebtoken');
const mongoose=require('mongoose');

const User= mongoose.model('User')

module.exports = (req ,res , next)=>{

const {authorization } = req.headers;

if (!authorization) {
    return res.status(401).send({error: 'You must be logged in.' })
}

const token= authorization.replace('Bearer ', '');

jwt.verify(token,'MY_secret_key', async (error, playload)=>{
    if (error) {
        return res.status(401).send({error :'u must logged in'})
    } 

    const {user_Id }= playload;

    const user= await User.findById(user_Id);

    req.user = user;
    next();
})
}