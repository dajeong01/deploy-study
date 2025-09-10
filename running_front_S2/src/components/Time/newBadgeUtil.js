import { NEW_WINDOW_MS } from "./newBadgeConfig";

const lsKey = (crewId, section) =>
  `crew:${crewId}:section:${section}:lastVisitedAt`;

export function getLastVisited(crewId, section) {
  const v = localStorage.getItem(lsKey(crewId, section));
  return v ? Number(v) : 0;
}

export function setLastVisitedNow(crewId, section) {
  localStorage.setItem(lsKey(crewId, section), String(Date.now()));
}

export function isNewSinceLastVisit(crewId, section, latestCreatedAt, windowMs = NEW_WINDOW_MS) {
  if (!latestCreatedAt) return false;
  const latest = typeof latestCreatedAt === "string" ? Date.parse(latestCreatedAt) : Number(latestCreatedAt);
  if (!Number.isFinite(latest)) return false;

  const lastVisited = getLastVisited(crewId, section);
  const withinWindow = Date.now() - latest <= windowMs;
  return latest > lastVisited && withinWindow;
}

export function getLatestTs(list, field = "createdAt") {
  if (!Array.isArray(list) || list.length === 0) return 0;
  let max = 0;
  for (const item of list) {
    const raw = item?.[field];
    const t = typeof raw === "string" ? Date.parse(raw) : Number(raw);
    if (Number.isFinite(t) && t > max) max = t;
  }
  return max;
}
