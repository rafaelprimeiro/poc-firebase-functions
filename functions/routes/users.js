var express = require('express');
var router = express.Router();

const admin = require('../config').admin;

let db = require('../config').db;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/token', function(req, res, next) {
  // const idToken = req.params.token.toString();
  var idToken = null;
  try {
    idToken = JSON.parse(req.body).stsTokenManager.accessToken;
  } catch(error) {
    res.status(401).send({ error: "Login failure." });
  }
  admin.auth().verifyIdToken(idToken).then(function(decodedToken) {
    let uid = decodedToken.uid;
    try {
      admin.auth().getUser(uid).then(userRecord => {
        let data = {
          token: idToken,
          uid: uid,
          email: userRecord.email
        };
        if (!userRecord.email.includes("@dafiti.com.br")) {
          res.status(401).send({ error: "Login failure." });
          return;
        }
        let addDoc = db.collection('dafiti').doc("google-"+uid).set(data).then(ref => {
            res.json(200, {error: null, data: {user: uid}});
          }).catch(error => {
            send.status(500).send({ error: error });
          });
      });
      
    } catch (error) {
      send.status(500).send({ error: error });
    }
  }).catch(function(error) {
    res.status(401).send({ error: "Login failure.", token: idToken});
  });
    
  // res.send('respond with a resource');
});

module.exports = router;
