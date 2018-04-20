const express = require('express'),
    Joi = require('joi'),
    helmet = require('helmet'),
    logger = require('./logger'),
    morgan = require('morgan'),
    config = require('config');

// Debuggers
const debug = require('debug')('app:startup');
const app = express();
const env = app.get('env');

debug(`App name is ${config.get('name')}`);
debug(`App mail server is ${config.get('mail.adress')}`);

app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
if (env === 'development') {
    debug(`starting morgan`);
    app.use(morgan('tiny'));
}
// app.use(express.static('public'));

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
    const title = 'Express App';
    const message = 'pug is cool';
    res.render('index', {title: title, message: message});
});

app.get('/api/courses/', (req, res) => {
    res.json(courses);
});

app.get('/api/courses/:id', (req, res) => {
    course = findCourse(req.params.id);
    course ?
        res.json(course)
        : res.status('404')
            .send('no course with this number');
    res.end();
});


app.get('/api/courses/:year/:month', (req, res) => {
    res.send({
        params: req.params,
        query: req.query || ''
    });
});

app.post('/api/courses', (req, res) => {
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

app.put('/api/courses/:id', (req, res) => {
    // look up to the course
    course = findCourse(req.params.id);
    course ?
        res.json(course)
        : res.status('404').send('no course with this number');
    res.end();
});

app.listen(port, () => {
    debug(`listening to port ${port}`);
});
