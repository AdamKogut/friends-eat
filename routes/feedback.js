var express = require('express');
var router = express.Router();
const keys=require('../SecretKeys/Keys');
const firebaseApp=keys.firebaseApp;

/* GET users listing. */
router.get('/', function(req, res) {
  let feedbackRef= firebaseApp.database().ref(`/Feedback`);
  feedbackRef.once('value',(snapshot)=>{
    if(snapshot.val()==null){
      res.send({success:false});
    } else {
      let key = Object.keys(snapshot.val());
      let feedbacks=[];
      for(let i in snapshot.val()){
        if(i=='temp')
          continue;
        feedbacks.push(snapshot.val()[i]);
      }
      shuffle(feedbacks);
      res.send(feedbacks)
    }
  })
});

router.get('/getUser', function(req, res){
  let userRef= firebaseApp.database().ref(`/Feedback/${req.user}`);
  userRef.once('value',(snapshot)=>{
    res.send(snapshot.val())
  })
})

router.post('/', function(req,res){
  let feedbackRef= firebaseApp.database().ref(`/Feedback/${req.user}`);
  let userRef= firebaseApp.database().ref(`/Users/${req.user}`);
  userRef.once('value',(snapshot)=>{
    feedbackRef.set({
      Title:req.body.title,
      Body:req.body.body,
      Name:snapshot.val().Name
    })
  })
  res.redirect('/');
})


function shuffle(arra1) {
  var ctr = arra1.length, temp, index;

  // While there are elements in the array
  while (ctr > 0) {
  // Pick a random index
      index = Math.floor(Math.random() * ctr);
  // Decrease ctr by 1
      ctr--;
  // And swap the last element with it
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
  }
  return arra1;
}

module.exports = router;