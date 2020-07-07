const {Genre,validate}= require('../model/genreModel');
const express= require('express');
const router= express.Router();
const auth= require('../middleware/auth')

//Genre Routers
router.get('/',async(req,res)=>{
    const genres= await Genre.find().sort("name");
    res.send(genres)
});

router.post('/',auth,async(req,res)=>{
    const {error} = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);
    let genre= new Genre({name: req.body.name});
    await genre.save();
    res.send(genre);
});

router.put('/:id',async (req,res)=>{
    const {error} = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);
    let genre= await Genre.findByIdAndUpdate(req.params.id, {name:req.body.name},{new:true});
    if(!genre) res.status(400).send("The genre with the given ID was not found.");
    res.send(genre);
});

router.delete('/:id',async (req,res)=>{
    const genre= await Genre.findByIdAndRemove(req.params.id)
    if(!genre)res.status(400).send("The genre with the given ID was not found.")
    res.send(genre);
});

router.get('/:id',async (req,res)=>{
    const genre= await Genre.findById(req.params.id);
    if(!genre) res.status(400).send("The genre with the given ID was not found.");
    res.send(genre);
 });


module.exports= router