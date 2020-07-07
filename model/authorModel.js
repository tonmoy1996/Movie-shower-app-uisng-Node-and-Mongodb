const mongoose=require('mongoose')
const Joi= reruire('joi')
const userSchema= new mongoose.Schema({
     name:{
         type: String,
         required: true,
         minlength: 5,
         maxlength: 50
     },
     email:{
         type: String,
         required: true,
         minlength: 5,
         maxlength: 50,
         unique: true
     },
     password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },

});

const User= mongoose.model("User",userSchema);

function validate(user){
const schema= {
    name: Joi.string.min(5).max(50).required(),
    email: Joi.string.min(5).max(50).required().email(),
    name: Joi.string.min(5).max(255).required()
}
  return Joi.validate(user, schema);
}


exports.User= User
exports.validate=validate