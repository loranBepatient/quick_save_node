const express = require('express'),
    Joi = require('joi')
const app = express();

app.use(express.json());

const findCourse = (id) => {
    return courses.find((course) => {
        return course.id == parseInt(id);
    })
}

const validate = (object) => {
    const joiSchema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(object.body, joiSchema)
    return result
}

const port = process.env.PORT || 8080;


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

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/api/courses/', (req, res) => {
    res.json(courses);
});

app.get('/api/courses/:id', (req, res) => {
    course = findCourse(req.params.id)
    course ?
        res.json(course)
        : res.status('404').send('no course with this number')
    res.end();
});


app.get('/api/courses/:year/:month', (req, res) => {
    res.send({
        params: req.params,
        query: req.query || ''
    });
});

app.post('/api/courses', (req, res) => {
    try {
        const result = validate(req)
        if (result.error) {
            res.status(400).send(err.message);
        }
    } catch (err) {
        res.status(500);
    } finally {
        res.end();
    }
});

app.put('/api/courses/:id', (req, res) => {
    // look up to the course
    course = findCourse(req.params.id)
    if (!course)
        res.status('404').send('no course with this number')

    const result = validate(req)
    if (result.error)
        res.status(400).send(err.message);

    course.name = req.body.name;
    res.status(200).send(course)

})



app.listen(port, () => {
    console.log(`listening to port ${port}`)
})
