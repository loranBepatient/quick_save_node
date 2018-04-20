const logger = (req, res, next) => {
    console.log(` login ${req.body}`)

    next()
}


module.exports = logger;
