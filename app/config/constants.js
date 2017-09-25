import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyC-dxpeomQsl37WsnK-Szl2HxmwR3vK1UY",
    authDomain: "twitter-mock-ca2e5.firebaseapp.com",
    databaseURL: "https://twitter-mock-ca2e5.firebaseio.com",
    projectId: "twitter-mock-ca2e5",
    storageBucket: "twitter-mock-ca2e5.appspot.com",
    messagingSenderId: "1001951733489"
  }


firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export const usersDucksExpirationLength = 100000
export const usersExpirationLength = 100000
export const repliesExpirationLength = 100000
