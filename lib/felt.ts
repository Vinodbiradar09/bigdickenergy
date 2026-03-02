export function hasFelt(projectId: string) {
  if (typeof document === "undefined") return false;
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("felt_projects="));

  if (!cookie) return false;
  const ids = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
  return ids.includes(projectId);
}

export function markFelt(projectId: string) {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("felt_projects="));

  const ids: string[] = cookie
    ? JSON.parse(decodeURIComponent(cookie.split("=")[1]))
    : [];

  if (!ids.includes(projectId)) ids.push(projectId);

  document.cookie = `felt_projects=${encodeURIComponent(
    JSON.stringify(ids),
  )}; path=/; max-age=31536000`;
}
