const mongoose=require('mongoose')
const Joi= require('joi')
const config= require('config')
const jwt= require('jsonwebtoken');

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
        maxlength: 200,
    },

});
userSchema.methods.generateauthToken= function(){   
        const token=jwt.sign({_id: this._id},config.get('jwtPrivateKey'));
        return token;
}

const User= mongoose.model("User",userSchema);

function validate(user){
const schema= {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(255).required()
}
  return Joi.validate(user, schema);
}


exports.User= User
exports.validate=validate