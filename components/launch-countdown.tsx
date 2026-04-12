"use client";

function getLaunchCountdown() {
  const launchDate = new Date(2026, 4, 24);
  const today = new Date();
  const currentDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const millisecondsUntilLaunch = launchDate.getTime() - currentDay.getTime();
  const daysUntilLaunch = Math.ceil(
    millisecondsUntilLaunch / (1000 * 60 * 60 * 24),
  );

  if (daysUntilLaunch === 0) {
    return "Releasing today!!";
  }

  if (daysUntilLaunch < 0) {
    return "Available now";
  }

  return `${daysUntilLaunch} day${daysUntilLaunch === 1 ? "" : "s"}`;
}

export function LaunchCountdown() {
  return getLaunchCountdown();
}
