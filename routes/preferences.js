const express = require('express');
const keys=require('../SecretKeys/keys');
const firebaseApp=keys.firebaseApp;

var router=express.Router();

router.get('/',(req,res)=>{
  let userRef= firebaseApp.database().ref(`/Users/${req.user}`);
  userRef.once('value',(snapshot)=>{
    if(snapshot.val()!=null){
      let returnValue={};
      returnValue.diet=snapshot.val().Diet;
      returnValue.location=snapshot.val().Location;
      returnValue.restrictions=snapshot.val().Restrictions;
      returnValue.name=snapshot.val().Name;
      res.send(returnValue);
    } else {
      res.send({success:false});
    }
  })
})

router.post('/',(req,res)=>{
  let userRef= firebaseApp.database().ref(`/Users/${req.user}`);
  userRef.once('value',(snapshot)=>{
    if(snapshot.val()!=null){
      let tempUser=snapshot.val();
      if(req.body.nickName!=null)
        tempUser.Name.nickName=req.body.nickName;
      if(req.body.restrictions!=null)
        tempUser.Restrictions=req.body.restrictions;
      if(req.body.diet!=null){
        if(req.body.diet.value=='select'){
          tempUser.diet={};
        } else {
          tempUser.Diet=req.body.diet;
        }
      }
      if(req.body.location!=null)
        tempUser.Location=req.body.location;
      userRef.set(tempUser);
      res.send({success:true})
    } else {
      res.send({success:false})
    }
  });
})

router.delete('/',(req,res)=>{
  let userRef= firebaseApp.database().ref(`/Users/${req.user}`);
  userRef.once('value',(snapshot)=>{
    if(snapshot.val()!=null){
      for(let i in snapshot.val().Groups){
        let curr = snapshot.val().Groups[i];
        let groupRef=firebaseApp.database().ref(`/Groups/${curr}/Users/${req.user}`);
        groupRef.set({});
      }
      userRef.set({});
    }
  }).then(()=>res.send({success:true}))
})

module.exports=router;