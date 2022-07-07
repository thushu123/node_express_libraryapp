const session = require('express-session')
const mongo=require('connect-mongodb-session')(session)

const mystore = new mongo({
    uri : 'mongodb+srv://mongodbusername:mongodbcloud@workspace.fvodq2b.mongodb.net/StudentManagement?retryWrites=true&w=majority',
    collection:"mysession"
}) 
const isLoggedIn = (req,res,next)=>{
    if(req.session.isAuth){
        //go to next route
        next()
    }else {
        res.redirect('/login')
    }
}
module.exports = {mystore,isLoggedIn}
