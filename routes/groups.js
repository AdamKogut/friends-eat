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
        Email:snapshot.val().Email,
      }).then(()=>{
        res.send({success:true})
      })
    } else {
      res.send({success:false});
    }
  })
})

router.post('/',(req,res)=>{
  let userRef=firebaseApp.database().ref(`/Users/${req.user}`);
  userRef.once('value', snapshot=>{
    if(snapshot.val()!=null&&(snapshot.val().Group==null||snapshot.val().Group=='')){
      let user={};
      user[req.user]={
        Name:snapshot.val().Name,
        PaymentSystems:snapshot.val().PaymentSystems,
        Email:snapshot.val().Email,
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
      res.send({success:false});
      return;
    }
  }).catch(()=>{res.send({success:false})})
})

router.get('/mine',(req,res)=>{
  let userRef=firebaseApp.database().ref(`/Users/${req.user}/Group`);
  userRef.once('value',snapshot=>{
    if(snapshot.val()!=null){
      let groupRef=firebaseApp.database().ref(`/Groups/${snapshot.val()}`);
      groupRef.once('value',groupSnap=>{
        res.send(groupSnap);
      })
    } else {
      res.send({success:false});
    }
  })
})

router.post('/remove',(req,res)=>{
  //recieve target uid, uid
  let userRef=firebaseApp.database().ref(`/Users/${req.user}/Group`);
  userRef.once('value', snapshot=>{
    let groupRef=firebaseApp.database().ref(`/Groups/${snapshot.val()}/Users/${req.body.targetUid}`);
    groupRef.once('value',groupSnap=>{
      let removeRef=firebaseApp.database().ref(`/Groups/${snapshot.val()}/RemovedUsers/${req.body.targetUid}`);
      removeRef.set(groupSnap.val());
      groupRef.set({});
      let targetUserRef=firebaseApp.database().ref(`/Users/${req.body.targetUid}/Group`);
      targetUserRef.set({});
    })
  }).catch(()=>res.send({success:false})).then(()=>res.send({success:true}))
})

router.post('/deny',(req,res)=>{
  //recieve target uid, uid
  let userRef=firebaseApp.database().ref(`/Users/${req.user}/Group`);
  userRef.once('value', snapshot=>{
    let groupRef=firebaseApp.database().ref(`/Groups/${snapshot.val()}/WaitingUsers/${req.body.targetUid}`);
    groupRef.once('value',groupSnap=>{
      let removeRef=firebaseApp.database().ref(`/Groups/${snapshot.val()}/RemovedUsers/${req.body.targetUid}`);
      removeRef.set(groupSnap.val());
      groupRef.set({});
    })
  }).catch(()=>res.send({success:false})).then(()=>res.send({success:true}))
})

router.post('/accept',(req,res)=>{
  //recieve target uid, uid
  let targetUserRef=firebaseApp.database().ref(`/Users/${req.body.targetUid}/Group`);
  targetUserRef.once('value',targetSnap=>{
    if(targetSnap.val()!=null&&targetSnap.val()!=''){
      res.send({success:'targetHasGroup'});
      return;
    }
    let userRef=firebaseApp.database().ref(`/Users/${req.user}/Group`);
    userRef.once('value', snapshot=>{
      let groupRef=firebaseApp.database().ref(`/Groups/${snapshot.val()}/WaitingUsers/${req.body.targetUid}`);
      groupRef.once('value',groupSnap=>{
        let removeRef=firebaseApp.database().ref(`/Groups/${snapshot.val()}/Users/${req.body.targetUid}`);
        removeRef.set(groupSnap.val());
        groupRef.set({});
      }).then(()=>{
        targetUserRef.set(snapshot.val()).then(()=>res.send({success:true}))
      })
    })
  }).catch(()=>res.send({success:false}))
})

router.delete('/',(req,res)=>{
  let userRef=firebaseApp.database().ref(`/Users/${req.user}/Group`);
  userRef.once('value', snapshot=>{
    let groupRef=firebaseApp.database().ref(`/Groups/${snapshot.val()}`);
    groupRef.once('value',groupSnap=>{
      for(let i in groupSnap.val().Users){
        let targetUserRef=firebaseApp.database().ref(`/Users/${i}/Group`);
        targetUserRef.set({});
      }
      userRef.set({});
      groupRef.set({});
    })
  }).catch(()=>res.send({success:false})).then(()=>res.send({success:true}))
})

module.exports=router;