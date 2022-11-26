import firebase from 'firebase/compat/app';

const firebaseConfig = {
	apiKey: 'AIzaSyC1YheH4e5di08UAS6bBvD4iOhma_cikBI',
	authDomain: 'social-website-f97ed.firebaseapp.com',
	projectId: 'social-website-f97ed',
	storageBucket: 'social-website-f97ed.appspot.com',
	messagingSenderId: '114917807147',
	appId: '1:114917807147:web:60f6e524f394efbf65066e',
};

//呼叫這個function
firebase.initializeApp(firebaseConfig);

export default firebase;
