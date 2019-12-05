var express = require('express');
var router = express.Router();
var auth=require('./auth');
var feedback=require('./feedback');
var groups=require('./groups');
var calendar=require('./calendar');
var preferences=require('./preferences');
var axios=require('axios')
const keys=require('../SecretKeys/keys');
const firebaseApp=keys.firebaseApp;

router.use('/auth',auth);
router.use('/feedback', feedback);
router.use('/groups', groups);
router.use('/preferences',preferences);
router.use('/calendar',calendar)

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

router.post('/invite',(req,res)=>{
  let userRef= firebaseApp.database().ref(`/Users`);
  let f=false;
  userRef.once('value',snapshot=>{
    for(let i in snapshot.val()){
      if(req.body.email==snapshot.val()[i].Email){
        f=true;
        if(snapshot.val()[i].Reports!=null&&snapshot.val()[i].Reports.length>3){
          res.send({success:'accountNotFound'});
          return;
        }
        if(snapshot.val()[i].Group!=null){
          res.send({success:'hasGroup'});
          return;
        }
        let getGroupRef=firebaseApp.database().ref(`/Users/${req.user}`);
        getGroupRef.once('value',groupSnap=>{
          let groupRef=firebaseApp.database().ref(`/Groups/${groupSnap.val().Group}`);
          groupRef.once('value',gSnap=>{
            let tempRestrictions='';
            for(let i in gSnap.val().Restrictions){
              tempRestrictions+=gSnap.val().Restrictions[i]+', '
            }
            if(tempRestrictions.length==0){
              tempRestrictions='none';
            } else {
              tempRestrictions=tempRestrictions.substr(0,tempRestrictions.length-2)
            }
            var template_params = {
              "email": req.body.email,
              "name": `${groupSnap.val().Name.nickName} ${groupSnap.val().Name.familyName}`,
              "restrictions": tempRestrictions,
              "location": gSnap.val().Location,
              "site": `https://localhost:3000/invite?group=${groupSnap.val().Group}&user=${i}`
            }
            
            var service_id = "friendseat";
            var template_id = "friends_eat_invite";
            axios.post('https://api.emailjs.com/api/v1.0/email/send',{
              service_id:service_id,
              template_id:template_id,
              user_id:keys.emailjsKey,
              template_params:template_params
            })
            res.send({success:true});
            return;
          })
        })
      }
    }
    if(!f){
      res.send({success:'accountNotFound'});
      return;
    }
    
  }).catch(()=>res.send({success:false}));
})

module.exports = router;
