const {Movie,validate}= require('../model/movieModel');
const {Genre}= require('../model/genreModel');
const express= require('express');
const { model } = require('mongoose');
const router= express.Router();

router.get('/', async (req,res)=>{
    const movies=await Movie.find().sort("name");
    res.send(movies);
});

router.post('/', async(req,res)=>{
    const {error}= validate(req.body);
    if(error) res.status(400).send(error.details[0].message);
    const genre= await Genre.findById(req.body.genreId);
    if(!genre) res.status(400).send("the genre id is invalid");

    let movie=  new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
          },
          numberInStock: req.body.numberInStock,
          dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save()
    res.send(movie);
});

router.put('/:id',async (req,res)=>{

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = await Movie.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
  res.send(movie);
});

router.delete('/:id', async (req,res)=>{
    const movie= await Movie.findByIdAndRemove(req.params.id);
    if(!movie) res.send(400).send("The movie with the given ID was not found.")
    res.send(movie);
});

router.get('/:id',async (req,res)=>{
   const movie= await Movie.findById(req.params.id);
   if(!movie) res.status(400).send("The movie with the given ID was not found.");
   res.send(movie);
});

module.exports= router