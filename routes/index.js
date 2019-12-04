var express = require('express');
var router = express.Router();
var auth=require('./auth');
var feedback=require('./feedback');
var groups=require('./groups');
var preferences=require('./preferences');
const keys=require('../SecretKeys/keys');
const firebaseApp=keys.firebaseApp;

router.use('/auth',auth);
router.use('/feedback', feedback);
router.use('/groups', groups);
router.use('/preferences',preferences)

router.post('/removeAccount',(req,res)=>{
  let userRef= firebaseApp.database().ref(`/Users/${req.user}`);
  userRef.once('value',(snapshot)=>{
    if(snapshot.val()!=null){
      if(snapshot.val().Groups!=null){
        for(let i in snapshot.val().Groups){
          let groupRef=firebaseApp.database().ref(`/Groups/${snapshot.val().Groups[i]}/Users/${req.user}`);
          groupRef.remove();
        }
      }
    } else {
      res.send({success:false})
      return;
    }
  })
  res.send({success:true})
})

module.exports = router;
