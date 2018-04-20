const express = require('express'),
    Joi = require('joi'),
    helmet = require('helmet'),
    logger = require('./logger'),
    morgan = require('morgan'),
    config = require('config');

    const app = express();
    const env = app.get('env');
    
    app.set('view engine', 'pug');

// Debuggers
const debug = require('debug')('app:startup');

// Routes
const coursesRoute = require('./routes/courses.routes');

debug(`App name is ${config.get('name')}`);
debug(`App mail server is ${config.get('mail.adress')}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
if (env === 'development') {
    debug(`starting morgan`);
    app.use(morgan('tiny'));
}

app.use('/api/courses', coursesRoute);

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    const title = 'Express App';
    const message = 'pug is cool';
    res.render('index', { title: title, message: message });
});

app.listen(port, () => {
    debug(`listening to port ${port}`);
});
