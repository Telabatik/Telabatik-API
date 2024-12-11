const users = require('../server/users');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(userData) {
  if (!isUserAvailable(userData.username, userData.email)) {
    console.log("Username or email not available");
    return null;
  }

  const newUser = {
    id: crypto.randomUUID(),
    username: userData.username,
    email: userData.email,
    password: await bcrypt.hash(userData.password, 10)
  }

  users.push(newUser);
  console.log(users);
  
  return {
    user: trimUserObject({ ...newUser })
  };
}

function isUserAvailable(username, email) {
  const existingUser = users.filter((user) => (user.username === username) || (user.email === email))
  return existingUser.length === 0;
}

async function loginUser(userData) {
  const user = users.find((user) => user.username === userData.username);
  
  if (!user) {
    console.log("User not found");
    return null;
  }

  if (!await bcrypt.compare(userData.password, user.password)) {
    console.log("Incorrect password");
    return null;
  }

  return {
    user: trimUserObject({ ...user }),
    token: jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' })
  };
}

function trimUserObject(user) {
  if (user) {
    delete user.password;
  }

  return user;
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

module.exports = { registerUser, loginUser, getUserById };