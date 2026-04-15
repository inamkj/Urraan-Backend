const {MongoClient} = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('blog-system');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

function getDB() {
    if (!db) {
        throw new Error('Database not initialized.');
    }
    return db;
}

module.exports = {
    connectDB,
    getDB
}