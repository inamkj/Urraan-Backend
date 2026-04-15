const routes = {
    GET: {},
    POST: {}
}

function registerRoute(method, path, handler) {
    routes[method][path] = handler;
}

function handleRequest(req, res) {
    const method  = req.method
    const url = req.url;

    const handler = routes[method]?.[url];

    if (handler) {
        handler(req, res);
    } else {    
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
}

module.exports = {
    registerRoute,
    handleRequest
}