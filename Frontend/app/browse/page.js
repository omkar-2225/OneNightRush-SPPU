import Link from "next/link";
import { getSubjects } from "../../lib/api";
import BrowseFilters from "../../components/BrowseFilters";

const branches = ["First Year", "Computer Engineering"];
const years = [1, 2, 3, 4];

function getSelection(params) {
  let branch = branches.includes(params.branch)
    ? params.branch
    : "Computer Engineering";
  let year = Number(params.year);
  if (!years.includes(year)) year = branch === "First Year" ? 1 : 2;

  if (branch === "First Year" || year === 1) {
    branch = "First Year";
    year = 1;
  }

  const firstSemester = year * 2 - 1;
  const validSemesters = [firstSemester, firstSemester + 1];
  const requestedSemester = Number(params.semester);
  const semester = validSemesters.includes(requestedSemester)
    ? requestedSemester
    : branch === "Computer Engineering" && year === 2
      ? 3
      : firstSemester;

  return { branch, year, semester };
}

export default async function BrowsePage({ searchParams }) {
  const selection = getSelection(await searchParams);
  const result = await getSubjects(selection);
  const subjects = result ?? [];
  const yearLabel = selection.year === 1
    ? "First Year"
    : `${["", "", "Second", "Third", "Fourth"][selection.year]} Year`;
  const semesterLabel = `Semester ${selection.semester}`;

  return (
    <div className="browse-page">
      <Link href="/" className="crumb">
        <span className="crumb-arrow" aria-hidden="true">←</span> Home
      </Link>

      <header className="browse-heading">
        <span className="browse-university">SPPU UNIVERSITY</span>
        <span className="browse-pattern">2024 PATTERN</span>
        <h1>Find your study material.</h1>
        <p>Choose your branch, year and semester to open your subject shelf.</p>
      </header>

      <BrowseFilters
        branch={selection.branch}
        year={selection.year}
        semester={selection.semester}
      />

      <section className="browse-results" aria-live="polite">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Your semester shelf</span>
            <h2>
              {selection.branch === "First Year"
                ? "First Year · Common"
                : selection.branch}
            </h2>
          </div>
          <p>{yearLabel} · {semesterLabel} · 2024 Pattern</p>
        </div>

        {subjects.length === 0 ? (
          <div className="empty-state browse-empty">
            <span className="empty-mark" aria-hidden="true">✳</span>
            <h3>This shelf is still being stocked.</h3>
            <p>
              There are no subjects published for this selection yet. Once the
              subjects are added to the study catalog, they will show up here.
            </p>
            <Link href="/" className="back-link">Back to OneNightRush</Link>
          </div>
        ) : (
          <ul className="rows">
            {subjects.map((subject, index) => (
              <li className="subject-entry" key={subject.id}>
                <Link href={`/subject/${subject.id}`} className="row">
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
