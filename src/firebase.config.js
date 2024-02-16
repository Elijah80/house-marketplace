import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDNUaTspiL2BI6TS5-p0nJX9DcNmnK7EAU',
	authDomain: 'house-marketplace-66fcc.firebaseapp.com',
	projectId: 'house-marketplace-66fcc',
	storageBucket: 'house-marketplace-66fcc.appspot.com',
	messagingSenderId: '169675797023',
	appId: '1:169675797023:web:dd7fd90d8eff42800bdb2a',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()

// userRef value = prgXBUWhYMc0QOwjuJu9sHyoLqF3
