var firebase = require('firebase');
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};
// Initialize Firebase
let firebaseApp=firebase.initializeApp(firebaseConfig);

module.exports={
  googleClientID:process.env.GOOGLE_CLIENT_ID,
  googleClientSecret:process.env.GOOGLE_CLIENT_SECRET,
  firebaseApp:firebaseApp,
  cookieKey: process.env.COOKIE_KEY
}