export function getWeekRange(date: Date = new Date()): { monday: Date; sunday: Date } {
  const currentDay = date.getDay();

  const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;

  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return { monday, sunday };
}

export function formatDateFR(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateISO(date: Date): string {
  return date.toISOString().split("T")[0];
}
