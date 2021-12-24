import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import env from './env';

const firebase_config = {
    apiKey: env.apiKey,
    authDomain: env.authDomain,
    projectId: env.projectId,
    storageBucket: env.storageBucket,
    messagingSenderId: env.messagingSenderId,
    appId: env.appId,
};

firebase.initializeApp(firebase_config);

export default firebase.firestore();