const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().admin);

let db = admin.firestore(functions.config().firebase);

module.exports.admin = admin;
module.exports.db = db;