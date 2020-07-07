const config= require('config')
const express= require('express');
const router= express.Router();
const _= require('lodash');
const bcrypt = require('bcrypt');
const Joi= require('joi');
const jwt= require('jsonwebtoken');
const {User}= require('../model/user_model');
//User router

router.post('/', async (req,res)=>{

 const {error}= validate(req.body);  
 if (error) return res.status(400).send(error.details[0].message);
 let user= await User.findOne({email: req.body.email});
 if(!user) res.status(400).send("Invalid Email or Password");
 const validUser = await bcrypt.compare(req.body.password, user.password);
 if (!validUser)res.status(400).send("Invalid Email or Password");

const token=user.generateauthToken()
res.send(token)
});

function validate(req){
    const schema= {
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(255).required()
    }
      return Joi.validate(req, schema);
    }
module.exports=router