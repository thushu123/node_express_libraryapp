const mongoose = require('mongoose')
// const uri = 'mongodb://localhost:27017/LibraryApp'
const uri= 'mongodb+srv://mongodbusername:mongodbcloud@workspace.fvodq2b.mongodb.net/StudentManagement?retryWrites=true&w=majority'
mongoose.connect(uri)

//schema in mongoose
const schema =  mongoose.Schema 
const userSchema = new schema({
    user_name:String,
    email:String,
    password:String,

})
const studentSchema = new schema({
    name:String,
    email:String,
    class:String,
    marks:String
})

const userData = mongoose.model("users",userSchema)
const studentData=mongoose.model("students",studentSchema)
module.exports = {userData,studentData}

