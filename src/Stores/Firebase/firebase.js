import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

var config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
}

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.database()
    this.userRef = this.db.ref('users')
  }
  // Create and Sign in user
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)
  // Save user to data base
  doSaveUserToDatabase = user =>
    this.userRef.child(user.uid).set({
      name: user.displayName,
      avatar: user.photoURL,
    })
  // user api
  user = uid => this.db.ref(`users/${uid}`)

  // Action when auth stage change
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(auth => {
      if (auth) {
        this.user(auth.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val()
            auth = {
              uid: auth.uid,
              email: auth.email,
              emailVerified: auth.emailVerified,
              providerData: auth.providerData,
              ...dbUser,
            }
            next(auth)
          })
      } else {
        fallback()
      }
    })
}

export default new Firebase()
