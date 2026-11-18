// All calls to the FastAPI backend live here.
const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function get(path) {
  // Re-ask the backend at most once a minute, so new notes show up quickly.
  const res = await fetch(`${API}${path}`, { next: { revalidate: 60 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`The server answered ${res.status} for ${path}`);
  return res.json();
}

export function getSubjects() {
  const query = new URLSearchParams({
    branch: "Computer Engineering",
    year: "2",
    semester: "3",
  });
  return get(`/subjects?${query}`);
}

export function getTypes(subjectId) {
  return get(`/subjects/${subjectId}/types`);
}

export function getResources(subjectId, typeId) {
  return get(`/subjects/${subjectId}/resources?type_id=${typeId}`);
}
