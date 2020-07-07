const mongoose= require('mongoose')

const authorSchema= new mongoose.Schema({
     name:{
        type: String,
        required: true,
        min: 3,
        max: 255,
     },
     bio:{
         type: String,
         required:true
     },
     website:{
         type: String,
         required:true
     }
});

const Author= mongoose.model('Author',authorSchema);

// const Course = mongoose.model('Course', new mongoose.Schema({
//     name: String,
//     author:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Author'
//     }
//   }));
const Course= mongoose.model('Course',new mongoose.Schema({
    name: String,
    author: authorSchema

}));

   async function getCourse(){
   return await Course.find({_id: "5edf35ad71f45c50cc8434de"})
    }


  async function createCourse(name, author) {
    const course = new Course({
      name, 
      author
    }); 
    
    const result = await course.save();
    console.log(result);
  }
  
async function createAuthor(){
 
    let author= new Author({
        name: "Robi",
        bio: "Thrill",
        website: "www.vidly.com"
    })
    let result= await author.save()
    console.log(result)

}

module.exports= {
    createAuthor,
    createCourse,
    getCourse,
    Course,
    Author
}