const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys=require('../SecretKeys/keys');
const firebaseApp=keys.firebaseApp;

var router=express.Router();

passport.serializeUser((user,done)=>{
  done(null, user);
})

passport.deserializeUser((id,done)=>{
  done(null, id);
})

passport.use(
  new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/api/auth/google/callback',
    proxy: true
  },(accessToken, refreshToken, profile, done)=>{
    let userRef= firebaseApp.database().ref(`/Users/G${profile.id}`);
    userRef.once('value',(snapshot)=>{
      if(snapshot.val()==null){
        userRef.set({
          Email:profile._json.email,
          Privledges:'User',
          Name:profile.name
        },()=>{
          done(null,"G"+profile.id);
        })
      } else{
        done(null,"G"+profile.id);
      }
    })
  })
);

router.get('/google', passport.authenticate('google',{
  scope: ['profile','email']
}));

router.get('/google/callback', passport.authenticate('google'), (req,res)=>{
  res.redirect('/');
});

router.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/');
})

router.get('/current_user',(req,res)=>{
  res.setHeader('Access-Control-Allow-Credentials','true');
  res.send(req.user);
})

module.exports=router;