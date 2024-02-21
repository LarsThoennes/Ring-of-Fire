import { initializeApp } from 'firebase/app';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import 'firebase/database'; // Importieren Sie das Database-Modul, falls Sie es verwenden möchten

// Ihre Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyC24SDOASQe3mXXNCx4Veuy_ycJ2OhlGwM",
  authDomain: "ring-of-fire-fed0d.firebaseapp.com",
  databaseURL: "https://ring-of-fire-fed0d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ring-of-fire-fed0d",
  storageBucket: "ring-of-fire-fed0d.appspot.com",
  messagingSenderId: "655954164765",
  appId: "1:655954164765:web:e3f4f3e4f0a442a47a9af4"
};

// Firebase initialisieren
const firebaseApp = initializeApp(firebaseConfig);

// Ihre Angular-Anwendungskonfiguration
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    // Hier können Sie andere Anbieter hinzufügen, die Sie benötigen
  ]
};
