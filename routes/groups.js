const express = require('express');
const keys=require('../SecretKeys/keys');
const firebaseApp=keys.firebaseApp;

var router=express.Router();

router.get('/',(req,res)=>{
  let groupRef= firebaseApp.database().ref(`/Groups`);
  groupRef.once('value',(snapshot)=>{
    if(snapshot.val()!=null){
      let tempReturn={}
      for(let i in snapshot.val()){
        if(snapshot.val()[i].Private==false && (snapshot.val()[i].MaxUsers-Object.keys(snapshot.val()[i].Users).length)>0){
          tempReturn[i]=snapshot.val()[i];
        }
      }
      res.send(tempReturn)
    } else {
      res.send({success:false})
    }
  })
})

router.post('/join',(req,res)=>{
  let groupRef=firebaseApp.database().ref(`/Groups/${req.body.groupName}/WaitingUsers/${req.user}`);
  let userRef=firebaseApp.database().ref(`/Users/${req.user}`);
  userRef.once('value', snapshot=>{
    console.log(snapshot.val())
    if(snapshot.val()!=null){
      console.log(snapshot.val())
      groupRef.set({
        Name:snapshot.val().Name,
        PaymentSystems:snapshot.val().PaymentSystems,
      }).then(()=>{
        res.send({success:true})
      })
    } else {
      res.send({success:false});
    }
  })
})

module.exports=router;