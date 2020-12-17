const router = require('express').Router();
let Student = require('../models/student.model');
let Course = require('../models/course.model');

router.get('/', (req, res) => {
    Student.find()
    .populate({
        path:'course',
        populate : {path: 'course', model:'Course'}
    }).exec(function(err , std){
        res.json(std)
    })

});

router.get('/:id', (req, res) => {
    Student.findById(req.params.id)
        .then(student => res.json(student))
        .catch(err => res.status(400).json('Error :' + err))
});

router.post('/add', (req, res) => {
    const { firstname, lastname, email, contact, address, course } = req.body
    if (!firstname || !lastname || !email || !contact || !address || !course) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    const student = new Student({
        firstname,
        lastname,
        email,
        contact,
        address,
        course
    });
    Course.findOne({_id: course})
    .then(course=>{
        course.students.push(student._id)
        course.save()
    })
    student.save().then(result => {
        res.json({message:'Student Added', student: result })
    })
        .catch(err => {
            console.log(err);
        })
});

router.delete('/:id', (req, res) => {
    Student.findOne({ _id: req.params.id })
        .exec((err, student) => {
            if (err || !student) {
                return res.status(422).json({ error: err })
            }
            student.remove()
                .then(result => {
                    res.json({message:'Student deleted.'})
                }).catch(err => {
                    console.log(err);
                })
        })
})

router.post('/update/:id', (req, res) => {
    console.log(req.params.id);
    Student.findById(req.params.id)
        .then(student => {
            student.firstname = req.body.firstname;
            student.lastname = req.body.lastname;
            student.email = req.body.email;
            student.contact = req.body.contact;
            student.address = req.body.address;
            student.course = req.body.course

            student.save()
                .then(student => res.json('Student Record Updated.'))
                .catch(err => res.status(400).json('Error :' + err))
        })
        .catch(err => res.status(400).json('Error :' + err))
});
module.exports = router;