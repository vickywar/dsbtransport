

import firebase from 'firebase';
import firebaseconfig from './config.json';

const firebasehandler = firebase.initializeApp(firebaseconfig);

export default firebasehandler;