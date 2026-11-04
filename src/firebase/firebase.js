import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

/**
 * Centralized Firebase configuration.
 *
 * All values come from environment variables (see .env.example).
 * The web config values (apiKey, databaseURL, etc.) are public-facing
 * client identifiers — they are NOT secrets. Never place service-account
 * keys or admin credentials here.
 */

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const REQUIRED_KEYS = ["apiKey", "authDomain", "databaseURL", "projectId", "appId"];

/** Keys still missing from the environment, e.g. ["apiKey", "appId"]. */
export const missingFirebaseKeys = REQUIRED_KEYS.filter(
  (key) => !firebaseConfig[key],
);

/** True only when every required env var is present. */
export const firebaseConfigured = missingFirebaseKeys.length === 0;

function ensureConfigured() {
  if (!firebaseConfigured) {
    throw new Error(
      `Firebase is not configured. Missing environment variables: ${missingFirebaseKeys
        .map((key) => `VITE_FIREBASE_${key.replace(/([A-Z])/g, "_$1").toUpperCase()}`)
        .join(", ")}. Copy .env.example to .env and fill in the values.`,
    );
  }
}

/** Lazy singleton — Firebase is initialized on first use, not at module load. */
export function getFirebaseApp() {
  ensureConfigured();
  if (!app) {
    app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  }
  return app;
}

/** Firebase Authentication instance (lazy). */
export function getFirebaseAuth() {
  ensureConfigured();
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}

/** Realtime Database instance (lazy). */
export function getFirebaseDatabase() {
  ensureConfigured();
  if (!database) {
    database = getDatabase(getFirebaseApp());
  }
  return database;
}

let app = null;
let auth = null;
let database = null;
