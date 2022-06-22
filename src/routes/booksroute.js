const express = require('express');
// const bookData = require('./../../config/connection');
const router = express.Router();
//getting bookschema from connection.js
const { bookData } = require('./../../config/connection')
const {isLoggedIn} = require('./../../config/authentication')
const bookFunction = (books) => {


    router.get('/',isLoggedIn, (req, res) => {
        bookData.find().then((books) => {
            res.render('books', { books })

        })
    })
    router.get('/addbook',isLoggedIn, (req, res) => {

        res.render('addbook')
    })
    //async and await are using to avoid lagging of data adding and showing.
    //Otherwise there will be some lag to show tyhe added data in browser
    router.post('/addbook', async (req, res) => {

        const bookDeatils = {
            bookName: req.body.bookName,
            author: req.body.author,
            genre: req.body.genre,
            image: req.body.image

        }
        console.log(bookDeatils);
        let data = bookData(bookDeatils)
        await data.save()
        res.redirect('/books')
        // res.send('books added')
    })
    //to get details by passsing array index as parameter
    // router.get('/:index', (req, res) => {
    //     //getting index position of book objects
    //     let index = req.params.index;
    //     console.log('index', index);
    //     res.render('bookdetails', { books, index })
    //     // res.send('bookdeatils');
    // })
    router.get('/:id',isLoggedIn, (req, res) => {

        let id = req.params.id;
        //bookData.findOne({_id:id}).then((book)=>{
         //  return and go to bookdetails page
        // })
        bookData.findById(id).then((book) => {
            res.render('bookDetails', { book })
            console.log('book', book)
        })
        console.log('id', id)

    })
    router.get('/edit/:id',isLoggedIn,(req,res)=>{
        id=req.params.id ;
        bookData.findById(id).then((book)=>{
            res.render('editbook',{book})
        })
    })
    router.post('/edit/:id',(req,res)=>{
        const id = req.params.id 
        const book={
            bookName : req.body.bookName ,
            author  :req.body.author,
            genre :req.body.genre,
            image:req.body.image
        }
        console.log('book',book);
        bookData.findByIdAndUpdate(id,{$set:{
            bookName :book.bookName,
            author:book.author,
            genre:book.genre,
            image:book.image
        }}).then((result)=>{
            console.log('res',result)
            res.redirect('/books')
        })
    })
    router.get('/delete/:id',isLoggedIn,(req,res)=>{
        id=req.params.id ;
        bookData.findByIdAndDelete(id).then((result)=>{
         console.log('delete res',result)
         res.redirect('/books')
        })
       
    })
    return router
}
module.exports = bookFunction


