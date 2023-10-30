import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCeutJFrwmCfhQzYna9yliTlih0CLFaOdo",
    authDomain: "wellconnect-a18ca.firebaseapp.com",
    projectId: "wellconnect-a18ca",
    storageBucket: "wellconnect-a18ca.appspot.com",
    messagingSenderId: "77756540694",
    appId: "1:77756540694:web:302566ddd988c6af9e5237",
    measurementId: "G-9B1M9BPWV0"
  };

  //initialise firebase
  const app= initializeApp(firebaseConfig)
  const auth =getAuth(app)
  const provider =new GoogleAuthProvider()
  export {auth,provider}