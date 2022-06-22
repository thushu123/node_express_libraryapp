const express = require('express');
const router = express.Router();
const { books, authors } = require('./../files/data')
const { authorData } = require('./../../config/connection');
const {isLoggedIn} = require('./../../config/authentication')


router.get('/', isLoggedIn,(req, res) => {
    authorData.find().then((authors) => {
        res.render('authors', { authors })
    })
})

router.get('/addauthor', (req, res) => {
    res.render('addauthor')
})
router.post('/addauthor',async (req, res) => {
    let authorDetails = {
        name: req.body.name,
        nationality: req.body.nationality,
        known_for: req.body.known_for,
        image: req.body.image
    }
    let data = authorData(authorDetails);
    await data.save();
    res.redirect('/authors')

})
// router.get('/:index', (req, res) => {
//     let index = req.params.index;
//     res.render('authordetails', { authors, index })
// })
router.get('/edit/:id',isLoggedIn,(req,res)=>{
    id=req.params.id ;
    authorData.findById(id).then((author)=>{
        res.render('editauthor',{author})
    })
})
router.post('/edit',(req,res)=>{
   const id= req.body.id ;
   let author = {
    name :req.body.name,
     nationality :req.body.nationality,
     known_for : req.body.known_for,
     image :req.body.image
   }
   console.log('id',id);

    console.log('author',author);
    authorData.findByIdAndUpdate(id,{$set:{
      name : author.name,
      nationality :author.nationality,
      known_for : author.known_for,
      image:author.image
    }}).then((result)=>{
        console.log('result',result)
        res.redirect('/authors')
    })
})
router.get('/delete/:id',isLoggedIn,(req,res)=>{
    id=req.params.id ;
    authorData.findByIdAndDelete(id).then((result)=>{
        res.redirect('/authors')
    })
})

router.get('/:id', isLoggedIn,(req, res) => {
    let id = req.params.id
    authorData.findById(id).then((author) => {
        res.render('authordetails', { author })
    })
})
module.exports = router