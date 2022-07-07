const expres = require('express')
const router = expres.Router()
const { studentData } = require('./../../config/connection')
const {isLoggedIn} = require('./../../config/authentication')

router.get('/', isLoggedIn,(req, res) => {
    studentData.find().then((students) => {
        res.render('students', { students })

    })
})
router.get('/addstudent',isLoggedIn, (req, res) => {
    res.render('addstudent')
})
router.post('/addstudent', async (req, res) => {

    const studentDetails = {
        name: req.body.name,
        email: req.body.email,
        class: req.body.class,
        marks: req.body.marks

    }
    console.log(studentDetails);
    let data = studentData(studentDetails)
    await data.save()
    res.redirect('/students')
    // res.send('books added')
})
router.get('/:id',isLoggedIn, (req, res) => {
    let result= confirm("Sure?")
    if(result){
        let id = req.params.id;
    
        studentData.findById(id).then((student) => {
            res.render('studentdetails', { student })
            console.log('student', student)
        })
        console.log('id', id)
    }



})
router.get('/edit/:id',isLoggedIn,(req,res)=>{
    id=req.params.id ;
    studentData.findById(id).then((student)=>{
        res.render('studentedit',{student})
    })
})
router.post('/edit/:id',isLoggedIn,(req,res)=>{
    const id = req.params.id 
    const student={
        name : req.body.name ,
        email  :req.body.email,
        class :req.body.class,
        marks:req.body.marks
    }
    console.log('student',student);
    studentData.findByIdAndUpdate(id,{$set:{
        name :student.name,
        email:student.email,
        class:student.class,
        marks:student.marks
    }}).then((result)=>{
        console.log('res',result)
        res.redirect('/students')
    })
})
router.get('/delete/:id',isLoggedIn,(req,res)=>{
    id=req.params.id ;
    studentData.findByIdAndDelete(id).then((result)=>{
     console.log('delete res',result)
     res.redirect('/students')
    })
   
})


module.exports = router;