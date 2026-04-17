
const { registerRoute } = require('./router.js');
const parseBody = require('../utils/parseBody.js');
const {signupController, loginController} = require('../controllers/authController.js');
const { register } = require('node:module');
const { create } = require('node:domain');
const { createPostController, getPostsController } = require('../controllers/postController.js');

registerRoute('GET', '/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Welcome to the home page!' }));
});

registerRoute('GET', '/test', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: 'Test route is working' }))
})

registerRoute('POST', '/signup', signupController);
registerRoute('POST', '/login', loginController);
registerRoute('POST', '/createpost', createPostController);
registerRoute('GET', '/getposts', getPostsController);