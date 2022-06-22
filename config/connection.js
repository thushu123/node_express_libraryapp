const mongoose = require('mongoose')
// const uri = 'mongodb://localhost:27017/LibraryApp'
const uri= 'mongodb+srv://mongodbusername:mongodbcloud@workspace.fvodq2b.mongodb.net/LibraryApp?retryWrites=true&w=majority'
mongoose.connect(uri)

//schema in mongoose
const schema =  mongoose.Schema 
const userSchema = new schema({
    user_name:String,
    email:String,
    password:String,

})

const bookSchema = new schema({
    bookName : String,
    author: String,
    genre: String,
    image:String
})
const authorSchema =new mongoose.Schema({
    name:String,
    nationality:String,
    known_for:String,
    image:String
})
//books= collection name
const bookData = mongoose.model("books",bookSchema)
const authorData= mongoose.model("authors",authorSchema)
const userData = mongoose.model("users",userSchema)
module.exports = {bookData,authorData,userData}

