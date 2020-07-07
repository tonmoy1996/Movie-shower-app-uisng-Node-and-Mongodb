const express= require('express');
const router= express.Router();
const _= require('lodash');
const bcrypt = require('bcrypt');
const config= require('config')
const jwt= require('jsonwebtoken');


const {User, validate }= require('../model/user_model');
//User router

router.get('/', async (req,res)=>{
     const users= await User.find().sort('name');
     res.send(users);
});

//new use add
router.post('/new', async (req,res)=>{
   
   const {error}= validate(req.body);  
   if (error) return res.status(400).send(error.details[0].message);
   user = new User(_.pick(req.body, ['name','email','password']));
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(user.password, salt);
   await user.save();
   const token=user.generateauthToken()

   res.header('x-auth-token',token).send(user);
});

// user update 
router.put('/update/:id', async (req,res)=>{
 const {error}= validate(req.body);
 if (error) return res.status(400).send(error.details[0].message);

 const user = await User.findByIdAndUpdate(req.params.id,{
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
 },{ new: true }); 

if (!user) res.status(400).send("User with the given id is not found and check ");

res.send(user)
});

//user delete

router.delete('/delete/:id', async (req,res)=>{

    const user= await User.findByIdAndRemove(req.params.id);
    if (!user) res.status(400).send("User with the given id is not found and check ")
    res.send(user);
});

router.get('/:id', async (req,res)=>{

   const user= await User.findById(req.params.id);
   if (!user) res.status(400).send("User with the given id is not found and check ")
   res.send(user);
});

module.exports=router