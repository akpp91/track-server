const express =require('express');
const mongoose=require('mongoose');
require('../models/User'); // Make sure the path is correct
const User=mongoose.model('User');
const jwt = require('jsonwebtoken')
const router = express.Router();

router.post('/signup', async (req, res) =>{
    const {email, password} =req.body;
   try {
    console.log(email);
    const user = new User({email, password})
    await user.save();

    
    const token = jwt.sign({user_Id:user._id}, 'MY_secret_key');
    res.send({token});

   } catch (error) {
    return res.status(422).send(error.message)
   }
})

router.post('/signin', async (request , res)=>
{
        const {email , password} = request.body;
        
        if (!email || !password) 
        {
            return res.status(422).send({error : 'must provide email and password'});
        }


        const user = await User.findOne({email});
            
            if (!user) {
                return res.status(422).send({error: 'email not found'});
            }

            try {
                await user.comparePassword(password);    
                const token = jwt.sign({user_Id:user._id}, 'MY_secret_key');
                res.send({token});

            } catch (error) {
                return res.status(422).send({error:'Invalid password'});
            } 

});
module.exports = router;