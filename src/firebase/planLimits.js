/**
 * Plan limits for the subscription tiers.
 * Free plan: 1 room, 2 devices. Pro: unlimited everything.
 * These constants are used for client-side UX; actual enforcement
 * must happen in Firebase Security Rules (see database.rules.json).
 */

export const PLAN_LIMITS = {
  free: {
    maxRooms: 1,
    maxDevices: 2,
    analytics: false,
    schedules: false,
  },
  pro: {
    maxRooms: Infinity,
    maxDevices: Infinity,
    analytics: true,
    schedules: true,
  },
};

export const DEFAULT_PLAN = "free";

export function getPlanLimits(plan) {
  return PLAN_LIMITS[plan] || PLAN_LIMITS[DEFAULT_PLAN];
}

export function canAddRoom(plan, currentRoomCount) {
  const limits = getPlanLimits(plan);
  return currentRoomCount < limits.maxRooms;
}

export function canAddDevice(plan, currentDeviceCount) {
  const limits = getPlanLimits(plan);
  return currentDeviceCount < limits.maxDevices;
}
