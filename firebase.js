import {initializeApp} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import {getStorage} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js";

export const firebaseConfig={
  apiKey:"AIzaSyBQpzc5xAvInmSCbzsZiy7TpD0OXVyij_4",
  authDomain:"jb-rrms-membership-system.firebaseapp.com",
  projectId:"jb-rrms-membership-system",
  storageBucket:"jb-rrms-membership-system.firebasestorage.app",
  messagingSenderId:"493815911364",
  appId:"1:493815911364:web:e8f2270cf73d93dd368a91"
};

export const app=initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
export const storage=getStorage(app);
