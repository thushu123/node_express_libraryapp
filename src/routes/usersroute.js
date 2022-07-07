const express= require('express');
const router = express.Router();
const {userData} = require('./../../config/connection')
router.get('/',(req,res)=>{
userData.find().then((users)=>{

})
})
module.exports = router;