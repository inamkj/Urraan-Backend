const parseBody = require('../utils/parseBody.js');
const { createPost, getPosts } = require('../services/postService.js');

async function createPostController(req, res) {
    try {
        const body = await parseBody(req);
        
        if (!body.userId || !body.title || !body.content) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User ID, title, and content are required' }));
            return;
        }

        const post = await createPost(body);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Post created', post }));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message }));
    }

}

async function getPostsController(req, res) {
    try {
        const posts = await getPosts();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Posts retrieved', posts }));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message }));
    }
}

module.exports = {
    createPostController,
    getPostsController
}