import {
  ref,
  get,
  set,
  update,
  push,
  remove,
  onValue,
  off,
} from "firebase/database";

import { getFirebaseDatabase, firebaseConfigured } from "./firebase";

/**
 * Firebase Realtime Database service.
 * All database operations live here — UI components never call the RTDB SDK directly.
 * Every path is scoped under users/{uid}/ so users only access their own data.
 * (Enforced by database rules — see database.rules.json.)
 */

function db() {
  if (!firebaseConfigured) {
    throw new Error("Firebase is not configured.");
  }
  return getFirebaseDatabase();
}

function userRef(uid, path = "") {
  return ref(db(), path ? `users/${uid}/${path}` : `users/${uid}`);
}

/* ---- Profile ---- */

export function getProfile(uid) {
  return get(userRef(uid, "profile")).then((snap) => snap.val());
}

export function setProfile(uid, profile) {
  return set(userRef(uid, "profile"), profile);
}

export function updateProfile(uid, updates) {
  return update(userRef(uid, "profile"), updates);
}

/* ---- Subscription ---- */

export function getSubscription(uid) {
  return get(userRef(uid, "subscription")).then((snap) => snap.val());
}

export function setSubscription(uid, subscription) {
  return set(userRef(uid, "subscription"), subscription);
}

/* ---- Home ---- */

export function getHome(uid) {
  return get(userRef(uid, "home")).then((snap) => snap.val());
}

export function setHome(uid, home) {
  return set(userRef(uid, "home"), home);
}

/* ---- Rooms ---- */

export function getRooms(uid) {
  return get(userRef(uid, "rooms")).then((snap) => snap.val() || {});
}

export function getRoom(uid, roomId) {
  return get(userRef(uid, `rooms/${roomId}`)).then((snap) => snap.val());
}

export function addRoom(uid, room) {
  const newRef = push(userRef(uid, "rooms"));
  return set(newRef, room).then(() => newRef.key);
}

export function updateRoom(uid, roomId, updates) {
  return update(userRef(uid, `rooms/${roomId}`), updates);
}

export function deleteRoom(uid, roomId) {
  return remove(userRef(uid, `rooms/${roomId}`));
}

export function subscribeToRooms(uid, callback) {
  const r = userRef(uid, "rooms");
  onValue(r, callback);
  return () => off(r);
}

/* ---- ESP32 Boxes ---- */

export function getEsp32Boxes(uid) {
  return get(userRef(uid, "esp32Boxes")).then((snap) => snap.val() || {});
}

export function getEsp32Box(uid, boxId) {
  return get(userRef(uid, `esp32Boxes/${boxId}`)).then((snap) => snap.val());
}

export function addEsp32Box(uid, box) {
  const newRef = push(userRef(uid, "esp32Boxes"));
  return set(newRef, box).then(() => newRef.key);
}

export function updateEsp32Box(uid, boxId, updates) {
  return update(userRef(uid, `esp32Boxes/${boxId}`), updates);
}

export function deleteEsp32Box(uid, boxId) {
  return remove(userRef(uid, `esp32Boxes/${boxId}`));
}

export function subscribeToEsp32Boxes(uid, callback) {
  const r = userRef(uid, "esp32Boxes");
  onValue(r, callback);
  return () => off(r);
}

/* ---- Devices ---- */

export function getDevices(uid) {
  return get(userRef(uid, "devices")).then((snap) => snap.val() || {});
}

export function getDevice(uid, deviceId) {
  return get(userRef(uid, `devices/${deviceId}`)).then((snap) => snap.val());
}

export function addDevice(uid, device) {
  const newRef = push(userRef(uid, "devices"));
  return set(newRef, device).then(() => newRef.key);
}

export function updateDevice(uid, deviceId, updates) {
  return update(userRef(uid, `devices/${deviceId}`), updates);
}

export function deleteDevice(uid, deviceId) {
  return remove(userRef(uid, `devices/${deviceId}`));
}

export function subscribeToDevices(uid, callback) {
  const r = userRef(uid, "devices");
  onValue(r, callback);
  return () => off(r);
}

/* ---- Onboarding check ---- */

export async function hasCompletedOnboarding(uid) {
  const home = await getHome(uid);
  return home != null && home.name != null;
}

/* ---- Save full onboarding configuration atomically ---- */

export async function saveOnboardingConfiguration(uid, config) {
  const { home, room, esp32Box, devices } = config;

  const updates = {};
  updates[`users/${uid}/home`] = home;

  const roomKey = push(userRef(uid, "rooms")).key;
  updates[`users/${uid}/rooms/${roomKey}`] = room;

  const boxKey = esp32Box.boxId || push(userRef(uid, "esp32Boxes")).key;
  const boxData = { ...esp32Box, boxId: boxKey, roomId: roomKey };
  updates[`users/${uid}/esp32Boxes/${boxKey}`] = boxData;

  if (devices && devices.length > 0) {
    for (const device of devices) {
      const deviceKey = push(userRef(uid, "devices")).key;
      updates[`users/${uid}/devices/${deviceKey}`] = {
        ...device,
        roomId: roomKey,
        esp32BoxId: boxKey,
        createdAt: Date.now(),
      };
    }
  }

  updates[`users/${uid}/profile`] = {
    createdAt: Date.now(),
    onboardingCompleted: true,
  };

  return update(ref(db(), ""), updates);
}

/* ---- Device state control ---- */

export function setDeviceDesiredState(uid, deviceId, state) {
  return update(userRef(uid, `devices/${deviceId}`), {
    desiredState: state,
    desiredStateAt: Date.now(),
  });
}
