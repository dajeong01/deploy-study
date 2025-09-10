const parseHours = (v, def = 4) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 && n <= 168 ? n : def;
};
export const NEW_WINDOW_HOURS = parseHours(import.meta.env.VITE_NEW_WINDOW_HOURS, 4);
export const NEW_WINDOW_MS = NEW_WINDOW_HOURS * 60 * 60 * 1000;