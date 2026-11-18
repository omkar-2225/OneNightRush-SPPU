// Fill in your paper dates (YYYY-MM-DD), keyed by the subject code stored in your database.
// Example: "PCC-201-COM": "2026-11-25",
export const EXAM_DATES = {};

export function examLabel(code) {
  const iso = EXAM_DATES[code];
  if (!iso) return null;

  const exam = new Date(`${iso}T00:00:00+05:30`);
  const days = Math.ceil((exam - new Date()) / 86400000);
  const date = exam.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    timeZone: "Asia/Kolkata",
  });

  if (days < 0) return { date, note: "done" };
  if (days === 0) return { date, note: "today" };
  if (days === 1) return { date, note: "tomorrow" };
  return { date, note: `in ${days} days` };
}
