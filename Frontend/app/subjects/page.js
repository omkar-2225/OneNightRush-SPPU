import Link from "next/link";
import { redirect } from "next/navigation";
import { getSubjects } from "../../lib/api";
import {
  getStudySelection,
  getStudyYearLabel,
  hasStudySelection,
} from "../../lib/studySelection";

export default async function SubjectsPage({ searchParams }) {
  const params = await searchParams;
  if (!hasStudySelection(params)) redirect("/browse");

  const selection = getStudySelection(params);
  const result = await getSubjects(selection);
  const subjects = result ?? [];
  const yearLabel = getStudyYearLabel(selection.year);
  const selectionLabel = selection.branch === "First Year"
    ? `First Year · Common · Semester ${selection.semester}`
    : `${selection.branch} · ${yearLabel} · Semester ${selection.semester}`;
  const query = new URLSearchParams({
    branch: selection.branch,
    year: String(selection.year),
    semester: String(selection.semester),
  });

  return (
    <div className="subjects-page">
      <Link href={`/browse?${query}`} className="crumb">
        <span className="crumb-arrow" aria-hidden="true">←</span> Change selection
      </Link>

      <header className="page-heading">
        <span className="eyebrow">SPPU · 2024 Pattern</span>
        <h1>Choose a subject</h1>
        <p className="lead">{selectionLabel}</p>
      </header>

      <section className="browse-results" aria-live="polite">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Your semester shelf</span>
            <h2>Subjects</h2>
          </div>
          <p>{subjects.length} {subjects.length === 1 ? "subject" : "subjects"}</p>
        </div>

        {subjects.length === 0 ? (
          <div className="empty-state browse-empty">
            <span className="empty-mark" aria-hidden="true">✳</span>
            <h3>This shelf is still being stocked.</h3>
            <p>
              There are no subjects published for this selection yet. Once the
              subjects are added to the study catalog, they will show up here.
            </p>
            <Link href={`/browse?${query}`} className="back-link">
              Change selection
            </Link>
          </div>
        ) : (
          <ul className="rows">
            {subjects.map((subject, index) => (
              <li className="subject-entry" key={subject.id}>
                <Link href={`/subject/${subject.id}?${query}`} className="row">
                  <span className="row-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="row-content">
                    <span className="name">{subject.name}</span>
                    <span className="code">{subject.code}</span>
                  </span>
                  <span className="row-arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
