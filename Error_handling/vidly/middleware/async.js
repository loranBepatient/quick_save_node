const asyncMiddleware = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        }
        catch (exception) {
            next(exception);
        }
    }
};

module.exports = asyncMiddleware;