const parseBody = require('../utils/parseBody.js');
const { signupUser, loginUser } = require('../services/authService.js');



async function signupController(req, res) {
    try {
        const body = await parseBody(req);
        
        if (!body.username || !body.email) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Username and email are required' }));
            return;
        }

        const user = await signupUser(body);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User created in db', user }));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message }));
    }
}


async function loginController(req, res) {
    try {
        const body = await parseBody(req);
        if (!body.email || !body.password) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Email and password are required' }));
            return;
        }

        const user = await loginUser(body);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Login successful', user }));
    } catch (error) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message }));
    }
}
module.exports = {
    signupController,
    loginController

}