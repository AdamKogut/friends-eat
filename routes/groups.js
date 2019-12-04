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
      console.log(tempReturn)
      res.send(tempReturn)
    } else {
      res.send({success:false})
    }
  })
})

module.exports=router;