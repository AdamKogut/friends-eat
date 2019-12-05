var express = require('express');
var router = express.Router();
const keys=require('../SecretKeys/keys');
const firebaseApp=keys.firebaseApp;

router.post('/',(req,res)=>{
  let userRef=firebaseApp.database().ref(`/Users/${req.user}/Group`);
  userRef.once('value',snapshot=>{
    req.body.date=req.body.date.replace(/\./g,"-");
    let groupRef=firebaseApp.database().ref(`/Groups/${snapshot.val()}/Dates/${req.body.date}`);
    groupRef.once('value',groupSnap=>{
      if(groupSnap.val()==null){
        res.send({success:true});
      }else{
        res.send(groupSnap.val());
      }
    });
  }).catch(()=>res.send({success:true}));
})

router.post('/save',(req,res)=>{
  if(req.body.info.RecipeName==''||req.body.info.Ingredients==''||req.body.info.Cost==''||!parseInt(req.body.info.Cost)){
    res.send({success:false});
    return;
  }
  let userRef=firebaseApp.database().ref(`/Users/${req.user}`);
  userRef.once('value',snapshot=>{
    req.body.info.Name=`${snapshot.val().Name.nickName} ${snapshot.val().Name.familyName}`;
    req.body.info.AttendingUsers={}
    req.body.info.AttendingUsers[req.user]={
      Name:snapshot.val().Name,
      Paid:'yes',
      PaymentSystems:snapshot.val().PaymentSystems
    }
    req.body.day=req.body.day.replace(/\./g,"-");
    req.body.info.Cost=parseInt(req.body.info.Cost);
    let groupRef=firebaseApp.database().ref(`/Groups/${snapshot.val().Group}/Dates/${req.body.day}`);
    groupRef.set(req.body.info);
    res.send({success:true});
  }).catch(()=>res.send({success:false}))
})

router.post('/saveCheckbox',(req,res)=>{
  let userRef=firebaseApp.database().ref(`/Users/${req.user}/Group`);
  userRef.once('value',snapshot=>{
    req.body.day=req.body.day.replace(/\./g,"-");
    let groupRef=firebaseApp.database().ref(`/Groups/${snapshot.val()}/Dates/${req.body.day}/AttendingUsers/${req.body.id}/Paid`);
    groupRef.set(req.body.val);
  }).catch(()=>res.send({success:false})).then(()=>res.send({success:true}))
})

router.post('/saveAttending',(req,res)=>{
  let userRef=firebaseApp.database().ref(`/Users/${req.user}`);
  userRef.once('value',snapshot=>{
    req.body.day=req.body.day.replace(/\./g,"-");
    let groupRef=firebaseApp.database().ref(`/Groups/${snapshot.val().Group}/Dates/${req.body.day}/AttendingUsers/${req.user}`);
    if(req.body.val){
      groupRef.set({
        Name:snapshot.val().Name,
        PaymentSystems:snapshot.val().PaymentSystems,
        Paid:false
      });
    } else {
      groupRef.set({})
    }
  }).catch(()=>res.send({success:false})).then(()=>res.send({success:true}))
})

module.exports = router;