const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.reload = functions.https.onRequest(async (req, res) => {
  await admin.firestore().doc(`user/${req.query.uid}`).update({
    message: 'reload'
  });
  res.send('Reload message added');
});
