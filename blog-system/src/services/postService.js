const { getDB } = require('../config/db.js');

async function createPost(data) {
    const db = getDB();
    const postCollection = db.collection('posts');
    const newPost = {
        author_id: data.userId,
        title: data.title,
        content: data.content,
        createdAt: new Date()
    }

    const result = await postCollection.insertOne(newPost);

    return {
        _id: result.insertedId,
        ...newPost
    }
}

async function getPosts() {
    const db = getDB();
    const postCollection = db.collection('posts');
    const posts = await postCollection.find().toArray();

    return posts
}

module.exports = {
    createPost,
    getPosts
}