import Link from "next/link";
import { notFound } from "next/navigation";
import { getSubjects, getTypes } from "../../../lib/api";
import { getStudySelection } from "../../../lib/studySelection";

export default async function SubjectPage({ params, searchParams }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();

  const selection = getStudySelection(await searchParams);
  const query = new URLSearchParams({
    branch: selection.branch,
    year: String(selection.year),
    semester: String(selection.semester),
  });
  const [subjects, types] = await Promise.all([
    getSubjects(selection),
    getTypes(id),
  ]);
  const subject = subjects?.find((s) => String(s.id) === id);
  if (!subject || types === null) notFound();

  return (
    <section>
      <Link href={`/subjects?${query}`} className="crumb">
        <span className="crumb-arrow" aria-hidden="true">←</span> All subjects
      </Link>
      <header className="page-heading">
        <span className="eyebrow">Your subject, your pace</span>
        <h1>{subject.name}</h1>
        <p className="lead">
          <span className="code">{subject.code}</span>
          Pick a shelf and find the material you came for.
        </p>
      </header>

      {types.length === 0 ? (
        <p className="empty-state">
          Nothing is published for this subject yet. Check back soon.
        </p>
      ) : (
        <>
          <h2 className="collection-heading">Browse study material</h2>
          <ul className="rows type-list">
            {types.map((type, index) => (
              <li className="subject-entry" key={type.id}>
                <Link
                  href={`/subject/${id}/${type.id}?${query}`}
                  className="row type-row"
                >
                  <span className="type-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="name">{type.name}</span>
                  <span className="row-arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
