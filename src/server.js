const http = require('http');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
    console.log(request.url);

    switch (request.url) {
        case "/success":

            break;
        case "/badRequest":

            break;
        case "/unauthorized":

            break;
        case "/forbidden":

            break;
        case "/internal":

            break;
        case "/notImplemented":

            break;
        default:

            break;
    }
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on port 127.0.0.1:${port}`);
});