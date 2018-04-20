const http = require('http');


const routeManager = (req, res) => {
    switch (req.url) {
        case '/':
            res.write('hello world');
            res.end();

            break;
            
        case '/api/courses':
            res.write(JSON.stringify([1,3,4]));
            res.end();

            break;

        default:
            res.write('forbidden access');
            res.end();
            break;
    }
}


const server = http.createServer(routeManager);
server.listen(8080)
