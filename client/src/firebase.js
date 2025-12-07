// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDw7RwN6GGLq7EiwrQ76zsk3H6dU7CIHs",
  authDomain: "frameme-dd69d.firebaseapp.com",
  projectId: "frameme-dd69d",
  storageBucket: "frameme-dd69d.firebasestorage.app",
  messagingSenderId: "310501327812",
  appId: "1:310501327812:web:e660efa75a8fff94f55a91",
  measurementId: "G-LZ0EF8NXLN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);