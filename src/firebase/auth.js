import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { getFirebaseAuth, firebaseConfigured } from "./firebase";

/**
 * Firebase Authentication service.
 * All auth operations live here — UI components never call Firebase Auth SDK directly.
 */

export function registerUser(email, password) {
  if (!firebaseConfigured) {
    return Promise.reject(new Error("Firebase is not configured."));
  }
  return createUserWithEmailAndPassword(getFirebaseAuth(), email, password);
}

export function loginUser(email, password) {
  if (!firebaseConfigured) {
    return Promise.reject(new Error("Firebase is not configured."));
  }
  return signInWithEmailAndPassword(getFirebaseAuth(), email, password);
}

export function logoutUser() {
  if (!firebaseConfigured) {
    return Promise.reject(new Error("Firebase is not configured."));
  }
  return signOut(getFirebaseAuth());
}

export function setDisplayName(user, displayName) {
  if (!firebaseConfigured) {
    return Promise.reject(new Error("Firebase is not configured."));
  }
  return updateProfile(user, { displayName });
}

export function onAuthChange(callback) {
  if (!firebaseConfigured) {
    return () => {};
  }
  return onAuthStateChanged(getFirebaseAuth(), callback);
}

/**
 * Maps Firebase Auth error codes to user-friendly messages.
 */
export function getAuthErrorMessage(error) {
  const code = error?.code || "";
  const messages = {
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/email-already-in-use": "An account already exists with this email.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Check your connection and try again.",
    "auth/operation-not-allowed": "Email/password sign-in is not enabled for this project.",
    "auth/internal-error": "Something went wrong on our end. Please try again.",
  };
  return messages[code] || error?.message || "An unexpected error occurred.";
}
