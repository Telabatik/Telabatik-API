const { Firestore, Filter } = require('@google-cloud/firestore');
const db = new Firestore();

async function storeUser(id, data) {
  const userCollection = db.collection('users');
  return userCollection.doc(id).set(data);
}

async function isUserAvailable(username, email) {
  const userCollection = db.collection('users');
  const userSnapshot = await userCollection.where(Filter.or(
    Filter.where('username', '==', username),
    Filter.where('email', '==', email)
  )).get();
  return userSnapshot.empty;
}

async function fetchUserByUsername(username) {
  const userCollection = db.collection('users');
  const userSnapshot = await userCollection.where('username', '==', username).get();
  if (userSnapshot.empty) {
    return null;
  }
  const userDoc = userSnapshot.docs.find(doc => {
    return doc.data().username === username;
  });

  return userDoc.data();
}

async function fetchUserById(id) {
  const userDoc = await db.collection('users').doc(id).get();
  return userDoc.data();
}

async function storeUserScanHistory(userId, data) {
  const userDoc = await db.collection('users').doc(userId);
  const scanHistorySub = userDoc.collection('scanHistory');
  return scanHistorySub.doc(data.id).set(data);
}

async function fetchUserScanHistory(userId) {
  const userDoc = await db.collection('users').doc(userId);
  const scanHistorySnapshot = await userDoc.collection('scanHistory').get();
  return scanHistorySnapshot.docs.map((doc) => doc.data());
}

module.exports = { storeUser, isUserAvailable, fetchUserByUsername, fetchUserById, storeUserScanHistory, fetchUserScanHistory };