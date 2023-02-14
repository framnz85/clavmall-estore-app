import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_DgEQaEabrQ6ffNpcfK1GFoHmCqXoKyY",
  authDomain: "clavmall-estore.firebaseapp.com",
  projectId: "clavmall-estore",
  storageBucket: "clavmall-estore.appspot.com",
  messagingSenderId: "341421985998",
  appId: "1:341421985998:web:51a38a1d6c1c3666b5809f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);