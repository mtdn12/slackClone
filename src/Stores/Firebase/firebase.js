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
    this.database = app.database
    this.auth = app.auth()
    this.db = app.database()
    this.userRef = this.db.ref('users')
    this.channelRef = this.db.ref('channels')
    this.messageRef = this.db.ref('messages')
    this.storageRef = app.storage().ref()
  }
  // Create and Sign in user
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)
  // Sigout
  doSignOut = () => this.auth.signOut()
  // Save user to data base
  doSaveUserToDatabase = user =>
    this.userRef.child(user.uid).set({
      name: user.displayName,
      avatar: user.photoURL,
    })
  // user api
  user = uid => this.db.ref(`users/${uid}`)

  // Action when auth stage change
  onAuthUserListener = callback =>
    this.auth.onAuthStateChanged(auth => {
      callback(auth)
    })
  // Create channel
  doCreateChannel = values => {
    return new Promise((resolve, reject) => {
      const key = this.channelRef.push().key
      const newChannel = {
        id: key,
        name: values.channelName,
        details: values.channelDetails,
        createdBy: {
          name: values.user.displayName,
          avatar: values.user.photoURL,
        },
      }
      resolve(this.channelRef.child(key).update(newChannel))
    })
  }
  // on channel changes listenr
  onChannelsChangeListener = callback => {
    this.channelRef.on('child_added', snap => {
      callback(snap.val())
    })
  }
  // Remove listener
  offChannelsListener = () => {
    this.channelRef.off()
  }
  // Messages api
  doCreateMessage = data => {
    return new Promise((resolve, reject) => {
      const message = {
        user: {
          id: data.user.uid,
          name: data.user.displayName,
          avatar: data.user.photoURL,
        },
        timestamp: app.database.ServerValue.TIMESTAMP,
      }
      if (data.content) {
        message['content'] = data.message
      } else {
        message['image'] = data.image
      }
      return this.messageRef
        .child(data.channel.id)
        .push()
        .set(message)
        .then(() => resolve('Create message success'))
        .catch(err => reject(err))
    })
  }
}

export default new Firebase()
