import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
  apiKey: "AIzaSyB8nQxc11xatNrBzQEBR0jgaKVzToReybc",
  authDomain: "test-2b56a.firebaseapp.com",
  projectId: "test-2b56a",
  storageBucket: "test-2b56a.appspot.com",
  messagingSenderId: "760456339435",
  appId: "1:760456339435:web:11025bab4c350c4c5f43ae",
  measurementId: "G-8RMVXRW2YQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };
