const express = require('express');
const router = express.Router();

const courses = [{
    id: 1,
    name: 'course 1'
},
{
    id: 2,
    name: 'course 2'
},
{
    id: 3,
    name: 'course 3'
},
];


router.get('/', (req, res) => {
    res.json(courses);
});

router.get('/:id', (req, res) => {
    course = findCourse(req.params.id);
    course ?
        res.json(course)
        : res.status('404')
            .send('no course with this number');
    res.end();
});


router.get('/:year/:month', (req, res) => {
    res.send({
        params: req.params,
        query: req.query || ''
    });
});

router.post('/', (req, res) => {
    const isValidated = validate(req);
    if (!isValidated.error) {
        const newCourse = {
            id: courses.length + 1,
            name: isValidated.value.name
        };
        courses.push(newCourse);
        res.send(newCourse);
    } else {
        res.status(500).send('internal server error');
    }
    res.end();
});

router.put('/:id', (req, res) => {
    // look up to the course
    course = findCourse(req.params.id);
    course ?
        res.json(course)
        : res.status('404').send('no course with this number');
    res.end();
});


const findCourse = (id) => {
    return courses.find((course) => {
        return course.id == parseInt(id);
    });
};

const validate = (object) => {
    const joiSchema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(object.body, joiSchema);
};

module.exports = router;
