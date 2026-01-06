// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Validate Firebase environment variables
const requiredEnvVars = [
  'VITE_APIKEY',
  'VITE_AUTHDOMAIN',
  'VITE_PROJECTID',
  'VITE_STORAGEBUCKET',
  'VITE_MESSAGINGSENDERID',
  'VITE_APPID'
];

const missingVars = requiredEnvVars.filter(
  (varName) => !import.meta.env[varName]
);

if (missingVars.length > 0 && import.meta.env.PROD) {
  console.error(`❌ Missing Firebase environment variables: ${missingVars.join(', ')}`);
  console.error('Please check your .env.local file');
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID
};

// Initialize Firebase with error handling
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log("✅ Firebase initialized successfully");
} catch (error) {
  console.error("❌ Firebase initialization error:", error.message);
  throw error;
}

export { app };