// Date/countdown helpers shared across components.

export function formatEventDate(dateString) {
  return new Date(dateString).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function isPast(dateString) {
  return new Date(dateString).getTime() < Date.now();
}

// Returns a human-readable countdown like "12d 4h 9m 30s". If the event is in
// the past it returns the time elapsed prefixed with a minus sign so the UI
// can show "negative time".
export function getCountdown(dateString) {
  const diff = new Date(dateString).getTime() - Date.now();
  const past = diff < 0;
  let total = Math.abs(diff);

  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;
  const second = 1000;

  const days = Math.floor(total / day);
  total -= days * day;
  const hours = Math.floor(total / hour);
  total -= hours * hour;
  const minutes = Math.floor(total / minute);
  total -= minutes * minute;
  const seconds = Math.floor(total / second);

  const label = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  return { label, past, sign: past ? "-" : "" };
}
