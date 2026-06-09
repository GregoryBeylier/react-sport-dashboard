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

export function getFourWeekRange(date: Date = new Date()): { start: Date; end: Date } {
  const currentDay = date.getDay();
  const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;

  // Lundi de la semaine courante
  const currentMonday = new Date(date);
  currentMonday.setDate(date.getDate() + diffToMonday);
  currentMonday.setHours(0, 0, 0, 0);

  // Lundi d’il y a 3 semaines
  const start = new Date(currentMonday);
  start.setDate(currentMonday.getDate() - 21); // 3 semaines = 21 jours

  // Dimanche de la semaine courante
  const end = new Date(currentMonday);
  end.setDate(currentMonday.getDate() + 6);

  return { start, end };
}

export function formatDateLong(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateISO(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function formatDateShort(date: Date): string {
  const months = [
    "jan", "fév", "mar", "avr", "mai", "jun",
    "jui", "août", "sep", "oct", "nov", "déc"
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${day} ${month}`;
}
