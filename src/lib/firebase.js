import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Identificador de la aplicación para las reglas de Firestore
export const APP_ID = 'framehire-v1';

// Asegúrate de copiar este objeto EXACTAMENTE de la consola de Firebase
// Configuración para el proyecto: framehire-b48f0
// src/lib/firebase.js
const firebaseConfig = {
  apiKey: "AIzaSyAYJbEQPxG6ShB49LhcEWeoXZmmuhwJXNU",
  authDomain: "framehire-b48f0.firebaseapp.com",
  projectId: "framehire-b48f0",
  storageBucket: "framehire-b48f0.firebasestorage.app",
  messagingSenderId: "522026115647",
  appId: "1:522026115647:web:425864f7d6b971f542ce8a",
  measurementId: "G-G5MEL3Y1V4"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios para usar en el resto de la app
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;