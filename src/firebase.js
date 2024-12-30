
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import  {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsSL5HWNTOSosyeGl9GdCTyFSAQIKfqq4",
  authDomain: "netflix-clone-67cf5.firebaseapp.com",
  projectId: "netflix-clone-67cf5",
  storageBucket: "netflix-clone-67cf5.firebasestorage.app",
  messagingSenderId: "536890428239",
  appId: "1:536890428239:web:a104876bbd61d58b10533a",
  measurementId: "G-PFBT4RRHNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//Note: This option uses the modular JavaScript SDK, which provides red

const  auth=getAuth(app)
const  db=getFirestore(app)

const signup=async(name,email,password)=>{
   try {
   const res= await createUserWithEmailAndPassword(auth,email,password);
   const user=res.user;
   await addDoc(collection(db,"user"),{
    uid:user.uid,
    name,
    authProvider:"local",
    email,
   })
    
   } catch (error) {
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(" "))
    
   }
}
const login= async (email,password)=>{
    try {
await signInWithEmailAndPassword(auth,email,password);

        
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))


    
    }
}
const logout=async()=>{
    signOut(auth);
}
export {auth,db,login,signup,logout}