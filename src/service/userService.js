const users = require('../server/users');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { storeUser, isUserAvailable, fetchUserByUsername } = require('../service/firestoreService');

async function registerUser(userData) {
  if (!(await isUserAvailable(userData.username, userData.email))) {
    console.log("Username or email not available");
    return null;
  }

  const id = crypto.randomUUID();
  const newUser = {
    id: id,
    username: userData.username,
    email: userData.email,
    password: await bcrypt.hash(userData.password, 10)
  }

  await storeUser(id, newUser);
  
  return {
    user: trimUserObject({ ...newUser })
  };
}

async function loginUser(userData) {
  const user = await fetchUserByUsername(userData.username)
  
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

module.exports = { registerUser, loginUser };