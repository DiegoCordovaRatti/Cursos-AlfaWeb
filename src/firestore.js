import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB-mLm52sEOL8IZhCmEadZFQz31nHuIAiU",
    authDomain: "prueba-real-800f7.firebaseapp.com",
    projectId: "prueba-real-800f7",
    storageBucket: "prueba-real-800f7.appspot.com",
    messagingSenderId: "224125992698",
    appId: "1:224125992698:web:127eac65f4c187f3b81343"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const cursosCollection = collection(db, 'cursos')

export default cursosCollection