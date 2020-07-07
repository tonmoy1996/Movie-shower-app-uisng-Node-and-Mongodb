const express= require('express');
const mongoose= require('mongoose')
const app= express();
const path= require('path')
const {createAuthor,createCourse,getCourse,Author, Course}= require('./model/db');
const author= require('./controller/author');
const user= require('./controller/user');
const customer= require('./controller/customer');
const movie= require('./controller/movie');
const genre= require('./controller/genre');
const auth= require('./controller/auth')
const config= require('config')


//add private key using--> set Node_jwtPrivateKey="value"
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
  }

//database connect
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/vidly',{ useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>console.log("Database connected successfully"))
.catch(err=> console.error("error raise",err))

app.use(express.json());
app.set('view engine','ejs');
app.set('views','./views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname,'public')))

app.get('/',async (req,res)=>{
    // createCourse("Node","5edf0f269102362e842a7d5a");
    // const data= await getCourse()
    // const author= data[0].author
    // const newdata= await Author.find({_id: author})
    // console.log(newdata[0])
    res.send("Course is created ")
});

app.get('/create',async (req,res)=>{

   const auther= await Author.find({name: "Robi"})
  
    await createCourse("Ajax", new Author({
        name: auther[0].name,
        bio: auther[0].bio,
        website: auther[0].website
    }))
    res.send("Create course")
})


//Routes
app.use('/author',author);
app.use('/user',user);
app.use('/customer',customer);
app.use('/movie',movie);
app.use('/genre',genre);
app.use('/auth',auth);

const port= process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`server start at ${port}..`)
});
