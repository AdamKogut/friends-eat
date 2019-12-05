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
    if(snapshot.val()!=null){
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

router.post('/',(req,res)=>{
  console.log(req.body);
  let userRef=firebaseApp.database().ref(`/Users/${req.user}`);
  userRef.once('value', snapshot=>{
    if(snapshot.val()!=null&&(snapshot.val().Group==null||snapshot.val().Group=='')){
      let user={};
      user[req.user]={
        Name:snapshot.val().Name,
        PaymentSystems:snapshot.val().PaymentSystems
      }
      let date=Date.now();
      let groupRef=firebaseApp.database().ref(`/Groups/${req.user+date}`);
      groupRef.set({
        Creator:req.user,
        Location:req.body.location,
        MaxUsers:req.body.MaxUsers,
        Name:req.body.name,
        Restrictions:req.body.restrictions,
        Private:req.body.private,
        Users:user
      }).then(()=>{
        userRef.set({
          ...snapshot.val(),
          Group:req.user+date
        }).then(()=>res.send({success:true}))
      })
    } else {
      console.log(snapshot.val())
      console.log(snapshot.val().Group)
      res.send({success:false});
      return;
    }
  }).catch((a)=>{console.log(a);res.send({success:false})})
})

module.exports=router;