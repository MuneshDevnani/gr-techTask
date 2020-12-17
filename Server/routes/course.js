const router = require('express').Router();
let Course = require('../models/course.model');

router.get('/', (req, res) => {
    Course.find()
    .populate({
        path:'students',
        populate : {path: 'students', model:'Student'}
    }).exec(function(err , std){
        res.json(std)
    })
});

router.post('/add', (req, res) => {
    const { coursename, description } = req.body
    if (!coursename || !description) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    const course = new Course({
        coursename,
        description
    })
    course.save().then(result => {
        res.json({message:'Course Added', course: result })
    })
        .catch(err => {
            console.log(err);
        })
});

router.get('/:id', (req, res) => {
    Course.findById(req.params.id)
        .then(course => res.json(course))
        .catch(err => res.status(400).json('Error :' + err))
});

router.delete('/:id', (req, res) => {
        Course.findOne({ _id: req.params.id })
        .exec((err, course) => {
            if (err || !course) {
                return res.status(422).json({ error: err })
            }
            course.remove()
                .then(result => {
                    res.json({message:'Course deleted.'})
                }).catch(err => {
                    console.log(err);
                })
        })
});

router.post('/update/:id', (req, res) => {
    Course.findById(req.params.id)
        .then(course => {
            course.coursename = req.body.coursename;
            course.description = req.body.description;

            course.save()
                .then(course => res.json({message:'Course Updated.'}))
                .catch(err => res.status(400).json('Error :' + err))
        })
        .catch(err => res.status(400).json('Error :' + err))
});

module.exports = router;