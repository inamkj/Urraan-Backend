const { create } = require('node:domain');
const { getDB } = require('../config/db.js');
const crypto = require('crypto');

function hashPassword(password) {
    return crypto 
        .createHash('sha256')
        .update(password)
        .digest('hex');
}

async function signupUser(data) {

    const db = getDB();
    const userCollection = db.collection('users');
    const existingUser = await userCollection.findOne({ email: data.email });

    if (existingUser) {
        throw new Error('User already exists');
    }


    const newUser = {
        username: data.username,
        email: data.email,
        password_hash: hashPassword(data.password),
        createdAt: new Date()
    }

    const result = await userCollection.insertOne(newUser);

    return{
        id: result.insertedId,
        username: newUser.username,
        email: newUser.email
    }
}


async function loginUser(data) {
    const db = getDB();
    const userCollection = db.collection('users');
    const users = db.collection('users');

    const user = await users.findOne({ email: data.email });

    if (!user) {
        throw new Error('User not found');
    }

    const hashedInput = hashPassword(data.password);

    if(hashedInput !== user.password_hash) {
        throw new Error('Invalid password');
    }

    return {
        id: user._id,
        username: user.username,
        email: user.email
    }
}


module.exports = {
    signupUser,
    loginUser
}